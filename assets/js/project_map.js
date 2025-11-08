/**
 * project_map.js
 * 
 * Project-specific map functionality
 * Customize this file to add your project's unique features
 * 
 * ============================================
 * Project-Specific Functions
 * ============================================
 */

// ============================================
// Global Variables for Project Features
// ============================================

// Store project-specific layers and data
var projectLayers = {
    layer1: null,
    layer2: null
    // Add more layers as needed
};

// Store project-specific data
var projectData = [];

// ============================================
// 1. Build Dropdown Menu with Project-Specific Event Listeners
// ============================================

/**
 * Build dropdown menu with project-specific event bindings
 * Customize this function to bind your checkbox classes to layer functions
 * 
 * @param {L.Map} map - Leaflet map object
 */
function buildDropdownMenu(map) {
    // First, set up the base menu framework
    var menu = buildDropdownMenuBase(map);
    
    if (!menu) {
        console.warn('Could not build dropdown menu');
        return;
    }
    
    // Bind checkbox event listeners for your project's layers
    // Example: bind layer1 checkbox
    var layer1Checkbox = document.querySelector('.layer1');
    if (layer1Checkbox) {
        layer1Checkbox.addEventListener('change', function() {
            if (this.checked) {
                buildLayer1(map);
            } else {
                removeLayer1(map);
            }
        });
    }
    
    // Example: bind layer2 checkbox
    var layer2Checkbox = document.querySelector('.layer2');
    if (layer2Checkbox) {
        layer2Checkbox.addEventListener('change', function() {
            if (this.checked) {
                buildLayer2(map);
            } else {
                removeLayer2(map);
            }
        });
    }
    
    // Add more checkbox bindings as needed
}

// ============================================
// 2. Project-Specific Layer Functions
// ============================================

/**
 * Build Layer 1
 * Customize this function to create your first data layer
 * 
 * @param {L.Map} map - Leaflet map object
 */
function buildLayer1(map) {
    // Remove existing layer if it exists
    if (projectLayers.layer1) {
        map.removeLayer(projectLayers.layer1);
    }
    
    // Example: Create a marker cluster group
    var markers = L.markerClusterGroup({
        chunkedLoading: true
    });
    
    // Example: Add some sample markers (replace with your data)
    // var sampleMarker = L.marker([30.356635, -97.701180]);
    // markers.addLayer(sampleMarker);
    
    // Add to map
    projectLayers.layer1 = markers;
    map.addLayer(markers);
    
    console.log('Layer 1 built');
}

/**
 * Remove Layer 1
 * 
 * @param {L.Map} map - Leaflet map object
 */
function removeLayer1(map) {
    if (projectLayers.layer1) {
        map.removeLayer(projectLayers.layer1);
        projectLayers.layer1 = null;
    }
}

/**
 * Build Layer 2
 * Customize this function to create your second data layer
 * 
 * @param {L.Map} map - Leaflet map object
 */
function buildLayer2(map) {
    // Remove existing layer if it exists
    if (projectLayers.layer2) {
        map.removeLayer(projectLayers.layer2);
    }
    
    // Example: Create a GeoJSON layer
    // var geoJsonLayer = L.geoJSON(geoJsonData, {
    //     style: function(feature) {
    //         return {
    //             color: '#ff7800',
    //             weight: 2,
    //             opacity: 0.8
    //         };
    //     }
    // });
    
    // Add to map
    // projectLayers.layer2 = geoJsonLayer;
    // map.addLayer(geoJsonLayer);
    
    console.log('Layer 2 built');
}

/**
 * Remove Layer 2
 * 
 * @param {L.Map} map - Leaflet map object
 */
function removeLayer2(map) {
    if (projectLayers.layer2) {
        map.removeLayer(projectLayers.layer2);
        projectLayers.layer2 = null;
    }
}

// ============================================
// 3. Data Loading Functions
// ============================================

/**
 * Load project data from JSON file
 * Customize this function to load your project's data
 * 
 * @param {string} dataUrl - URL to JSON data file
 * @returns {Promise} Promise that resolves with loaded data
 */
function loadProjectData(dataUrl) {
    return fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            projectData = data;
            console.log('Project data loaded:', data);
            return data;
        })
        .catch(error => {
            console.error('Error loading project data:', error);
            throw error;
        });
}

// ============================================
// 4. Initialize Default Layers
// ============================================

/**
 * Initialize default layers that should be shown on page load
 * Customize this function to set up your default layers
 */
function initDefaultLayers() {
    // Example: Check default checkboxes and build their layers
    var layer1Checkbox = document.querySelector('.layer1');
    if (layer1Checkbox && layer1Checkbox.checked) {
        buildLayer1(map);
    }
    
    // Add more default layer initialization as needed
}

// ============================================
// 5. Custom Control Buttons (Optional)
// ============================================

/**
 * Create custom control buttons for your project
 * Add buttons for project-specific features
 * 
 * @param {L.Map} map - Leaflet map object
 */
function createProjectControls(map) {
    // Example: Create a stats button
    var statsButton = createCustomControl({
        onClick: function() {
            // Add your stats modal or functionality here
            console.log('Stats button clicked');
        },
        html: '<div class="geocoder-control-input leaflet-bar" title="Statistics" style="background-color: #bf5700; color: white; padding: 5px 10px; cursor: pointer;">Stats</div>',
        title: 'Show Statistics',
        position: 'bottomright'
    });
    
    return statsButton;
}

