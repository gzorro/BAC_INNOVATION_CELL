
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
        require(_listEsriReferences,
            function (Map, WebMap, MapView, Graphic, GraphicsLayer, Sketch,Search) {
                //Carga de la capa gráfica
                graphicsLayer = new GraphicsLayer();


                //Inicialización de componentes
                map = new Map(
                    {
                        basemap: _enumTypeMaps.Hybrid,
                        layers: [graphicsLayer]                        
                    });
                // webMap = new WebMap(
                //     {
                //         portalItem: {
                //             id: "e691172598f04ea8881cd2a4adaa45ba"
                //         },
                        
                //   });

                

                view = new MapView(
                    {
                        container: "viewDiv", // Referencia al objeton DOM (div)
                        map: map, // Referencia a objeto map
                        // map: webMap, // Referencia a objeto webMap
                        center: [-74.2973328, 4.570868], // longitude, latitude //Centro de Colombia                                                
                        zoom: 8
                    });


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
                    if(event.results && event.results.length > 0 && event.results[0].results && event.results[0].results.length > 0){
                      geom = event.results[0].results[0].feature.geometry;
                      console.log(geom.latitude + ", " + geom.longitude);
                      latitud = geom.latitude;
                      longitud = geom.longitude;
                   
                      //openModal();
                     
                      /*
                      */
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
                        aviableCreateTools: ["polygon"],
                        layer: graphicsLayer
                    });

                view.ui.add(sketch, "top-right");

                //Agregar componente de coordenadas
                // AddCoordsToView();

                AddElementToView("button", "btnGuardar", "Guardar", ["btn", "btn-success", "hovicon effect"], _enumTypePosition.TopLeading, false);
                AddElementToView("button", "btnCargar", "Cargar", ["btn", "btn-primary", "hovicon effect"], _enumTypePosition.TopLeading);

                /**************************** Eventos Bind ****************************/

                //Cuando se guarde el polígono se ejecuta este evento
                sketch.on("create", function (event) {
                    SavePolygon(event);
                });

                //evento complementario que guarda posición en mapa
                // view.on("pointer-move", function (evt) {
                //     ShowCoordinates(
                //         view.toMap(
                //             { x: evt.x, y: evt.y }
                //         )
                //     );
                // });

                //evento de asignación de coordenadas
                // view.watch("stationary", function (isStationary) {
                //     ShowCoordinates(view.center);
                // });

                //evento de guardado de polígonos
                $('#btnGuardar').on('click', function(evt) {
                    let namefile = `_PolygonSaved_.json`
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