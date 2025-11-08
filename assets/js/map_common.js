/**
 * map_common.js
 * 
 * Common map functionality module
 * Contains reusable basic functions that can be used across multiple projects
 * 
 * ============================================
 * [Fully Generic Functions] - Can be used directly without modification
 * ============================================
 */

// ============================================
// 1. User Location Functionality (Fully Generic)
// ============================================

// placeholders for the L.marker and L.circle representing user's current position and accuracy
var current_position, current_accuracy;

/**
 * Handle successful user geolocation retrieval
 * @param {Object} e - Geolocation event object
 */
function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    console.log("location found");

    if (current_position) {
        map.removeLayer(current_position);
        map.removeLayer(current_accuracy);
    }

    var radius = e.coords.accuracy / 10;

    const latlng = {
        lat: e.coords.latitude,
        lng: e.coords.longitude
    };

    current_position = L.marker(latlng).addTo(map);
    current_accuracy = L.circle(latlng, radius).addTo(map);

    map.setView(latlng);
    map.fitBounds(current_accuracy.getBounds());
}

/**
 * Handle geocoding search results
 * @param {Object} e - Geocoding event object
 */
function foundLocationGeocoded(e) {
    if (current_position) {
        map.removeLayer(current_position);
        map.removeLayer(current_accuracy);
    }

    var radius = 10;

    const latlng = {
        lat: e.latlng.lat,
        lng: e.latlng.lng
    };

    current_position = L.marker(latlng).addTo(map);
    current_accuracy = L.circle(latlng, radius).addTo(map);

    map.setView(latlng);
    map.fitBounds(current_accuracy.getBounds());
}

/**
 * Handle location error
 * @param {Object} e - Error event object
 */
function onLocationError(e) {
    console.error("Location found error");
    console.log(e);
}

/**
 * Get user's current location
 */
function getUserLocation() {
    navigator.geolocation.getCurrentPosition(onLocationFound, onLocationError);
}

// ============================================
// 2. Map Basic Functionality (Fully Generic)
// ============================================

/**
 * Add map base layer
 * [Note] Different projects may need different base maps, this function may need to adjust the base map URL
 * @param {L.Map} map - Leaflet map object
 */
function addMapLayer(map) {
    // Currently using Esri World Imagery base map
    // To use other base maps, modify the URL here
    L.tileLayer('https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map);
    
    // Alternative base map options (commented out):
    // L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_KEY', {
    //     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    // }).addTo(map);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    
    console.log("Map layer added");
}

// ============================================
// 3. Geocoding Search Functionality (Fully Generic)
// ============================================

/**
 * Initialize geocoding search control
 * [Note] API Key may need to be adjusted according to the project
 * @param {L.Map} map - Leaflet map object
 * @param {string} apiKey - Esri ArcGIS API Key
 * @returns {Object} Search control object
 */
function initGeocodingSearch(map, apiKey) {
    if (!apiKey) {
        console.warn('Esri API Key not provided, geocoding search will not be initialized');
        return null;
    }
    
    var searchControl = L.esri.Geocoding.geosearch({
        position: 'topright',
        placeholder: 'Enter an address or place e.g. 1 York St',
        providers: [
            L.esri.Geocoding.arcgisOnlineProvider({
                apikey: apiKey
            })
        ]
    }).addTo(map);

    // Listen for search results event
    searchControl.on("results", function (data) {
        foundLocationGeocoded(data);
    });

    return searchControl;
}

// ============================================
// 4. Custom Control Base Class (Fully Generic)
// ============================================

/**
 * Create custom Leaflet control
 * [Note] Click events need to be customized according to project requirements
 * @param {Object} options - Control configuration options
 * @param {Function} options.onClick - Click event handler function
 * @param {string} options.html - Control HTML content
 * @param {string} options.title - Control title
 * @param {string} options.position - Control position ('bottomright', 'bottomleft', etc.)
 */
function createCustomControl(options) {
    L.Control.Watermark = L.Control.extend({
        onAdd: function (map) {
            var container = L.DomUtil.create('div');
            container.type = "button";
            container.title = options.title || "Control";
            container.value = "42";
            container.classList = ["geocoder-control leaflet-control"];

            if (options.onClick) {
                container.onclick = options.onClick;
            }

            if (options.html) {
                container.innerHTML = options.html;
            }

            return container;
        },

        onRemove: function (map) {
            // Nothing to do here
        }
    });

    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    };

    return L.control.watermark({ position: options.position || 'bottomright' });
}

/**
 * Create location button control
 * @param {L.Map} map - Leaflet map object
 * @returns {L.Control} Location control
 */
