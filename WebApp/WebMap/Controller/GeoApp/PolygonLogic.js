/**
 * Célula de funcionalidad de polígonos
 * @Author {Germán F. Grimaldi}
 * */

/* ******************************************************************************************************* */
/* ******************************************************************************************************* */

/**
 * Establece los parámetros de definición del polígono
 * @param {Array} polygonCoords Coordenadas del polígono
 */
function SetPolygon(polygonCoords)
{
    if(polygonCoords.length > 0)
    {
        let _polygon = {
            type: "polygon",
            rings: polygonCoords,
            spatialReference: { wkid: 102100 }
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
 * @param {any} AreasAndLengthsParameters instancia del servicio
 */
function SavePolygon (event, AreasAndLengthsParameters) {
    if (event.state === "complete") {
        let polygonCoordinate = event.graphic.geometry.rings;
        let polygonObject = SetPolygon(polygonCoordinate).polygon;
        debugger;
        let areasAndLengthParams = new AreasAndLengthsParameters({
            areaUnit: "square-kilometers",
            lengthUnit: "kilometers",
            polygons: polygonObject
        });
        geometryService.areasAndLengths(areasAndLengthParams).then(function(results){
            polygonObject.area = results.areas[0];
            polygonObject.length = results.lengths[0];
            //Agregar a lista global de polígonos
            _listPoligonToSave.push(polygonObject); 

            if(_listPoligonToSave.length === 1)
                $('#btnGuardar').show('slow');
            
        });
        
        _listGraphicsToDelete.push(event);
    }
}

/**
 * Guardar la lista de polígonos registrada en un archivo de tipo
 * @param {string} nameFile nombre del archivo
 * @param {string} fileType tipo de archivo (xml, json, txt)
 */
function SavePolygonList(nameFile, fileType)
{
    if(_listPoligonToSave.length > 0)
    {
        let jsonData = JSON.stringify(_listPoligonToSave);
        DownloadPolygon(jsonData, nameFile, fileType);
        RemovePolygon();
        $('#btnGuardar').hide('slow');
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
 * Cargar los polígonos desde un archivo json
 * El archivo se carga de forma fija y no tiene ninguna validación
 * @param {string} fileName nombre del archivo
 */
function LoadJsonPolygon(fileName)
{
    try{
        $.getJSON(fileName, function(json) {
            DrawPolygonsSaved(json);
        });
    }catch{
        alert('Ups!, algo salió mal, vuelve a intentar');
    }
}

/**
 * Grafica y dibuja en el objeto view, un polígono
 * @param {Array} polygonCoordinates coordenadas del polígono(latitud y longitud) 
 */
function DrawPolygon(polygonCoordinates)
{
    let polygon = {
        type: "polygon",
        rings: polygonCoordinates
      };

    let simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.5],  // orange, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    };
    let instance = graphicInstance; 
    instance.geometry = polygon;
    instance.symbol = simpleFillSymbol;
    let polygonGraphic = instance;
    graphicsLayer.add(polygonGraphic);
}

/**
 * Dibuja en el objeto view los polígonos guardados
 * @param {any} jsonObject 
 */
function DrawPolygonsSaved(jsonObject)
{
    jsonObject.forEach(x => {
        if(x.length > 0)
            DrawPolygon(x);
    });
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
            debugger;
            SearchAndShowDataByPos(response.results[0].mapPoint.x, response.results[0].mapPoint.y);
        }
    });
}

/**
 * Ejecuta guardado de archivo a través de una simulación de evento
 * @param {string} content Contenido en formato determinado (.json, .xml)
 * @param {string} fileName Nombre del archivo que se va a agurdar incluyendo formato (.json, .xml, .txt) 
 * @param {string} contentType Typo de contenido // Default value: 'text/json'
 */
function DownloadPolygon(content, fileName, contentType = 'text/json') {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    a.remove();
}

/**
 * Configura el formato para georeferenciación espacial en determinados valores
 * @param {int} divisibleBy valor numérico que dividira el valor espacial
 * @param {int} lengthFormat Longitud de valores numéricos
 */
function SetFormatDecimal(divisibleBy, lengthFormat)
{
    let listPolygonsAssigned = [];
    _listPoligonToSave.forEach(x => {
        let listCoordsPolygon = [];
        x.forEach(y => {
            debugger;
            let latitude = parseFloat((y[0]/divisibleBy).toFixed(lengthFormat))+9;
            let longitude = parseFloat((y[1]/divisibleBy).toFixed(lengthFormat))-1; 
            let obj = [latitude,longitude];
            
            listCoordsPolygon.push(obj);
        });
        listPolygonsAssigned.push(listCoordsPolygon);
    });
    return listPolygonsAssigned;
}


/**
 * Calcula el áare y longitud de determinado polígono
 * @param {Polygon} polygon 
 */
function CalculateAreaAndLength(polygon)
{
    debugger;
    geometryService.simplify(polygon).then(function(simplifiedGeometries){
        let areasAndLengthParams = new AreasAndLengthsParameters({
          areaUnit: "square-kilometers",
          lengthUnit: "kilometers",
          polygons: simplifiedGeometries
        });
        geometryService.areasAndLengths(areasAndLengthParams).then(function(results){
          console.log("area: ", results.areas[0]);
          console.log("length: ", results.lengths[0]);
        });
      });
}



