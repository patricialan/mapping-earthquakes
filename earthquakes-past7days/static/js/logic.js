// -------------------Tile layers & base map ------------------------

// Create "streets" tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create "satellite view" tile layer that will be background option for the map
let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create "dark view" tile layer that will be background option for the map
let dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds all 3 tile layers
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets,
    "Dark": dark
};

// --------------------------------------------------------------

// Create earthquake layer for the map
let earthquakes = new L.layerGroup();
// Create tectonic plate layer for the map
let plates = new L.layerGroup();
// Define an object that contains the layers.
// This overlays will be visible all the time.
let overlays = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": plates
};

// Create a map object with a center (at Toronto) & zoom level
let map = L.map("mapid", {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
});

// Pass map layers into our layers control & add the layers control to the map
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing USGS earthquake data (past 7 days) GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Accessing tectonic plates GeoJSON URL
let tectonicPlatesData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// -------Earthquakes styling (for circleMarkers)-------------------

// Function returns style data for the earthquakes.
// Earthquake magnitude is passed into the function to calculate the radius.
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
};
// Function determines circle color based on quake magnitude
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
    }
    if (magnitude > 4) {
        return "#ea822c";
    }
    if (magnitude > 3) {
        return "#ee9c00";
    }
    if (magnitude > 2) {
        return "#eecc00";
    }
    if (magnitude > 1) {
        return "#d4ee00";
    }
    return "#98ee00";
}
// Function determines quake radius based on quake magnitude.
// Quakes with magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}
// ------Earthquake markers (apply style & popup) ----------------------

// Grab the GeoJSON data
d3.json(earthquakeData).then(function(data) {
    
    // Create a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        
        // Turn each feature into a circleMarker on the map
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        // Set style for each circleMarker using styleInfo function
        style: styleInfo,
        // Create popup for each circleMarker to display magnitude & location of the quake
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakes);

    // Add earthquake layer to the map
    earthquakes.addTo(map);
});

// -----------Tectonic plates ------------------------------

// Set color for tectonic plates
let myStyle = {
    color: "#bf0000"
};

// Grab the GeoJSON data
d3.json(tectonicPlatesData).then(function(data) {

    // Create a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        style: myStyle
    }).addTo(plates);
    // Add earthquake layer to the map
    plates.addTo(map);
});

// -----------Legend------------------------------------------

// Add a "legend control object" of colors corresponding to quake magnitudes
let legend = L.control({
    position: "bottomright"
});

// Add details for the legend
legend.onAdd = function() {
    // create a div with a class "info"
    let div = L.DomUtil.create('div', 'info legend'); 
    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
    ];
    // Loop through magnitude intervals to generate a label with a colored square for each interval.
   for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " + magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    };
    return div;
}

// Add legend to the map
legend.addTo(map);