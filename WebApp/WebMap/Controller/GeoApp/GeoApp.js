/**property */
var map = {};
var view = {};
var sketch = {};
var graphicsLayer = {};
var graphicInstance = null;

//Tipos de mapa a implementar
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
//Posiciones permitidas para objeto view
let _enumTypePosition =
{
   TopRight: "top-right"
   , TopLeft: "top-left"
   , TopLeading: "top-leading"
   , TopTrailing: "top-trailing"
   , BottomRight: "bottom-right"
   , BottomLeft: "bottom-left"
   , BottomLeading: "bottom-leading"
   , BottomTrailing: "bottom-trailing"
   , Manual: "manual"
}
//Lista de polígonos a guardar
let _listPoligonToSave = [];
let _listGraphicsToDelete = [];

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
                , "esri/Graphic"
                , "esri/layers/GraphicsLayer"
                , "esri/widgets/Sketch"
            ],
            function (Map, MapView, Graphic, GraphicsLayer, Sketch) {
                //Carga de la capa gráfica
                graphicsLayer = new GraphicsLayer();

                //Instanciamos objeto de tipo Graphics para poder usar sus métodos en las clases funcionales
                graphicInstance = new Graphic();

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

                AddElementToView("button", "btnGuardar", "Guardar", ["btn", "btn-success", "hovicon effect"], _enumTypePosition.TopLeading, false);
                AddElementToView("button", "btnCargar", "Cargar", ["btn", "btn-primary", "hovicon effect"], _enumTypePosition.TopLeading);

                /**************************** Eventos Bind ****************************/

                //Cuando se guarde el polígono se ejecuta este evento
                sketch.on("create", function (event) {
                    SavePolygon(event);
                });

                //evento complementario que guarda posición en mapa
                view.on("pointer-move", function (evt) {
                    ShowCoordinates(
                        view.toMap(
                            { x: evt.x, y: evt.y }
                        )
                    );
                });

                //evento de asignación de coordenadas
                view.watch("stationary", function (isStationary) {
                    ShowCoordinates(view.center);
                });

                //evento de guardado de polígonos
                $('#btnGuardar').on('click', function(evt) {
                    let namefile = `_PolygonSaved_.json`
                    // SavePolygonList(namefile, 'text/json');
                    debugger;
                    SavePolygonList(namefile);
                });

                //evento de carga de polígonos
                $('#btnCargar').on('click', function(evt) {
                    // LoadJsonPolygon('_PolygonSaved_.json');
                    $.getJSON('_PolygonSaved_.json', function(json) {
                        json.forEach(x => {
                            if(x.length > 0)
                            {

                            }
                            let polygon = {
                                type: "polygon",
                                rings: x
                              };
                        
                            let simpleFillSymbol = {
                                type: "simple-fill",
                                color: [227, 139, 79, 0.8],  // orange, opacity 80%
                                outline: {
                                    color: [255, 255, 255],
                                    width: 1
                                }
                            };
                            debugger;
                            let polygonGraphic = new Graphic({
                                geometry: polygon,
                                symbol: simpleFillSymbol
                              });
                            
                            graphicsLayer.add(polygonGraphic);
                        });
                    });
                });
            }
        );
    }
}