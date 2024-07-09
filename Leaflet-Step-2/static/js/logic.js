

const init = async () => {

    var map = L.map('map').setView([0, 0], 2);
    const url1 ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";
    const url2 ="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";
    
    let legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      let div = L.DomUtil.create('div', 'legend');

      div.innerHTML += `
            <i style="background: green"></i>-10 -10<br>
            <i style="background: lime"></i>10 - 30<br>
            <i style="background: yellow"></i>30 - 50<br>
            <i style="background: orange"></i> 50 - 70<br>
            <i style="background: darkorange"></i> 70 - 90<br>
            <i style="background: red"></i> 90+<br>`;
      return div;
    };

    legend.addTo(map);

    const maps = {
        topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
        }),

        outdoor: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),

        humanitarian: L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
          attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team, &copy; OpenStreetMap contributors'
        }),

        light: L.tileLayer('https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
          style: 'light_all' // Example: light_all, dark_all, voyager, voyager_nolabels
        }),

        blue: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors',
          id: 'mapbox/streets-v11', // Example: streets-v11, satellite-v9, light-v10, dark-v10, outdoors-v11
          tileSize: 512,
          zoomOffset: -1,
          accessToken: API_KEY
        }),

        dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19,
          style: 'dark_all' // Example: light_all, dark_all, voyager, voyager_nolabels
        })
    };

    let data = await ( await fetch(url1)).json();
    let plates = await ( await fetch(url2)).json();

    // L.geoJSON(plates, {type:'polylines',color:'red'}).addTo(map)

    let earthquakes = L.geoJSON(data, {

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
        });

        earthquakes.addTo(map)

        maps.topo.addTo(map);
        L.control.layers(maps, {earthquakes}).addTo(map);
};

init();










