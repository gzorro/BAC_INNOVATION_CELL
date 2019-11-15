/**
 * Célula transversal de persistencia
 * @Authors {Germán F. Grimaldi}, {Javier Becerra}
 * 
 * */
/** Propiedaes globales */
var map = {};
var webMap ;
var view = {};
var sketch = {};
var graphicsLayer = {};
var graphicInstance = null;
var searchWidget = {};
var geometryService = {};
var arregloJson;
var valorAptitud;
var valorCultivo;

//Referencias de esri
var _listEsriReferences = 
[
    "esri/Map"
    //, "esri/WebMap"
    , "esri/views/MapView"
    , "esri/Graphic"
    , "esri/layers/GraphicsLayer"
    , "esri/widgets/Sketch"
    , "esri/widgets/Search"
    , "esri/geometry/SpatialReference"
    , "esri/geometry/Point"
    , "esri/widgets/Popup"
    , "esri/layers/FeatureLayer"
    , "esri/tasks/GeometryService"
]

//Tipos de mapas a implementar(for Map)
var _enumTypeMaps = 
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
    , StreetsNavigationVector: "streets-navigation-vector"
}
//Posiciones permitidas para objeto view
var _enumTypePosition =
{
    TopRight: "top-right"
   , TopLeft: "top-left"
   , TopLeading: "top-leading"
   , TopTrailing: "top-trailing"
   , TopCenter: "top-center"
   , BottomRight: "bottom-right"
   , BottomLeft: "bottom-left"
   , BottomLeading: "bottom-leading"
   , BottomTrailing: "bottom-trailing"
   , Manual: "manual"
}
//Lista de polígonos a guardar
var _listPoligonToSave = [];
//Lista de polígonos a borrar
var _listGraphicsToDelete = [];
//Lista de contenido de datos
var _listDataContent=[];



/** Métodos globales */