function createLocationButton(map) {
    return createCustomControl({
        onClick: function() {
            getUserLocation();
        },
        html: '<div class="geocoder-control-input leaflet-bar" title="Get My Location" style="background-image: url(assets/images/location.png); width: 34px; height: 26px; background-size: contain; background-repeat: no-repeat;"></div>',
        title: 'Get My Location',
        position: 'bottomright'
    });
}

// ============================================
// 5. Dropdown Menu Base Framework (Event listener part needs adjustment)
// ============================================

/**
 * Build dropdown menu base framework
 * [Requires Adjustment] Event listener part needs to be bound according to project's checkbox class names and corresponding build functions
 * 
 * Usage:
 * 1. Call this function to set up basic menu interactions (toggle, close, etc.)
 * 2. Bind checkbox event listeners in project-specific scripts
 * 
 * @param {L.Map} map - Leaflet map object
 * @param {string} menuId - Menu container ID (default: 'filter-menu')
 * @param {string} overlayId - Overlay ID (default: 'filter-menu-overlay')
 * @returns {Object} Object containing toggleMenu function and menu elements
 */
function buildDropdownMenuBase(map, menuId, overlayId) {
    menuId = menuId || 'filter-menu';
    overlayId = overlayId || 'filter-menu-overlay';
    
    var checkList = document.getElementById(menuId);
    var overlay = document.getElementById(overlayId);

    if (!checkList) {
        console.warn('Dropdown menu element not found:', menuId);
        return null;
    }

    // Toggle menu show/hide
    function toggleMenu() {
        if (checkList.classList.contains('visible')) {
            checkList.classList.remove('visible');
            if (overlay) overlay.classList.remove('show');
        } else {
            checkList.classList.add('visible');
            if (overlay) overlay.classList.add('show');
        }
    }

    // Click anchor to toggle menu
    var anchor = checkList.getElementsByClassName('anchor')[0];
    if (anchor) {
        anchor.onclick = function (evt) {
            evt.stopPropagation();
            toggleMenu();
        };
    }

    // Click overlay to close menu
    if (overlay) {
        overlay.onclick = function (evt) {
            evt.stopPropagation();
            checkList.classList.remove('visible');
            overlay.classList.remove('show');
        };
    }

    // Prevent event bubbling when clicking inside menu
    var items = checkList.getElementsByClassName('items')[0];
    if (items) {
        items.onclick = function (evt) {
            evt.stopPropagation();
        };
    }

    // Click close button to close menu
    var closeBtn = checkList.querySelector('.sidebar-close');
    if (closeBtn) {
        closeBtn.onclick = function (evt) {
            evt.stopPropagation();
            checkList.classList.remove('visible');
            if (overlay) overlay.classList.remove('show');
        };
    }

    return {
        toggleMenu: toggleMenu,
        checkList: checkList,
        overlay: overlay
    };
}

// ============================================
// 6. Map Initialization Helper Function (Generic but needs configuration)
// ============================================

/**
 * Initialize map
 * [Note] Map center point and zoom level may need to be adjusted according to the project
 * 
 * @param {string} containerId - Map container ID (default: 'map')
 * @param {Array} center - Map center point [lat, lng] (default: [30.356635, -97.701180] - Austin, TX)
 * @param {number} zoom - Initial zoom level (default: 12)
 * @param {Object} options - Leaflet map options
 * @returns {L.Map} Leaflet map object
 */
function initMap(containerId, center, zoom, options) {
    containerId = containerId || 'map';
    center = center || [30.356635, -97.701180]; // Default: Austin, TX
    zoom = zoom || 12;
    
    var defaultOptions = {
        preferCanvas: true,
        zoomControl: false,
        renderer: L.canvas()
    };
    
    var mapOptions = Object.assign({}, defaultOptions, options || {});
    
    var map = L.map(containerId, mapOptions).setView(center, zoom);
    
    // Add zoom control
    new L.Control.Zoom({ position: 'bottomright' }).addTo(map);
    
    // Set maximum zoom level
    map._layersMaxZoom = 19;
    
    // Hide attribution (optional - remove if you want to show attribution)
    var attribution = document.getElementsByClassName('leaflet-control-attribution')[0];
    if (attribution) {
        attribution.style.display = 'none';
    }
    
    return map;
}

// ============================================
// 7. Utility Functions
// ============================================

/**
 * Hide loading spinner
 */
function hideSpinner() {
    var spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.style.display = 'none';
    }
}

/**
 * Setup map click event handler
 * [Note] Customize this function based on project requirements
 * @param {L.Map} map - Leaflet map object
 */
function setupMapClickHandler(map) {
    map.on('click', function(e) {
        console.log('Map clicked at:', e.latlng);
        // Add your custom click handling logic here
    });
}

