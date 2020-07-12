// Console.log to check see if code is working
console.log("The code is working!");

// Create a map object with a center & zoom level
let map = L.map("mapid").setView([40.7, -94.5],4);

// Create tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// Add the "graymap" tile layer to the map
streets.addTo(map);

