// Console.log to check see if code is working
console.log("The code is working!");

// Create a map object with a center & zoom level
let map = L.map("mapid").setView([37, -97.6664],5);

// Coordinates for each point to be used in an "airplane flight" line
// San Fran -> Boulder, CO --> Austin, Texas -> Toronto -> New York
let line = [
    [37.6213, -122.3790],
    [40.0373, -105.2281],
    [30.1975, -97.6664],
    [43.6777, -79.6248],
    [40.6413, -73.7781]
];

// Create a polyline using the line coordinates & make the line red
L.polyline(line, {
    color: "blue",
    opacity: 0.5,
    dashArray: 4
}).addTo(map);

// Create tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// Add the "graymap" tile layer to the map
streets.addTo(map);

