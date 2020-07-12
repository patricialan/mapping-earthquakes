// Add console.log to check to see if code is working
console.log("working");

// Create "streets" tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create "dark view" tile layer that will be background option for the map
let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
};

// Create a map object with a center (at Toronto) & zoom level
let map = L.map("mapid", {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});

// Pass map layers into our layers control & add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing Toronto airline routes GeoJSON URL
let torontoHoods = "https://raw.githubusercontent.com/patricialan/mapping-earthquakes/mapping-geojson-polygons/mapping-geojson-polygons/data/torontoNeighborhoods.json";

// Grab the GeoJSON data
d3.json(torontoHoods).then(function(data) {
    console.log(data);
    // Create a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        // Turn each feature into a marker on the map
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>");
        }
    }).addTo(map);
});

