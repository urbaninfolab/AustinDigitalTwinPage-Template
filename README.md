# Austin Digital Twin Page Template

This is a template repository for creating Austin Digital Twin project pages. This template provides basic common page functionality (including HTML, JS, CSS) to help developers quickly start new projects and follow unified development standards.

## 📁 Project Structure

```
AustinDigitalTwinPage-Template/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   ├── style.css      # Base styles (fonts, map, loading animation, etc.)
│   │   └── projectMap.css # Project-specific styles (dropdown menu, custom controls, etc.)
│   ├── js/
│   │   ├── map_common.js  # Common map functionality (location, search, basic controls, etc.)
│   │   ├── project_map.js # Project-specific functionality (custom layers, data processing, etc.)
│   │   └── map_init.js    # Map initialization script
│   ├── images/            # Image resources directory
│   └── fonts/             # Font files directory (if needed)
├── data/                  # Data files directory (optional)
└── README.md             # This file
```

## 🚀 Quick Start

### 1. Copy the Template

Copy the entire `AustinDigitalTwinPage-Template` directory to your project location and rename it to your project name.

```bash
cp -r AustinDigitalTwinPage-Template YourProjectName
cd YourProjectName
```

### 2. Customize Project Information

#### Modify `index.html`

- **Page Title and Metadata**: Update the project name and description in `<title>` and `<meta>` tags
- **Project Icon**: Replace `assets/images/project_icon.png` with your project icon
- **Modal Content**: Update the content in the info modal (`infoModal`) and credits modal (`creditsModal`)
- **Header Navigation**: Modify the project title and color (default uses `#bf5700`)
- **Layer Control Menu**: Add or modify layer checkboxes in `filter-menu` according to your project needs

#### Modify `assets/js/map_init.js`

- **Map Center and Zoom Level**: Modify the `center` and `zoom` parameters in the `initMap()` function
- **API Keys**: Add your API key if you need to use Esri geocoding search
- **Data Loading**: Uncomment and modify the `loadProjectData()` call to point to your data file

#### Modify `assets/js/project_map.js`

- **Layer Functions**: Implement `buildLayer1()`, `buildLayer2()`, etc. functions according to your project needs
- **Event Bindings**: In the `buildDropdownMenu()` function, bind your checkboxes to corresponding layer functions
- **Data Processing**: Implement the `loadProjectData()` function to load and process your data

### 3. Add Project Resources

- **Images**: Place project icons, favicon, etc. in the `assets/images/` directory
- **Data**: Place JSON, GeoJSON, and other data files in the `data/` directory (if needed)
- **Fonts**: If you need to use ManifoldDSA or FontAwesome fonts, place font files in the `assets/fonts/` directory

### 4. Test and Deploy

Test your project on a local server, and after ensuring all features work correctly, deploy to the server.

## 📚 File Descriptions

### HTML Files

#### `index.html`

Main HTML file containing:
- Standard HTML5 structure
- Leaflet map library and related plugin references
- Bootstrap modals (info and credits)
- Header navigation bar (project title, icon, Urban Info Lab link)
- Layer control dropdown menu
- Usage instructions modal
- JavaScript file references (loaded in order)

### CSS Files

#### `assets/css/style.css`

Base styles file containing:
- Font definitions (ManifoldDSA, FontAwesome)
- Global styles (body, links, etc.)
- Map container styles
- Loading animation (spinner)
- Marker cluster styles

#### `assets/css/projectMap.css`

Project-specific styles containing:
- Dropdown menu styles
- Custom control styles
- Loading overlay styles (optional)
- Project-specific custom styles

### JavaScript Files

#### `assets/js/map_common.js`

Common map functionality module containing:
- **User Location Functionality**: `getUserLocation()`, `onLocationFound()`, etc.
- **Map Basic Functionality**: `initMap()`, `addMapLayer()`, etc.
- **Geocoding Search**: `initGeocodingSearch()` (requires Esri API key)
- **Custom Controls**: `createCustomControl()`, `createLocationButton()`, etc.
- **Dropdown Menu Framework**: `buildDropdownMenuBase()` (base framework, requires project-specific event bindings)
- **Utility Functions**: `hideSpinner()`, `setupMapClickHandler()`, etc.

