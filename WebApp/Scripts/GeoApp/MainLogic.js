/**
 * Guardar polígono
 * @param {any} coordinatePolygon
 */
function SavePolygon(coordinatePolygon)
{
    debugger;
    alert('estamos probando');
}

/**
 * Mostrar las coordenadas en el DOM
 * @param {any} pt posición
 */
function ShowCoordinates(pt)
{
    var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
        " | Scale 1:" + Math.round(view.scale * 1) / 1 +
        " | Zoom " + view.zoom;
    coordsWidget.innerHTML = coords;
}

/**
 * Orquestador de eventos
 * */
function BindFunctions()
{
    debugger;
    //Cuando se guarde el polígono se ejecuta este evento
    sketch.on("create", function (event) {
        if (event.state === "complete") {
            let polygonCoordinate = event.graphic.geometry.rings;
            debugger;
            //Borrar gráfica del mapa
            graphicsLayer.remove(event.graphic);
            //Guardar coordenadas del polígono
            SavePolygon(polygonCoordinate);
        }
    });
}