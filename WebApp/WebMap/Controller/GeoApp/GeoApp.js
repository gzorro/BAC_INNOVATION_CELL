
/**
 * Clase parental de Instancia del mapa esri
 * */
class GeoApp {
    /**
     * Constructor de clase
     * */
    constructor() {
        GeoApp.Init();
        //Mostar ventana emergente con info de aptiitud
        $('#open').on('click', function(){             
            $('#popup').fadeIn('slow');
            $('.popup-overlay').fadeIn('slow');
            $('.popup-overlay').height($(window).height());
                return false;
            });

            $('#close').on('click', function(){
                $('#popup').fadeOut('slow');
                $('.popup-overlay').fadeOut('slow');
                //location.reload();
                $("#carga_info").empty()
                return false;
            });
    }

    static Init() {
        require(_listEsriReferences,
            function (Map, WebMap, MapView, Graphic, GraphicsLayer, Sketch,Search,SpatialReference,Point) {
                //Carga de la capa gráfica
                graphicsLayer = new GraphicsLayer();

                const viewSpatialReference = new SpatialReference({
                    //wkid: 54042 // winkel III
                    wkid:102100
                });

                const point = new Point({
                    x:-8230739.205745591, 
                    y:525886.7546018914,
                     spatialReference: viewSpatialReference
                });

                //Inicialización de componentes
                map = new Map(
                    {
                        basemap: _enumTypeMaps.Hybrid,
                        layers: [graphicsLayer],                             
                        center: point,
                        scale: 15000000
                    });
                view = new MapView(
                    {
                        container: "viewDiv", // Referencia al objeton DOM (div)
                        map: map, // Referencia a objeto map
                        // map: webMap, // Referencia a objeto webMap
                        center: [-74.2973328, 4.570868], // longitude, latitude //Centro de Colombia                                                
                        zoom: 8
                    }
                );

                //Buscador
                searchWidget = new Search({
                    view: view                                      
                });                  

                view.ui.add(searchWidget, {
                    position: "top-left"
                    //index: 2                  
                });
                 
                searchWidget.on("select-result", function(event){
                    //console.log("The selected search result: ", event);        
                });

                searchWidget.on('search-complete', function(event){
                    debugger;
                    if(event.results && event.results.length > 0 && event.results[0].results && event.results[0].results.length > 0){
                        
                     let latitud;
                     let longitud;
                      latitud = event.results[0].results[0].extent.xmax; 
                      longitud = event.results[0].results[0].extent.ymax;
                   
                      openModal();
                     
                      //  Funcion cargar cultivo       
                      buscarCultivo(latitud, longitud);  

                      //Función según punto trae la info de aptitud de cultivo
                      searchPoint( latitud, longitud);   
                    
                    }else{                      
                      console.log("No hay resultados");
                    }
                 
                });
        
                //Fin buscador
                sketch = new Sketch(
                    {
                        view: view,
                        aviableCreateTools: ["polygon", "rectangle", "circle"],
                        layer: graphicsLayer
                    });

                view.ui.add(sketch, "top-right");

                //Agregar componente de coordenadas
                 AddCoordsToView();
                
                AddElementToView("button", "btnGuardar", "Guardar", ["btn", "btn-success", "hovicon effect"], _enumTypePosition.TopLeading, false);
                AddElementToView("button", "btnCargar", "Cargar", ["btn", "btn-primary", "hovicon effect"], _enumTypePosition.TopLeading);
                debugger;
                AddElementToView("button", "btnCargarExcel", "Excel", ["btn", "btn-success", "hovicon effect"], _enumTypePosition.TopLeading);
                AddElementToView("input-file", "fileupd", "", ["form-control", "custom-file-input"], _enumTypePosition.BottomRight);
                               
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
                    SavePolygonList(namefile);
                });

                //evento de carga de polígonos
                $('#btnCargar').on('click', function(evt) {
                    $.getJSON('_PolygonSaved_.json', function(json) {
                        json.forEach(x => {
                            let _partialObj = SetPolygon(x);
                            let polygonGraphic = new Graphic({
                                geometry: _partialObj.polygon,
                                symbol: _partialObj.simpleFillSymbol
                              });
                            
                            graphicsLayer.add(polygonGraphic);
                        });
                    });
                });

                $('#btnCargarExcel').on('click',function()
                {
                    LoadDataExcel();
                });
            }
        );
    }
}