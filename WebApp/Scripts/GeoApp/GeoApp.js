/**property */
var map = {};
var view = {};
var sketch = {};
var graphicsLayer = {};
let _enumTypeMaps = 
    {
        Topo: "topo"
        , Satellite:"satellite"
        , Hybrid:"hybrid"
        , Gray:"gray"
        , DarkGray:"dark-gray"
        , Oceans:"oceans"
        , Osm:"osm"
        , NationalGeographic:"national-geographic"
        , StreetsReliefVector: "streets-relief-vector"
}
let _enumTypeMaps =
{//bottom-leading | bottom-left | bottom-right | bottom-trailing | top-leading | top-left | top-right | top-trailing | manual
    TopRight: "top-right"
    , TopLeft: "top-left"
    , TopLeading: "top-leading"
    , TopTrailing: "top-trailing"
    , BottomRight: "bottom-right"
    , BottomLeft: "bottom-left"
    , BottomLeading: "bottom-leading"
    , BottomTrailing: "bottom-trailing"
    , Oceans: "oceans"
    , Osm: "osm"
}
/**
 * Clase parental de Instancia del mapa esri
 * */
class GeoApp {
    /**
     * Constructor de clase
     * */
    constructor() {
        GeoApp.Init();
    }

    static Init() {
        require(
            [
                "esri/Map"
                , "esri/views/MapView"
                , "esri/layers/GraphicsLayer"
                , "esri/widgets/Sketch"
            ],
            function (Map, MapView, GraphicsLayer, Sketch) {
                //Carga de la capa gráfica
                graphicsLayer = new GraphicsLayer();

                //Inicialización de componentes
                map = new Map(
                    {
                        basemap: _enumTypeMaps.Topo,
                        layers: [graphicsLayer]
                    });
                view = new MapView(
                    {
                        container: "viewDiv", // Referencia al objeton DOM (div)
                        map: map, // Referencia a objeto map
                        center: [-74.2973328, 4.570868], // longitude, latitude //Centro de Colombia
                        zoom: 8
                    });
                sketch = new Sketch(
                    {
                        view: view,
                        layer: graphicsLayer
                    });

                view.ui.add(sketch, "top-right");

                //Agregar componente de coordenadas
                AddCoordsToView();
                debugger;
                AddElementToView("button", "btnGuardar", ["btn", "btn-primary"], "bottom-left");
                /** Eventos Bind **/

                //Cuando se guarde el polígono se ejecuta este evento
                sketch.on("create", function (event) {
                    SavePolygon(event);
                });

                //evento complementario que guarda posición en mapa
                view.on("pointer-move", function (evt) {
                    ShowCoordinates(view.toMap({ x: evt.x, y: evt.y }));
                });

                //evento de asignación de coordenadas
                view.watch("stationary", function (isStationary) {
                    ShowCoordinates(view.center);
                });
            }
        );
    }
}