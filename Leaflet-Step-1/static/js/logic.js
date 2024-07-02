// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 2);

// Add a tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(url, data => {
    console.log(data);

    L.geoJSON(data, {
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.circleMarker(latlng);
        },
        style: feature => {
            let depth = feature.geometry.coordinates[2];

            console.log();
            return {
                color: 'black',
                weight: 1,
                fillOpacity: .65,
                fillColor: 
                    depth > 90 ? 'red' : 
                    depth > 70 ? 'darkorange' : 
                    depth > 50 ? 'orange' : 
                    depth > 30 ? 'yellow' :
                    depth > 10 ? 'lime' : 'green'
            };
        }
    }).bindPopup(function (layer) {
        return layer.feature.properties.description;
    }).addTo(map);

});