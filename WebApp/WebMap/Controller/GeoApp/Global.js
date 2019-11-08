/** Propiedaes globales */
var map = {};
var view = {};
var sketch = {};
var graphicsLayer = {};
var graphicInstance = null;


//Tipos de mapa a implementar
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
    }
//Posiciones permitidas para objeto view
var _enumTypePosition =
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
var _listPoligonToSave = [];
var _listGraphicsToDelete = [];

/** Métodos globales */