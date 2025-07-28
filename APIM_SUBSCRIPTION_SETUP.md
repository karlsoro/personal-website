# Azure API Management Subscription Setup Guide

## Overview
This guide provides step-by-step instructions for setting up Azure API Management (APIM) subscriptions for the Personal Website API. Currently, only the blog importer tool requires a subscription key for creating blog posts.

## Current APIM Configuration

### Service Details
- **APIM Service Name**: `ks-personal-website-apim`
- **Gateway URL**: `https://ks-personal-website-apim.azure-api.net`
- **API Path**: `/personal-website-api`
- **Full API URL**: `https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog`

### Available API Keys
- **Public API Key**: `f17e98fb0d0dd6072ff92bc86c679a8c5a33e34584c9abaf6bb3e642c86e983a`
- **Admin API Key**: `a45a783e1239ba0b0cb6fc7724aa0e63e0708515f45d6dc0790e48103ba49783`

## Step-by-Step Subscription Setup

### Step 1: Access Azure Portal
1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your Azure account
3. Navigate to your resource group: `KS_resource_group`

### Step 2: Open API Management Service
1. Find and click on the APIM service: `ks-personal-website-apim`
2. In the left sidebar, click on **"Subscriptions"**

### Step 3: Create Admin Subscription for Blog Importer
1. Click **"+ Add subscription"**
2. Fill in the following details:
   - **Name**: `admin-blog-importer`
   - **Display name**: `Admin Blog Importer Access`
   - **Product**: Select `personal-website-product`
   - **User**: (Leave empty for now - we'll use API key authentication)
   - **State**: `Active`
3. Click **"Create"**

### Step 4: Get the Subscription Key
1. After creating the subscription, click on it to view details
2. Click on **"Show/hide keys"**
3. Copy the **Primary key** - this is your admin subscription key
4. **Important**: Keep this key secure - it has full access to create blog posts

### Step 5: Update Blog Importer Configuration
1. Open the blog importer tool
2. When prompted for the admin API key, use the subscription key from Step 4
3. The blog importer will now use: `https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog`

## Testing the Setup

### Test 1: Verify Subscription Key Works
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Ocp-Apim-Subscription-Key: YOUR_SUBSCRIPTION_KEY" \
  -d '{"title":"test","date":"2025-01-01","subtitle":"test","summaryBody":"test","detail":"test"}' \
  https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog
```

### Test 2: Verify Invalid Key is Rejected
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Ocp-Apim-Subscription-Key: invalid-key" \
  -d '{"title":"test","date":"2025-01-01","subtitle":"test","summaryBody":"test","detail":"test"}' \
  https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog
```
**Expected Result**: `401 Access denied due to invalid subscription key`

### Test 3: Verify Missing Key is Rejected
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"test","date":"2025-01-01","subtitle":"test","summaryBody":"test","detail":"test"}' \
  https://ks-personal-website-apim.azure-api.net/personal-website-api/api/blog
```
**Expected Result**: `401 Access denied due to missing subscription key`

## Security Considerations

### API Key Security
- **Never commit API keys to version control**
- **Rotate keys regularly** (recommended: every 90 days)
- **Use different keys for different environments** (dev, staging, prod)
- **Monitor API usage** through APIM analytics

### Access Control
- **Admin keys** should only be used by trusted tools (blog importer)
- **Public keys** can be used by the website frontend
- **Monitor subscription usage** for unusual activity

## Troubleshooting

### Common Issues

#### Issue: "Access denied due to invalid subscription key"
**Solution**: 
1. Verify the subscription key is correct
2. Check that the subscription is in "Active" state
3. Ensure the subscription is associated with the correct product

#### Issue: "Access denied due to missing subscription key"
**Solution**:
1. Add the `Ocp-Apim-Subscription-Key` header to your request
2. Verify the header name is exactly as shown

#### Issue: Blog importer can't connect
**Solution**:
1. Verify the APIM gateway URL is correct
2. Check that the subscription key is valid
3. Ensure the blog importer is using the correct header format

### Getting Help
- **APIM Documentation**: [Azure API Management Documentation](https://docs.microsoft.com/en-us/azure/api-management/)
- **APIM Analytics**: Monitor usage in the Azure Portal
- **Logs**: Check APIM logs for detailed error information

## Next Steps

### Optional: Create Public Subscription
If you want to create a separate subscription for public access (website frontend):

1. Follow Steps 1-2 above
2. Create a new subscription:
   - **Name**: `public-website-access`
   - **Display name**: `Public Website Access`
   - **Product**: `personal-website-product`
   - **State**: `Active`
3. Use this key for the website frontend

### Optional: Set Up Rate Limiting
1. In APIM, go to **"Products"**
2. Select `personal-website-product`
3. Configure rate limiting policies:
   - **Rate limit**: 1000 calls per minute
   - **Quota**: 10000 calls per day
   - **Burst limit**: 100 calls per minute

### Optional: Enable Monitoring
1. In APIM, go to **"Analytics"**
2. Enable monitoring for:
   - API usage
   - Error rates
   - Response times
   - Subscription usage

## Summary

After completing this setup:
- ✅ Blog importer will have secure access to create blog posts
- ✅ API is protected by industry-standard authentication
- ✅ Invalid requests are properly rejected
- ✅ Usage can be monitored and controlled
- ✅ Keys can be rotated for security

The APIM setup provides enterprise-grade API management with minimal configuration and maximum security. 