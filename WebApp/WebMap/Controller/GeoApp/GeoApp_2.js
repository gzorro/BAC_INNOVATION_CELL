
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
        require([
            "esri/tasks/BufferParameters", "esri/SpatialReference", "dojo/dom", 
            "esri/tasks/GeometryService"
          ], function(BufferParameters, SpatialReference, dom, GeometryService) {
            var params = new BufferParameters();
            params.geometries  = [ evt.mapPoint ];
            
            params.distances = [ dom.byId('bufferDistance').value ];
            params.unit = GeometryService.UNIT_KILOMETER;
            params.bufferSpatialReference = new SpatialReference({wkid: 32662});
            params.outSpatialReference = map.spatialReference;
            gsvc.buffer(params);
          });
    }
}