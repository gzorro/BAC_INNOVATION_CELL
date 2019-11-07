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
    let coordsWidget = document.createElement("div");
    coordsWidget.id = "coordsWidget";
    coordsWidget.className = "esri-widget esri-component";
    coordsWidget.style.padding = "7px 15px 5px";

    view.ui.add(coordsWidget, "bottom-right");
}

/**
 * Agrega determinado elemento a la vista
 * @param {string} nameElement Nombre del elemento a agregar
 * @param {string} idElement ID de elemento a agregar
 * @param {List<string>} classes lista de string con las clases a implementar para el elemento a agregar
 * @param {string} ubication Ubicación del elemento a agregar según librería de esri
 */
function AddElementToView(nameElement, idElement, classes, ubication) {
    debugger;
    let coordsWidget = document.createElement(nameElement);
    coordsWidget.id = idElement;
    let classesToImplement = "";
    classes.forEach(x => classesToImplement += `${x} `);
    coordsWidget.className = classes;

    view.ui.add(coordsWidget, ubication);
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
        //Borrar gráfica del mapa
        graphicsLayer.remove(event.graphic);

        //TODO: Guardar coordenadas del polígono
        var jsonData = JSON.stringify(polygonCoordinate[0]);
        Download(jsonData, 'json.json', 'text/json');
    }
}

function Download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

