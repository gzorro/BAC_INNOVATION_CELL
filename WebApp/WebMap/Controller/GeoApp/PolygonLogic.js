/**
 * Célula de funcionalidad de polígonos
 * @Author {Germán F. Grimaldi}
 * */

/* ******************************************************************************************************* */
/* ******************************************************************************************************* */

/**
 * Establece los parámetros de definición del polígono
 * @param {Array} pPolygonCoords Coordenadas del polígono
 */
function SetPolygon(pPolygonCoords, pWkid = 102100)
{
    if(pPolygonCoords.length > 0)
    {
        let _polygon = {
            type: "polygon",
            rings: pPolygonCoords,
            spatialReference: { wkid: pWkid }
            };
    
        let _simpleFillSymbol = {
            type: "simple-fill",
            color: [227, 139, 79, 0.8],  // orange, opacity 80%
            outline: {
                color: [255, 255, 255],
                width: 1
            }
        };
        let objectPartial = {
            polygon: _polygon,
            simpleFillSymbol: _simpleFillSymbol
        };

        return objectPartial;
    }
}

/**
 * Guardar coordenadas de polígono en .json
 * @param {any} event
 */
function SavePolygon (event) {
    if (event.state === "complete") {
        let polygonCoordinate = event.graphic.geometry.rings;
        let polygonObject = SetPolygon(polygonCoordinate).polygon;
        debugger;
        _listPoligonToSave.push(polygonObject); 
        _listGraphicsToDelete.push(event);
        if(_listPoligonToSave.length == 1)
        {
            $('#btnGuardar').show('slow');
        }
        // PushAreasAndLengths(event, polygonObject,AreasAndLengthsParameters);
    }
}

/**
 * Guardar la lista de polígonos registrada en un archivo de tipo
 * @param {string} nameFile nombre del archivo
 */
function SavePolygonList(nameFile, AreasAndLengthsParameters)
{
    debugger;
    if(_listPoligonToSave.length > 0)
    {
        //Antes de guardar el json es necesario realizar los cálculos de área y longitud
        _listPolygonWithArea = [];
        PushAreasAndLengths(_listPoligonToSave, AreasAndLengthsParameters, nameFile);
        // _listPoligonToSave.forEach(x => 
        //     {
        //     });
        
    }else{
        alert('No se ha registrado ningún polígono aún. A continuación registra un polígono e intenta de nuevo');
    }
}

/**
 * Eliminar los polígonos que ya se han guardado en el archivo plano
 */
function RemovePolygon()
{
    _listGraphicsToDelete.forEach(x => graphicsLayer.remove(x.graphic))    
}

/**
 * Muestra respectiva información en cuanto a un polígono
 */
function ShowPolygonGeographic(event)
{
    let screenPoint = {
        x: event.x,
        y: event.y
    };
    debugger;
    // Search for graphics at the clicked location
    view.hitTest(screenPoint).then(function (response) {
        if (response.results.length) {
            //Entra si hay un polígono seleccionado
            SearchAndShowDataByPos(response.results[0].graphic.geometry.centroid.x, response.results[0].graphic.geometry.centroid.y);
        }
    });
}

/**
 * Ejecuta guardado de archivo a través de una simulación de evento
 * @param {string} content Contenido en formato determinado (.json, .xml)
 * @param {string} fileName Nombre del archivo que se va a agurdar incluyendo formato (.json, .xml, .txt) 
 * @param {string} contentType Typo de contenido // Default value: 'text/json'
 */
function DownloadPolygon(content, fileName = '_PolygonSavedTest_.json', contentType = 'text/json') {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    a.remove();
}

/**
 * Carga la lista de polígonos en el mapa
 * @param {any} jsonList lista de polígonos
 * @param {any} Graphic instancia del servicio esri 
 */
function DrawJsonPolygon(jsonList, Graphic)
{
    jsonList.forEach(x => {
        let _partialObj = SetPolygon(x.rings);
        
        let polygonGraphic = new Graphic({
            geometry: _partialObj.polygon,
            symbol: _partialObj.simpleFillSymbol
        });
        let fullObject = {
            polygon: polygonGraphic.geometry,
            area: x.area,
            length: x.length
        }
        _listPolygonWithArea.push(fullObject);
        
        graphicsLayer.add(polygonGraphic);

    });
}

/**
 * Carga archivo input-file y dibuja los polígonos cargados en el mapa
 * @param {*} Graphic Instancia de clase Graphic
 * @param {*} AreasAndLengthsParameters Instancia de Clase Geometry
 */
function LoadAndDrawPolygonFromJson (Graphic, AreasAndLengthsParameters)
{
    let dataJson;
    let reader = new FileReader();
    reader.onload = function(e) { 
        let contents = e.target.result;
        dataJson = JSON.parse(contents);
        DrawJsonPolygon(dataJson, Graphic);
    };
    reader.readAsText(btnCargar2.files[0]);
}

/**
 * Cálcula del área y prímetro de una lista y la guarda en un archivo json
 * @param {List<Polygon>} pPolygonList Lista de polígonos a guardar 
 * @param {*} AreasAndLengthsParameters Instancia de clase
 * @param {*} pNameFile Nombre de archivo
 * @param {*} pCalculationType Tipo de cálculo
 * @param {*} pAreaUnit unidad de medida para el área (square-kilometer)
 * @param {*} pLengthUnit unidad de medida para el perímetro (kilometers)
 */
function PushAreasAndLengths(pPolygonList,AreasAndLengthsParameters, pNameFile, pCalculationType = _enumCalculationType.Planar, 
    pAreaUnit = _enumAreaUnits.SquareKilometer, pLengthUnit = _enumLengthUnit.Kilometer)
{
    let areasAndLengthParams = new AreasAndLengthsParameters({
        // areaUnit: 9036,
        calculationType: pCalculationType,
        areaUnit: pAreaUnit,
        // geodesic: true,
        lengthUnit: pLengthUnit,
        polygons: pPolygonList
    });
    geometryService.areasAndLengths(areasAndLengthParams).then(function(results){
        debugger;
        let i = 0;
        pPolygonList.forEach(x =>
            {
                x.area = results.areas[i];
                x.length = results.lengths[i++];
                //Agregar a lista global de polígonos con área
                _listPolygonWithArea.push(x);
            });

        debugger;
        let jsonData = JSON.stringify(_listPolygonWithArea);
        DownloadPolygon(jsonData, pNameFile);
        RemovePolygon();
        $('#btnGuardar').hide('slow');
    });
}