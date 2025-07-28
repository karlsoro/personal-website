const crypto = require('crypto');

// Generate secure API keys
function generateApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

console.log('🔐 Generating secure API keys for your application...\n');

const publicApiKey = generateApiKey();
const adminApiKey = generateApiKey();

console.log('📋 Add these environment variables to your Azure Container Apps:');
console.log('==============================================================');
console.log(`PUBLIC_API_KEY=${publicApiKey}`);
console.log(`ADMIN_API_KEY=${adminApiKey}`);
console.log('==============================================================\n');

console.log('📋 For the frontend, add this environment variable:');
console.log('==============================================================');
console.log(`NEXT_PUBLIC_API_KEY=${publicApiKey}`);
console.log('==============================================================\n');

console.log('🔒 Security Notes:');
console.log('- Keep the ADMIN_API_KEY secret and secure');
console.log('- The PUBLIC_API_KEY can be exposed in frontend code');
console.log('- Use different keys for development and production');
console.log('- Rotate keys regularly for security'); 