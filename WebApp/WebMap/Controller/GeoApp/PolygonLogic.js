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
            // areaUnit: 9036,
            calculationType: _enumCalculationType.Planar,
            areaUnit: _enumAreaUnits.SquareKilometer,
            // geodesic: true,
            lengthUnit: _enumLengthUnit.Kilometer,
            polygons: polygonObject
        });
        geometryService.areasAndLengths(areasAndLengthParams).then(function(results){
            debugger;
            polygonObject.area = results.areas[0];
            polygonObject.length = results.lengths[0];
            //Agregar a lista global de polígonos
            _listPoligonToSave.push(polygonObject); 
    
            if(_listPoligonToSave.length > 0)
                $('#btnGuardar').show('slow');
            _listGraphicsToDelete.push(event);
        });
    }
}

/**
 * Guardar la lista de polígonos registrada en un archivo de tipo
 * @param {string} nameFile nombre del archivo
 */
function SavePolygonList(nameFile)
{
    if(_listPoligonToSave.length > 0)
    {
        let jsonData = JSON.stringify(_listPoligonToSave);
        DownloadPolygon(jsonData, nameFile);
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
 * Muestra respectiva información en cuanto a un polígono
 */
function ShowPolygonGeographic(event)
{
    let screenPoint = {
        x: event.x,
        y: event.y
    };
    // Search for graphics at the clicked location
    view.hitTest(screenPoint).then(function (response) {
        if (response.results.length) {
            //Entra si hay un polígono seleccionado
            debugger;
            // SearchAndShowDataByPos(response.results[0].mapPoint.x, response.results[0].mapPoint.y);
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
function DownloadPolygon(content, fileName, contentType = 'text/json') {
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
        debugger;
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



