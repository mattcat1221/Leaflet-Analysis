<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Earthquake Map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <style>
        #map { height: 600px; }
        .info.legend { background: white; line-height: 1.5em; padding: 10px; }
        .info.legend i { width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script>
        // Create the map object
        var myMap = L.map("map", {
            center: [37.7749, -122.4194],
            zoom: 5
        });

        // Add a tile layer (background map image) to the map
        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: "pk.eyJ1IjoiY2hpYW15YzA5ODciLCJhIjoiY2swdzUxb3I2MGRiMzNpbnliN293OXBteiJ9.at8rk5Trv5oNH1dD2E9EAw"
        }).addTo(myMap);

        // Store the API endpoint
        var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

        // Perform a GET request to the query URL
        d3.json(queryUrl, function(data) {
            function styleInfo(feature) {
                return {
                    opacity: 1,
                    fillOpacity: 1,
                    fillColor: getColor(feature.properties.mag),
                    color: "#000000",
                    radius: getRadius(feature.properties.mag),
                    stroke: true,
                    weight: 0.5
                };
            }

            // Determine the color based on the magnitude
            function getColor(magnitude) {
                switch (true) {
                    case magnitude > 5:
                        return "#ea2c2c";
                    case magnitude > 4:
                        return "#ea822c";
                    case magnitude > 3:
                        return "#ee9c00";
                    case magnitude > 2:
                        return "#eecc00";
                    case magnitude > 1:
                        return "#d4ee00";
                    default:
                        return "#98ee00";
                }
            }

            // Determine the radius based on the magnitude
            function getRadius(magnitude) {
                if (magnitude === 0) {
                    return 1;
                }
                return magnitude * 4;
            }

            // Create a GeoJSON layer
            L.geoJson(data, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng);
                },
                style: styleInfo,
                onEachFeature: function(feature, layer) {
                    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
                }
            }).addTo(myMap);

            // Create the legend control object
            var legend = L.control({ position: "bottomright" });

            legend.onAdd = function() {
                var div = L.DomUtil.create("div", "info legend");
                var grades = [0, 1, 2, 3, 4, 5];
                var colors = [
                    "#98ee00",
                    "#d4ee00",
                    "#eecc00",
                    "#ee9c00",
                    "#ea822c",
                    "#ea2c2c"
                ];

                // Loop through intervals to generate a label with a colored square for each interval
                for (var i = 0; i < grades.length; i++) {
                    div.innerHTML +=
                        "<i style='background: " + colors[i] + "'></i> " +
                        grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
                }
                return div;
            };

            // Add the legend to the map
            legend.addTo(myMap);
        });
    </script>
</body>
</html>
