/**property */
var map = {};
var view = {};
class GeoApp {
    /**
     * Constructor de clase
     * */
    constructor() {
        GeoApp.Init();
        //GeoApp.MapLoad();
    }

    static Init() {
        debugger;
        require([
            "esri/Map"
            , "esri/views/MapView"
            , "esri/layers/GraphicsLayer"
            , "esri/widgets/Sketch"
        ],
            function (Map, MapView, GraphicsLayer, Sketch) {

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

                //when the map is clicked create a buffer around the click point of the specified distance.
                map.on("click", function (evt) {
                    debugger;
                    map.graphics.clear();
                    map.graphics.add(new Graphic(evt.mapPoint, symbol));
                    map.infoWindow.setContent("X: " + evt.mapPoint.x.toString() + ", <br>Y: " + evt.mapPoint.y.toString());
                    map.infoWindow.show(evt.mapPoint)
                });


                //Bottom function
                var coordsWidget = document.createElement("div");
                coordsWidget.id = "coordsWidget";
                coordsWidget.className = "esri-widget esri-component";
                coordsWidget.style.padding = "7px 15px 5px";

                view.ui.add(coordsWidget, "bottom-right");

                view.watch("stationary", function (isStationary) {
                    showCoordinates(view.center);
                });

                view.on("pointer-move", function (evt) {
                    showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
                });

            });

            //*** ADD ***//
            function showCoordinates(pt) {
                var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
                    " | Scale 1:" + Math.round(view.scale * 1) / 1 +
                    " | Zoom " + view.zoom;
                coordsWidget.innerHTML = coords;
            }
    }

    static ClickEvent(evt) {
        debugger;
    }

    /**
     * Método principal de consumo
     * @returns false
     * */
    static MapLoad() {
        //TODO: cargar información geográfica.

    }

}