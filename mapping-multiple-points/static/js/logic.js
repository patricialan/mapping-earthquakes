// Console.log to check see if code is working
console.log("The code is working!");

// Create a map object with a center & zoom level
let map = L.map("mapid").setView([40.7, -94.5],4);

// Get data from cities.js
let cityData = cities;

// Loop through the cities array & create 1 marker for each city
cityData.forEach(function(city) {
    console.log(city);
    L.circleMarker(city.location, {
        color: 'orange',
        fillColor: '#ffa500',
        fillOpacity: 0.25,
        lineWidth: 4,
        radius: city.population/100000
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2><hr><h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});

// Create tile layer that will be background of the map
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});

// Add the "graymap" tile layer to the map
streets.addTo(map);

