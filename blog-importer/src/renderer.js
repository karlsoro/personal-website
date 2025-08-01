console.log('RENDERER JS LOADED');

// Use global variables instead of imports
const React = window.React;
const { useState } = React;
const { createRoot } = window.ReactDOM;
const axios = window.axios;

// Check if Material-UI is available
if (!window.MaterialUI) {
  console.error('Material-UI not loaded');
  document.getElementById('root').innerHTML = '<h1>Error: Material-UI not loaded</h1>';
} else {
  const { Button, Box, Typography, TextField, Paper, Stack, Divider, Alert } = window.MaterialUI;

  // Available keywords for selection
  const AVAILABLE_KEYWORDS = [
    // Technology & Development
    'ai', 'ml', 'artificial intelligence', 'machine learning',
    'cloud', 'aws', 'azure', 'gcp', 'kubernetes', 'docker', 'devops',
    'development', 'programming', 'coding', 'software',
    'security', 'cybersecurity', 'encryption', 'authentication',
    
    // Data & Analytics
    'data', 'analytics', 'big data', 'database', 'sql', 'nosql',
    'bi', 'business intelligence', 'snowflake', 'databricks',
    
    // Business & Management
    'project', 'management', 'agile', 'scrum', 'kanban',
    'business', 'strategy', 'organization', 'process',
    'team', 'collaboration', 'communication',
    'transformation', 'digital', 'innovation', 'change',
    'service management', 'ways of working', 'standards',
    
    // Quality & Performance
    'testing', 'qa', 'quality', 'assurance',
    'performance', 'optimization', 'speed', 'efficiency',
    
    // User Experience
    'ux', 'ui', 'user experience', 'design',
    'trends', 'technology', 'future', 'emerging',
    
    // Industry-Specific
    'fintech', 'financial', 'banking', 'payment',
    'healthcare', 'medical', 'pharma', 'clinical',
    'supply chain', 'logistics', 'inventory',
    'crm', 'customer', 'relationship', 'sales',
    'compliance', 'governance', 'regulation',
    'knowledge', 'documentation', 'learning',
    
    // Additional keywords from existing posts
    'mobile', 'budget', 'risk'
  ];

  function parseSummaryMarkdown(md) {
    console.log('--- RAW SUMMARY ---');
    console.log(md);
    const lines = md.split(/\r?\n/).map(line => line.trim());
    let title = '', date = '', subtitle = '', summaryBody = '', update = '', update2025 = '';
    let currentField = null;
    let buffer = [];
    let expectTitle = false;

    const flushBuffer = () => buffer.join('\n').trim();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect Title: label (accept both 'Title:' and '# Title:')
      if (/^(#\s*)?Title:$/i.test(line)) {
        expectTitle = true;
        continue;
      }
      // After Title:, skip blank lines, then take the next ## ... as the title
      if (expectTitle) {
        if (line === '') continue;
        if (/^##\s*(.*)/.test(line)) {
          title = line.replace(/^##\s*/, '').trim();
          expectTitle = false;
          currentField = null;
          buffer = [];
          continue;
        }
      }

      if (/^###\s*Date:/.test(line)) {
        if (currentField === 'summaryBody') summaryBody = flushBuffer();
        if (currentField === 'update') update = flushBuffer();
        if (currentField === 'update2025') update2025 = flushBuffer();
        currentField = 'date';
        buffer = [];
        continue;
      }
      if (/^###\s*Sub-Title:/.test(line)) {
        if (currentField === 'date') date = flushBuffer();
        if (currentField === 'summaryBody') summaryBody = flushBuffer();
        if (currentField === 'update') update = flushBuffer();
        if (currentField === 'update2025') update2025 = flushBuffer();
        currentField = 'subtitle';
        buffer = [];
        continue;
      }
      if (/^###\s*Summary Body:/.test(line)) {
        if (currentField === 'date') date = flushBuffer();
        if (currentField === 'subtitle') subtitle = flushBuffer();
        if (currentField === 'update') update = flushBuffer();
        if (currentField === 'update2025') update2025 = flushBuffer();
        currentField = 'summaryBody';
        buffer = [];
        continue;
      }
      if (/^###\s*UPDATE:/.test(line)) {
        if (currentField === 'summaryBody') summaryBody = flushBuffer();
        if (currentField === 'date') date = flushBuffer();
        if (currentField === 'subtitle') subtitle = flushBuffer();
        if (currentField === 'update2025') update2025 = flushBuffer();
        currentField = 'update';
        buffer = [];
        continue;
      }
      if (/^###\s*\d{4}\s*UPDATE:/.test(line)) {
        if (currentField === 'summaryBody') summaryBody = flushBuffer();
        if (currentField === 'update') update = flushBuffer();
        if (currentField === 'date') date = flushBuffer();
        if (currentField === 'subtitle') subtitle = flushBuffer();
        if (currentField === 'keywords') keywords = flushBuffer();
        currentField = 'update2025';
        buffer = [];
        continue;
      }


      // Add non-empty lines to the current buffer
      if (currentField && line !== '') buffer.push(line);
    }

    // Flush the last field
    if (currentField === 'date') date = flushBuffer();
    if (currentField === 'subtitle') subtitle = flushBuffer();
    if (currentField === 'summaryBody') summaryBody = flushBuffer();
    if (currentField === 'update') update = flushBuffer();
    if (currentField === 'update2025') update2025 = flushBuffer();

    console.log('PARSED:', { title, date, subtitle, summaryBody, update, update2025 });
    return { title, date, subtitle, summaryBody, update, update2025 };
  }

  function App() {
    console.log('App component rendered');
    const [summaryFile, setSummaryFile] = useState(null);
    const [detailFile, setDetailFile] = useState(null);
    const [summaryContent, setSummaryContent] = useState('');
    const [detailContent, setDetailContent] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [step, setStep] = useState('select'); // select | preview | done
    const [parsed, setParsed] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // File input handlers
    const handleSummaryChange = (e) => {
      const file = e.target.files[0];
      setSummaryFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => setSummaryContent(ev.target.result);
        reader.readAsText(file);
      }
    };
    const handleDetailChange = (e) => {
      const file = e.target.files[0];
      setDetailFile(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => setDetailContent(ev.target.result);
        reader.readAsText(file);
      }
    };

    // Process button: parse and go to preview
    const handleProcess = () => {
      const parsedSummary = parseSummaryMarkdown(summaryContent);
      setParsed({ ...parsedSummary, detail: detailContent, keywords: selectedKeywords });
      setStep('preview');
    };

    // Approve/Decline/Cancel handlers
    const handleApprove = async () => {
      setError('');
      setSuccess(false);
      try {
        // Use Azure APIM URL in production, localhost in development
        const apiUrl = window.location.hostname === 'localhost' 
          ? 'http://localhost:3001/api/blog'
          : 'https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog';
        
        // SECURITY NOTE: For production, consider storing API key in environment variables
        // or using a more secure key management system instead of prompting user
        const apiKey = prompt('Please enter your admin API key (required for creating blog posts):');
        if (!apiKey) {
          setError('Admin API key is required to create blog posts.');
          return;
        }

        const response = await axios.post(apiUrl, parsed, {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
            'Content-Type': 'application/json'
          }
        });
        if (response.data && response.data.success) {
          setSuccess(true);
          setStep('done');
        } else {
          setError('Failed to save blog post.');
        }
      } catch (err) {
        setError('Error saving blog post: ' + (err.response?.data?.message || err.message));
      }
    };
    const handleDecline = () => {
      setSummaryFile(null);
      setDetailFile(null);
      setSummaryContent('');
      setDetailContent('');
      setSelectedKeywords([]);
      setParsed(null);
      setStep('select');
    };
    const handleCancel = () => {
      setSummaryFile(null);
      setDetailFile(null);
      setSummaryContent('');
      setDetailContent('');
      setSelectedKeywords([]);
      setParsed(null);
      setStep('select');
    };

    return (
      <Box sx={{ p: 4, maxWidth: 700, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom>Blog Importer</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {step === 'select' && (
          <Stack spacing={2}>
            <Button variant="contained" component="label">
              Select Summary File
              <input type="file" accept=".md,.txt" hidden onChange={handleSummaryChange} />
            </Button>
            <Button variant="contained" component="label">
              Select Detail File
              <input type="file" accept=".md,.txt" hidden onChange={handleDetailChange} />
            </Button>
            
            <Typography variant="h6" sx={{ mt: 2 }}>Select Keywords (up to 5)</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Choose keywords that best describe your blog post content:
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 1 }}>
              {AVAILABLE_KEYWORDS.map((keyword) => (
                <Button
                  key={keyword}
                  variant={selectedKeywords.includes(keyword) ? "contained" : "outlined"}
                  size="small"
                  onClick={() => {
                    if (selectedKeywords.includes(keyword)) {
                      setSelectedKeywords(selectedKeywords.filter(k => k !== keyword));
                    } else if (selectedKeywords.length < 5) {
                      setSelectedKeywords([...selectedKeywords, keyword]);
                    }
                  }}
                  disabled={!selectedKeywords.includes(keyword) && selectedKeywords.length >= 5}
                  sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                >
                  {keyword}
                </Button>
              ))}
            </Box>
            
            {selectedKeywords.length > 0 && (
              <Typography variant="body2" color="primary">
                Selected: {selectedKeywords.join(', ')}
              </Typography>
            )}
            
            <Button 
              variant="outlined" 
              onClick={handleProcess} 
              disabled={!summaryContent || !detailContent}
            >
              Process
            </Button>
          </Stack>
        )}
        {step === 'preview' && parsed && (
          <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6">Preview Blog Post</Typography>
            <Divider sx={{ my: 1 }} />
            <TextField label="Title" value={parsed.title} fullWidth margin="normal" InputProps={{ readOnly: true }} />
            <TextField label="Date" value={parsed.date} fullWidth margin="normal" InputProps={{ readOnly: true }} />
            <TextField label="Sub-Title" value={parsed.subtitle} fullWidth margin="normal" InputProps={{ readOnly: true }} />
            <TextField label="Summary Body" value={parsed.summaryBody} multiline minRows={3} fullWidth margin="normal" InputProps={{ readOnly: true }} />
            {parsed.keywords && parsed.keywords.length > 0 && <TextField label="Keywords" value={parsed.keywords.join(', ')} fullWidth margin="normal" InputProps={{ readOnly: true }} />}
            {parsed.update && <TextField label="Update" value={parsed.update} fullWidth margin="normal" InputProps={{ readOnly: true }} />}
            {parsed.update2025 && <TextField label="2025 Update" value={parsed.update2025} fullWidth margin="normal" InputProps={{ readOnly: true }} />}
            <Typography variant="h6" sx={{ mt: 2 }}>Detail Markdown</Typography>
            <TextField label="Detail" value={parsed.detail} multiline minRows={10} fullWidth margin="normal" InputProps={{ readOnly: true }} />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button variant="contained" color="success" onClick={handleApprove}>Approve</Button>
              <Button variant="outlined" color="warning" onClick={handleDecline}>Decline</Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
            </Stack>
          </Paper>
        )}
        {step === 'done' && success && (
          <Alert severity="success" sx={{ mt: 4 }}>Blog post imported successfully!</Alert>
        )}
      </Box>
    );
  }

  const root = createRoot(document.getElementById('root'));
  root.render(<App />);
}
