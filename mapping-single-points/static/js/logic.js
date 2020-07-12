// Console.log to check see if code is working
console.log("The code is working!");

// Create a map object with a center & zoom level
let map = L.map("mapid").setView([34.0522, -118.2437],14);

// Add a marker to the map for Los Angeles, California
let marker = L.circleMarker([34.0522, -118.2437], {
    color: 'black',
    fillColor: '#ffffa1',
    fillOpacity: 0.25,
    radius: 300
}).addTo(map);

// Create tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// Add the "graymap" tile layer to the map
streets.addTo(map);

