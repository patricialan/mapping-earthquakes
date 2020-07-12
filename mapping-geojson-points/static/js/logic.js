// Create "streets" tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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

// Create a base layer that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Create a map object with a center & zoom level
let map = L.map("mapid", {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
});

// Pass map layers into our layers control & add the layers control to the map
L.control.layers(baseMaps).addTo(map);

// Accessing airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/patricialan/mapping-earthquakes/master/mapping-geojson-points/data/majorAirports.json";

// Grab the GeoJSON data
d3.json(airportData).then(function(data) {
    console.log(data);
    // Create a GeoJSON layer with the retrieved data
    L.geoJson(data, {
        // Turn each feature into a marker on the map
        onEachFeature: function(feature, layer) {
            return layer.bindPopup("<h3> Airport code: " + feature.properties.faa + "</h3><hr><h3> Airport name: " + feature.properties.name + "</h3>");
        }
    })
    .addTo(map);
});