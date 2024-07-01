// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 2);

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker with a popup
L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A sample marker with popup')
    .openPopup();