**Note**: Functions in this file are generic and can be used directly, but some functions may need configuration according to project requirements (such as map center point, API keys, etc.).

#### `assets/js/project_map.js`

Project-specific functionality module containing:
- **Layer Management**: `buildLayer1()`, `removeLayer1()`, etc. functions for creating and managing project-specific map layers
- **Dropdown Menu Event Bindings**: `buildDropdownMenu()` function that binds checkboxes to layer functions
- **Data Loading**: `loadProjectData()` function for loading data from files or APIs
- **Default Layer Initialization**: `initDefaultLayers()` function that sets up default layers to display on page load
- **Custom Controls**: `createProjectControls()` function for creating project-specific control buttons

**Note**: This file requires extensive customization based on your project needs.

#### `assets/js/map_init.js`

Map initialization script containing:
- **Main Initialization Function**: `initMapAndFeatures()`, which initializes all features in sequence
- **Page Load Handling**: Ensures map initialization after DOM is loaded

**Note**: You may need to adjust the initialization order or add additional initialization steps according to your project requirements.

## 🎨 Development Standards

### Code Organization

1. **File Separation**: Keep HTML, CSS, and JavaScript files separate, avoid inlining large amounts of code
2. **Modularity**: Put common functionality in `map_common.js`, project-specific functionality in `project_map.js`
3. **Comments**: Add JSDoc-style comments to functions, explaining parameters and return values
4. **Naming**: Use meaningful variable and function names, follow camelCase naming convention

### Style Standards

1. **Colors**: Project primary color uses `#bf5700` (UT Austin orange), can be adjusted according to project needs
2. **Fonts**: Use ManifoldDSA font as the primary font
3. **Responsive**: Ensure the page displays correctly at different screen sizes

### Functionality Standards

1. **Map Initialization**: Always manage initialization flow uniformly in `map_init.js`
2. **Layer Management**: Use the `projectLayers` object to manage all layers uniformly for easy addition and removal
3. **Error Handling**: Add appropriate error handling in data loading and API calls
4. **Performance Optimization**: For large amounts of data points, use marker clustering (MarkerCluster) or chunked loading

### Data Standards

1. **Data Format**: Prefer GeoJSON format for storing geographic data
2. **Data Loading**: Use `fetch()` API for asynchronous data loading
3. **Data Validation**: Validate data format and integrity after loading data

## 🔧 Common Tasks

### Adding a New Map Layer

1. Create `buildLayerX()` and `removeLayerX()` functions in `project_map.js`
2. Add corresponding properties to the `projectLayers` object
3. Bind checkbox events in `buildDropdownMenu()`
4. Add checkboxes to the layer control menu in `index.html`

### Adding Custom Control Buttons

1. Use `createCustomControl()` in `project_map.js` to create controls
2. Add controls to the map in `initMapAndFeatures()` in `map_init.js`

### Modifying Map Base Layer

Modify the base map URL in the `addMapLayer()` function in `map_common.js`, or uncomment other base map options.

### Adding Data Loading Progress Bar

1. The HTML structure for `data-loading-overlay` already exists in `index.html`
2. Update the progress bar and percentage in the data loading function
3. Hide the overlay after loading is complete

## 📝 Important Notes

1. **API Keys**: If using Esri geocoding or Google Maps, you need to add the corresponding API keys
2. **Cross-Origin Issues**: If loading data from different domains, ensure the server has correct CORS headers set
3. **Browser Compatibility**: The template uses modern JavaScript features, recommend using modern browsers
4. **Performance**: For large amounts of data, consider using data pagination or virtual scrolling

## 🆘 Getting Help

If you encounter problems or need help:

1. Refer to existing Austin Digital Twin projects (AustinSocialTwin, AustinUrbanMobility, AustinUrbanNoise, AustinCrime)
2. Check Leaflet official documentation: https://leafletjs.com/
3. Contact the Urban Info Lab team