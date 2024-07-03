var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(url, data => {
    console.log(data);

    L.geoJSON(data, {
        pointToLayer: (geoJsonPoint, latlng) => {
            return L.circleMarker(latlng);
        },
        style: feature => {
            let depth = feature.geometry.coordinates[2];
            let mag = feature.properties.mag;

            console.log (feature.properties.mag)


            return {
                radius: mag*2,
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
    }).bindPopup(layer => {
        let depth = layer.feature.geometry.coordinates[2];
        let place = layer.feature.properties.place;
        let time = new Date(layer.feature.properties.time).toLocaleString();
        let magnitude = layer.feature.properties.mag;

        return `<h3>${place}<br>Magnitude: ${magnitude}<br>Depth: ${depth}<br>${time}</h3>`;


    }).addTo(map);
});

let legend = L.control({position:'bottomright'});

legend.onAdd = () => {
    let div = L.DomUtil.create('div','legend');

    div.innerHTML +='<h1>HELLO there!!!<h1>'

    return div;
};

legend.addTo(map);
