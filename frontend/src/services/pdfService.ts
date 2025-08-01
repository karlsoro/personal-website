import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export interface PDFOptions {
  filename?: string
  title?: string
  author?: string
  subject?: string
}

export const generatePDFFromMarkdown = async (
  markdownContent: string,
  options: PDFOptions = {}
): Promise<void> => {
  try {
    // Create a temporary container for the markdown content
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.top = '0'
    container.style.width = '800px'
    container.style.padding = '40px'
    container.style.fontFamily = 'Arial, sans-serif'
    container.style.fontSize = '12px'
    container.style.lineHeight = '1.6'
    container.style.color = '#333'
    container.style.backgroundColor = 'white'
    
    // Convert markdown to HTML (basic conversion for PDF)
    const htmlContent = convertMarkdownToHTML(markdownContent)
    container.innerHTML = htmlContent
    
    document.body.appendChild(container)
    
    // Generate PDF
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })
    
    document.body.removeChild(container)
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    
    // Set PDF metadata
    if (options.title) pdf.setProperties({ title: options.title })
    if (options.author) pdf.setProperties({ author: options.author })
    if (options.subject) pdf.setProperties({ subject: options.subject })
    
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    // Generate filename with current date
    const today = new Date()
    const dateString = today.toISOString().split('T')[0] // YYYY-MM-DD format
    const filename = options.filename || `Karl Sorochinski - ${dateString}.pdf`
    
    // Download the PDF
    pdf.save(filename)
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw new Error('Failed to generate PDF')
  }
}

// Basic markdown to HTML converter for PDF generation
const convertMarkdownToHTML = (markdown: string): string => {
  let html = markdown
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 style="margin: 20px 0 10px 0; font-size: 16px; font-weight: bold; color: #2d3748;">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 style="margin: 25px 0 15px 0; font-size: 18px; font-weight: bold; color: #2d3748;">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 style="margin: 30px 0 20px 0; font-size: 24px; font-weight: bold; color: #2d3748;">$1</h1>')
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: bold;">$1</strong>')
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
  
  // Lists
  html = html.replace(/^·\s+(.*$)/gim, '<li style="margin: 5px 0;">$1</li>')
  html = html.replace(/^-\s+(.*$)/gim, '<li style="margin: 5px 0;">$1</li>')
  
  // Wrap lists in ul tags
  html = html.replace(/(<li.*<\/li>)/gs, '<ul style="margin: 10px 0; padding-left: 20px;">$1</ul>')
  
  // Paragraphs
  html = html.replace(/^(?!<[h|u|o])(.*$)/gim, '<p style="margin: 10px 0; line-height: 1.6;">$1</p>')
  
  // Remove empty paragraphs
  html = html.replace(/<p style="margin: 10px 0; line-height: 1.6;"><\/p>/g, '')
  
  return html
} 