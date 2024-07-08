var map = L.map('map').setView([0, 0], 2);

// https://www.openstreetmap.org/?edit_help=1#map=4/37.47/-106.74&layers=P

const outdoor = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  
const topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'
})

const humanitarian = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: 'Tiles courtesy of Humanitarian OpenStreetMap Team, &copy; OpenStreetMap contributors'
});

const light = L.tileLayer('https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    style: 'light_all' // Example: light_all, dark_all, voyager, voyager_nolabels
});

const blue = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors',
    id: 'mapbox/streets-v11', // Example: streets-v11, satellite-v9, light-v10, dark-v10, outdoors-v11
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

const dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/{style}/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    style: 'dark_all' // Example: light_all, dark_all, voyager, voyager_nolabels
});
  
  //  //create a satellite tile layer
//  var satellitemap = L.tileLayer("pk.eyJ1IjoibWF0dGNhdCIsImEiOiJjbHljNTd2ZHExbGhuMmpvcmgwbDRraXg5In0.9g1ekKOFpqTIw1Z0O3z8Dg", {
  //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //     maxZoom: 18,
//     id: "mapbox.satelliate",
//     accessToken: 'pk.eyJ1IjoibWF0dGNhdCIsImEiOiJjbHljNTd2ZHExbGhuMmpvcmgwbDRraXg5In0.9g1ekKOFpqTIw1Z0O3z8Dg'
// });


// //create a light tile layer
// var lightmap = L.tileLayer("https://www.api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoibWF0dGNhdCIsImEiOiJjbHljNTd2ZHExbGhuMmpvcmgwbDRraXg5In0.9g1ekKOFpqTIw1Z0O3z8Dg}", {
  // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
// maxZoom: 18,
// id: "light-v10",
// accessToken: API_KEY
// });

//create an terrain tile layer
var terrainmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.mapbox-terrain-v2",
  accessToken: API_KEY
});

// const url ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

// d3.json(url, data => {
//     L.geoJSON(data, {

//         pointToLayer: (data, latlng) => {
//             return L.circleMarker(latlng)
//         },

//         style: function (feature) {
//             let mag = feature.properties.mag;
//             let depth = feature.geometry.coordinates[2];

//             return {
//                 radius: mag*2,
//                 fillOpacity: 1,
//                 weight: 1,
//                 color: 'black',
//                 fillColor:
//                     depth < 10 ? 'green' : 
//                     depth < 30 ? 'lime' :
//                     depth < 50 ? 'yellow' :
//                     depth < 70 ? 'orange' :
//                     depth < 90 ? 'darkorange' : 'red'
//             };
//         }

//     }).bindPopup(function (layer) {
//         let place = layer.feature.properties.place;
//         let mag = layer.feature.properties.mag;
//         let time = new Date(layer.feature.properties.time).toLocaleString();
//         let depth = layer.feature.geometry.coordinates[2];

//         return `<h3>
//             ${place}<br>
//             Magnitude: ${mag}<br>
//             Depth: ${depth}<br>
//             ${time}</h3>`

//     }).addTo(map);
// });

// let legend = L.control({position:'bottomright'});

// legend.onAdd = () => {
//     let div = L.DomUtil.create('div','legend');

//     div.innerHTML +=`
//         <i style="background: green"></i>-10 -10<br>
//         <i style="background: lime"></i>10 - 30<br>
//         <i style="background: yellow"></i>30 - 50<br>
//         <i style="background: orange"></i> 50 - 70<br>
//         <i style="background: darkorange"></i> 70 - 90<br>
//         <i style="background: red"></i> 90+<br>`;

//     return div;
// };
// legend.addTo(map);
// // Function to create map layers
// function createMap(earthquakes) {

//     //create a satellite tile layer
//     var satellitemap = L.tileLayer("pk.eyJ1IjoibWF0dGNhdCIsImEiOiJjbHlhZWk1ajYwenR1Mm1xNms5dnBsaHdmIn0.FSKB4nTfc_mtCdKQoJN2og", {
//           attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//           maxZoom: 18,
//           id: "mapbox.satellite",
//           accessToken: API_KEY
//       });

//     //create a light tile layer
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={pk.eyJ1IjoibWF0dGNhdCIsImEiOiJjbHlhZWk1ajYwenR1Mm1xNms5dnBsaHdmIn0.FSKB4nTfc_mtCdKQoJN2og}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "light-v10",
//       accessToken: API_KEY
//     });

//     //create an terrain tile layer
//     var terrainmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "mapbox.mapbox-terrain-v2",
//         accessToken: API_KEY
//     });

//       // Define a baseMaps object to hold our base layers
//       var baseMaps = {
//         "Satellite": satellitemap,
//         "Grayscale": lightmap,
//         "Terrain": terrainmap
//     };

//     // Create overlay object to hold our overlay layer
//     var overlayMaps = {
//         "Earthquakes": earthquakes,
//     };

//     // Create the map with our layers
//     myMap = L.map("map", {
//       center: [32.00, -87.00],
//       zoom: 3,
//       layers: [satellitemap, earthquakes]
//     });

//     // Create a layer control
//     // Pass in our baseMaps and overlayMaps
//     // Add the layer control to the map
//     controlLayers = L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(myMap);

//     // Add legend to myMap
//     info.addTo(myMap);

// };


// // Create legend and position on bottom right of map
// var info = L.control({position: "bottomright"});

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {

//   // Create a <div> element to insert legend
//   var div = L.DomUtil.create("div", "legend");

//   // Create labels and values to find colors
//   var magnitudeLabels = ["0-1", "1-2", "2-3", "3-4", "4-5", "5+"];
//   var magnitudeScale = [0.5, 1.5, 2.5, 3.5, 4.5, 5.5];

//   // Create the legend inner html
//   div.innerHTML = '<div><strong>Legend</strong></div>';
//   for (var i = 0; i < magnitudeScale.length; i++) {
//     div.innerHTML += '<i style = "background: ' + circleHue(magnitudeScale[i]) 
//     + '"></i>&nbsp;' + magnitudeLabels[i] + '<br/>';
//   };
//   return div;
// };


// // Function to create overlay on tetonic plate boundaries
// function createOverlay(tectonicplatesData) {

//   // Create a GeoJSON layer containing the features array on the tectonicplatesData object
//   var tectonic = L.geoJSON(tectonicplatesData, {

//     // Update default style for polygon
//     style: {
//       color: "rgb(253,126,20)",
//       opacity: 1,
//       fill: false
//     }

//   })

//   // Add new layer to map
//   myMap.addLayer(tectonic);

//   // Add tectonic plates overlay to layer control
//   controlLayers.addOverlay(tectonic, "Fault Lines")

// };