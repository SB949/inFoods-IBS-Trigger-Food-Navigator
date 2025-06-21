# Trigger Food Navigator - Version 2 Deployment Guide

## 🚀 Quick Start for Developers

This is **Version 2** of the Trigger Food Navigator. This document provides everything needed to deploy the updated version to replace Version 1 currently on the website.

## 📋 What's New in Version 2

### Key Updates
- **Enhanced Recipe Database**: Expanded from ~100 to 200+ recipes
- **Improved API Structure**: Better organized Cloudflare Worker endpoints
- **TypeScript Migration**: Enhanced type safety and developer experience
- **Performance Optimizations**: Faster loading and better caching
- **Bug Fixes**: Resolved issues from Version 1 feedback

### Technical Improvements
- Modular endpoint structure in `/src/endpoints/`
- Proper TypeScript interfaces and validation
- Enhanced error handling
- Better CORS configuration
- Optimized static asset serving

## 🏗️ Project Architecture

### Frontend
- **Main Application**: `Trigger Food Navigator.html` (Single-page application)
- **Static Assets**: Recipe images, icons, and other resources
- **Local Development Server**: `server.py` for testing

### Backend (Cloudflare Worker)
- **API Endpoints**: `/src/endpoints/` directory
- **Data Sources**: JSON recipe databases
- **Static Assets**: Served via Cloudflare Workers
- **Configuration**: `wrangler.jsonc`

## 📁 Project Structure
```
Trigger Food Navigator/
├── Trigger Food Navigator.html     # Main application (deploy this)
├── server.py                       # Local development server
├── Cloudflare Worker/              # API backend
│   ├── src/
│   │   ├── index.ts               # Main worker entry point
│   │   ├── types.ts               # TypeScript definitions
│   │   ├── endpoints/             # API endpoints
│   │   │   └── recipes.ts         # Recipe API endpoint
│   │   └── data/                  # Recipe databases
│   ├── static/                    # Static assets for worker
│   └── wrangler.jsonc            # Cloudflare configuration
├── recipe images/                 # Source recipe images
├── icons/                        # UI icons
└── data/                         # Additional data files
```

### Trigger Food Navigator Webflow Page

On the webflow side, the `Trigger Food Navigator.html` page is inserted using the [Custom Code Embed](https://help.webflow.com/hc/en-us/articles/33961332238611-Custom-code-embed#how-to-add-a-code-embed-element) element.
Due to the limitation of 50000 lines of code per a single embed, the code is split across multiple elements.

## 🥗 Manage recipes database
Recipes database and their pictures are served by the Cloudflare Worker.

### How to add new recipes:
- put your recipe image into the `Cloudflare Worker/static/recipe-images` directory;
- add recipe data to the `recipes` array of the `Cloudflare Worker/src/data/recipes.json` file;
- the `image` field of the new data entry should follow the next pattern `recipe images/Image File Name.file-extension`. Check the existing recipes for a reference;
- deploy the Worker by following deployment instructions below.

## 🚀 Deployment Instructions

### Step 1: Cloudflare Worker Deployment

#### Prerequisites
- Cloudflare account with Workers enabled
- Node.js and npm installed
- Wrangler CLI installed (`npm install -g wrangler`)

#### Deploy the Worker
```bash
cd "Cloudflare Worker"
npm install
wrangler login
wrangler deploy
```

#### Configuration Notes
- **Worker Name**: `replacement-planner-api` (configured in `wrangler.jsonc`)
- **Environment Variables**: Already configured in `wrangler.jsonc`
- **Static Assets**: Recipe images and other assets served from `/static/` directory

### Step 2: Frontend Deployment

#### Main Application File
- Deploy `Trigger Food Navigator.html` to your web server
- This file contains the complete frontend application
- No additional build process required

#### Update API Endpoints (if needed)
If your Cloudflare Worker URL differs from the current setup, update the API endpoints in `Trigger Food Navigator.html`:

```javascript
// Look for these API calls and update the base URL:
const API_BASE_URL = 'https://your-worker-name.your-subdomain.workers.dev';
```

### Step 3: Static Assets
- Recipe images are served through the Cloudflare Worker
- No separate CDN setup required
- Images are automatically optimized and cached

## 🔧 Local Development

### Running Locally
```bash
# Start the local development server
python server.py

# Open browser to:
# http://localhost:8000/Diet%20Planner%20Tool.html
```

### Testing the Cloudflare Worker Locally
```bash
cd "Cloudflare Worker"
wrangler dev
```

## 🌐 API Endpoints

### Available Endpoints
- **GET `/recipes`**: Returns all available recipes
- **Static Assets**: Served from `/static/` path

### Recipe API Response Format
```json
{
  "recipes": [
    {
      "id": 1,
      "name": "Recipe Name",
      "mealType": "breakfast|lunch|dinner|snack",
      "calories": 350,
      "ingredients": ["ingredient1", "ingredient2"],
      "instructions": ["step1", "step2"],
      "isVegetarian": true,
      "isVegan": false,
      "macros": {
        "protein": 15,
        "carbs": 45,
        "fat": 12
      },
      "image": "recipe-image.jpg"
    }
  ]
}
```

## 🔄 Migration from Version 1

### What to Replace
1. **Frontend**: Replace the existing HTML file with `Trigger Food Navigator.html`
2. **API**: Deploy the new Cloudflare Worker to replace existing backend
3. **Assets**: Recipe images are now served through the Worker

### Backup Recommendations
- Backup current Version 1 files before deployment
- Test the new version on a staging environment first
- Monitor for any API endpoint changes needed

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

### Optimizations Included
- **Lazy Loading**: Recipe images load on demand
- **Caching**: Cloudflare automatically caches static assets
- **Compression**: Worker serves compressed responses
- **CDN**: Global distribution through Cloudflare network

### Monitoring
- Use Cloudflare Analytics to monitor Worker performance
- Check browser console for any JavaScript errors
- Monitor API response times

## 🔐 Security Features

### Data Protection
- No sensitive user data stored
- CORS properly configured
- Input validation on all API endpoints

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

---

## 🎯 Deployment Checklist

- [ ] Cloudflare Worker updated successfully
- [ ] Worker endpoints responding correctly
- [ ] Frontend HTML file uploaded to web server
- [ ] Recipe images loading properly
- [ ] API connections working
- [ ] CORS configured correctly
- [ ] Performance testing completed
- [ ] Version 1 backed up
- [ ] Staging environment tested

**Ready for production deployment!** 🚀 
