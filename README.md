# Trigger Food Navigator

## 🚀 Deployment Instructions

### Cloudflare Worker Deployment

#### Prerequisites
- Cloudflare account with Workers enabled
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)

#### Deploy the Worker
```bash
npm install
wrangler login
wrangler deploy
```

## 🔧 Local Development

#### Prerequisites
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)

### Running Locally

Rename `.dev.vars.example` file as `.dev.vars` and update it's contents.

```bash
# Install dependencies
npm install
# Start the local development server
npm start

# Open browser to:
# http://localhost:8787/Trigger%20Food%20Navigator
```

## 🌐 API Endpoints

### Available Endpoints
- **POST `/verify`**: Verify the order number

## 🐛 Troubleshooting

### Common Issues

#### CORS Errors
- Ensure Cloudflare Worker is deployed and accessible
- Check that CORS headers are properly set in the Worker

#### Missing Recipe Images
- Verify static assets are properly uploaded to Worker
- Check image paths in the recipe database

#### API Connection Issues
- Confirm Worker URL is correct in the frontend
- Test Worker endpoints directly in browser

### Debug Mode
The application includes console logging for debugging. Open browser developer tools to see detailed logs.

## 📊 Performance Considerations

### Monitoring
- Use Cloudflare Analytics to monitor Worker performance
- Check browser console for any JavaScript errors
- Monitor API response times

### Environment Variables
Sensitive configuration is stored in Cloudflare environment variables (already configured):
- API URLs
- Form identifiers
- Site configurations

## 📞 Support Information

### For Technical Issues
- Check browser console for error messages
- Verify Cloudflare Worker is running
- Test API endpoints directly

### Configuration Files
- **Cloudflare Worker**: `wrangler.jsonc`
- **TypeScript Config**: Included in Worker setup
- **API Types**: Defined in `src/types.ts`

## 📈 Version History
- **v1.0.0** - Initial release (currently on website)
- **v2.0.0** - This version (enhanced features, expanded recipes, improved architecture)

