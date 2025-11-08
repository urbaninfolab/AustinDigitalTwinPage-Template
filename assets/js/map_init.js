/**
 * map_init.js
 * 
 * Main map initialization script
 * Integrates generic functionality and project-specific features
 * 
 * Customize this file to set up your project's initialization sequence
 */

// ============================================
// Global Variables
// ============================================

var map; // Map object, available in global scope

// ============================================
// Main Initialization Function
// ============================================

/**
 * Initialize map and all features
 * Customize this function to set up your project's initialization sequence
 */
function initMapAndFeatures() {
    // 1. Initialize map
    // Customize center and zoom for your project
    map = initMap('map', [30.356635, -97.701180], 12);
    
    // 2. Add base layer
    addMapLayer(map);
    
    // 3. Initialize geocoding search (optional - requires Esri API key)
    // Uncomment and add your Esri API key:
    // var esriApiKey = 'YOUR_ESRI_API_KEY_HERE';
    // initGeocodingSearch(map, esriApiKey);
    
    // 4. Build dropdown menu (includes project-specific event bindings)
    buildDropdownMenu(map);
    
    // 5. Setup map click event handler
    setupMapClickHandler(map);
    
    // 6. Create custom control buttons
    createLocationButton(map).addTo(map);
    // Add more custom controls as needed:
    // createProjectControls(map).addTo(map);
    
    // 7. Load project data (if needed)
    // Uncomment and customize:
    // loadProjectData('data/your-data.json')
    //     .then(() => {
    //         // Initialize layers after data is loaded
    //         initDefaultLayers();
    //     })
    //     .catch(error => {
    //         console.error('Failed to load project data:', error);
    //         // Still initialize default layers even if data loading fails
    //         initDefaultLayers();
    //     });
    
    // 8. Initialize default layers
    initDefaultLayers();
    
    // 9. Hide loading spinner
    hideSpinner();
    
    console.log('Map and features initialized successfully');
}

// ============================================
// Initialize After Page Load
// ============================================

// Ensure initialization after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMapAndFeatures);
} else {
    // DOM already loaded
    initMapAndFeatures();
}

