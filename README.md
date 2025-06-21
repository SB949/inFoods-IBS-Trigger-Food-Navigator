# Trigger Food Navigator

## 🏗️ Project Architecture

### Frontend
- **Main Application**: Trigger Food Navigator Webflow page

### Backend (Cloudflare Worker)
- **API Endpoints**: `/src/endpoints/` directory
- **Data Sources**: `recipes.json` recipe database
- **Static Assets**: Served via Cloudflare Worker
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
**Note**: Code in the Webflow page may be different from the `Trigger Food Navigator.html` file. Whenever you need to modify the code, consider edit it directly in Webflow.

## 🥗 Manage recipes database
Recipes database and their pictures are served by the Cloudflare Worker.

### How to add new recipes:
- put your recipe image into the `Cloudflare Worker/static/recipe-images` directory;
- add recipe data to the `recipes` array of the `Cloudflare Worker/src/data/recipes.json` file;
- the `image` field of the new data entry should follow the next pattern `recipe images/Image File Name.file-extension`. Check the existing recipes for a reference;
- deploy the Worker by following deployment instructions below.

## 🚀 Deployment Instructions

### Cloudflare Worker Deployment

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

### Static Assets
- Recipe images are served through the Cloudflare Worker
- No separate CDN setup required

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
- **POST `/verify`**: Verify the order number
- **Static Assets**: Served from `/static/` path

### Recipe API Response Format
```json
{
  "recipes": [
    {
      "id": "88",
      "name": "Garlic Fries",
      "mealType": "side",
      "calories": 264,
      "ingredients": [
        "3 cloves garlic, minced",
        "2 tablespoons canola oil",
        "3 large baking potatoes, 12 ounces each",
        "1/2 teaspoon salt",
        "1 tablespoon finely chopped fresh parsley leaves"
      ],
      "instructions": "1. Preheat the oven to 450 degrees F.\n\n2. Heat the garlic and oil in a small saucepan over medium heat for 2 minutes. Strain the garlic from the oil with a small mesh strainer. Set both garlic and oil aside.\n\n3. Cut the potatoes into 1/4-inch sticks. In a large bowl, toss the oil, potatoes and 1/2 teaspoon of salt.\n\n4. Spray a baking sheet with cooking spray and spread the potatoes onto it in a single layer. Bake until golden and crisp, about 35 minutes.\n\n5. Remove potatoes from the tray with a metal spatula. Toss with parsley, reserved garlic, and additional salt, to taste. Serve immediately.",
      "isVegetarian": true,
      "isVegan": true,
      "macros": {
        "protein": 6,
        "carbs": 47,
        "fat": 7,
        "saturatedFat": 0.5,
        "fiber": 3.5,
        "sugar": 2,
        "cholesterol": 0,
        "sodium": 304
      },
      "image": "recipe images/Garlic Fries.jpg"
    }
  ]
}
```

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

