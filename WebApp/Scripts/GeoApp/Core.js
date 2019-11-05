﻿(ExecuteCore = () => {
    debugger;
    require([
            "esri/Map"
            , "esri/views/MapView"
            , "esri/layers/GraphicsLayer"
            , "esri/widgets/Sketch"
        ],
    function(Map, MapView, GraphicsLayer, Sketch) {

        var graphicsLayer = new GraphicsLayer();

        map = new Map({
            //basemap: "streets-relief-vector" //Mostrar modo calle
            basemap: "topo", //Mostrar modo topográfico

            //basemap disponibles(para implementar solo se necesita cambiar el string value): 
            //satellite, hybrid, topo, gray, dark-gray, oceans, osm, national-geographic

            //*** ADD ***//
            layers: [graphicsLayer]

        });

        view = new MapView({
            container: "viewDiv", // Reference to the DOM node that will contain the view
            map: map, // References the map object created
            center: [-74.2973328, 4.570868], // longitude, latitude //Centro de Colombia
            //center: [-118.80500, 34.02700], // longitude, latitude //Original
            zoom: 8
        });

        var sketch = new Sketch({
            view: view,
            layer: graphicsLayer
        });

        view.ui.add(sketch, "top-right");

    });
})();