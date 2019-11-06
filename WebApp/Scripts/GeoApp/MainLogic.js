/**
 * Core principal de funcionalidad del mapa esri
 * @Authors {Germán f. Grimaldi}, {Javier Becerra}
 * 
 * */

/* ******************************************************************************************************* */
/* ******************************************************************************************************* */

/**
 * Agregar componente de coordenadas al objeto view
 * */
function AddCoordsToView()
{
    //Bottom function
    let coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";

    view.ui.add(coordsWidget, "bottom-right");
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
 * Guardar coordenadas de polígono en .json
 * @param {any} event
 */
function SavePolygon (event) {
    if (event.state === "complete") {
        let polygonCoordinate = event.graphic.geometry.rings;
        debugger;
        //Borrar gráfica del mapa
        graphicsLayer.remove(event.graphic);

        //TODO: Guardar coordenadas del polígono
        //SavePolygon(polygonCoordinate);
    }
}
