/**
 * Célula parental de aplicación
 * @Authors {Germán F. Grimaldi}, {Javier Becerra}
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
			function (
					Map
					//, WebMap
					, MapView
					, Graphic
					, GraphicsLayer
					, Sketch
					, Search
					, SpatialReference
					, Point
					// , Popup
					// , FeatureLayer
                    , GeometryService
                    , AreasAndLengthsParameters
				){

				/* Instancia de elementos base de aplicación */
				graphicsLayer = new GraphicsLayer();
                geometryService = new GeometryService("https://sampleserver6.arcgisonline.com/ArcGIS/rest/services/Utilities/Geometry/GeometryServer");

                const viewSpatialReference = new SpatialReference({
                    //wkid: 54042 // winkel III
                    // wkid: 4326  // WGS84  
                    wkid:102100   //flat coords 
                });

                const point = new Point({
                    x:-8230739.205745591, 
                    y:525886.7546018914,
                    spatialReference: viewSpatialReference
				});
				
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
                        center: [-74.2973328, 4.570868], // longitude, latitude //Centro de Colombia                                                
                        zoom: 8
                    }
                );
                //Create function
                sketch = new Sketch({
					view: view,
                    layer: graphicsLayer,
                    availableCreateTools: ["polygon", "rectangle", "circle"]
                });

                searchWidget = new Search({
                    view: view                                      
                });                  

				view.ui.add(sketch, _enumTypePosition.TopRight);
                view.ui.add(searchWidget, {
                    position: _enumTypePosition.TopLeft
                    //index: 2                  
                });
				
                //Agregar componente de coordenadas
                AddCoordsToView();
                
                AddElementToView("button", "btnGuardar", "Guardar", ["btn", "btn-success", "hovicon effect"], _enumTypePosition.TopLeading, false);
                AddElementToView("input-file", "btnCargar2", "Cargar2", ["btn", "btn-primary", "form-control-file"], _enumTypePosition.TopLeading);
                AddElementToView("button", "btnCargar", "Cargar", ["btn", "btn-primary", "hovicon effect"], _enumTypePosition.TopLeading);
                

                // LoadBDData();

                /**************************** Eventos Bind ****************************/
				GeoApp.BindEvents(Graphic, AreasAndLengthsParameters);
			}
        );
    }

	/**
	 * Eventos sobre elementos de la aplicación
	 */
    static BindEvents(Graphic,AreasAndLengthsParameters)
    {
		//evento de guardado de polígonos
        $('#btnGuardar').on('click', function(evt) {
            let namefile = '_PolygonSaved_.json';
            SavePolygonList(namefile, AreasAndLengthsParameters);
            
        });

        //evento de carga y graficación de polígonos guardados
        $('#btnCargar').on('click', function(evt) {
            if(btnCargar2.files.length == 1)
            {
                debugger;
                if(btnCargar2.files[0].name.includes(".json"))
                    LoadAndDrawPolygonFromJson(Graphic, AreasAndLengthsParameters);
                else
                    alert('El formato del archivo debe ser json (.json)');
                btnCargar2.value = ""
            }
            else
                alert('Debe seleccionar primero un archivo');
        });

        //Cargar datos de excel
        $('#btnCargarExcel').on('click',function(){
            LoadDataExcel();
        });
		
        //Cuando se guarde un polígono seleccionado
        sketch.on("create", function (event) {
            SavePolygon(event);
        });

        //Cuando se borre un polígono selecciondo
        sketch.on("delete", function (event) {
            let polygonCoordinate = event.graphics[0].geometry.rings;
            let polygonObject = SetPolygon(polygonCoordinate, event.graphics[0].geometry.centroid).polygon;
            _listGraphicsToDelete.pop(event.graphics[0]);
            debugger;
            if(_listPolygonWithArea.length > 0)
            {
                let objectP = _listPolygonWithArea.find(x => x.rings == polygonObject.rings);
                _listPolygonWithArea.pop(objectP);
            }
            else
                _listPoligonToSave.pop(polygonObject);
            //graphicsLayer.remove(event.graphic)
        });

        //evento complementario que guarda posición en mapa
        view.on("pointer-move", function (evt) {
            ShowCoordinates(view.toMap({ x: evt.x, y: evt.y }));
        });

        //evento de asignación de coordenadas
        view.watch("stationary", function (isStationary) {
            ShowCoordinates(view.center);
		});

		// Get the screen point from the view's click event
		view.on("click", function (event) {
            debugger;
			ShowPolygonGeographic(event);
   		});

        //Busqueda
        searchWidget.on('search-complete', function(event){  
			SearchAndShowData(event);
        });
	}
}