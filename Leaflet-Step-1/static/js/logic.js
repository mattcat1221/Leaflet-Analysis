var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

d3.json(url, data => {
    L.geoJSON(data, {

        pointToLayer: (data, latlng) => {
            return L.circleMarker(latlng)
        },

        style: function (feature) {
            let mag = feature.properties.mag;
            let depth = feature.geometry.coordinates[2];

            return {
                radius: mag*2,
                fillOpacity: 1,
                weight: 1,
                color: 'black',
                fillColor:
                    depth < 10 ? 'green' : 
                    depth < 30 ? 'lime' :
                    depth < 50 ? 'yellow' :
                    depth < 70 ? 'orange' :
                    depth < 90 ? 'darkorange' : 'red'
            };
        }

    }).bindPopup(function (layer) {
        let place = layer.feature.properties.place;
        let mag = layer.feature.properties.mag;
        let time = new Date(layer.feature.properties.time).toLocaleString();
        let depth = layer.feature.geometry.coordinates[2];

        return `<h3>
            ${place}<br>
            Magnitude: ${mag}<br>
            Depth: ${depth}<br>
            ${time}</h3>`

    }).addTo(map);
});

let legend = L.control({position:'bottomright'});

legend.onAdd = () => {
    let div = L.DomUtil.create('div','legend');

    div.innerHTML +=`
        <i style="background: green"></i>-10 -10<br>
        <i style="background: lime"></i>10 - 30<br>
        <i style="background: yellow"></i>30 - 50<br>
        <i style="background: orange"></i> 50 - 70<br>
        <i style="background: darkorange"></i> 70 - 90<br>
        <i style="background: red"></i> 90+<br>`;

    return div;
};
legend.addTo(map);
