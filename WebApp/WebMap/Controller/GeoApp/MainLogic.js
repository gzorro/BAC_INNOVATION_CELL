/**
 * Core principal de funcionalidad del mapa geográfico
 * @Authors {Germán F. Grimaldi}, {Javier Becerra}
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
 * Mostrar las coordenadas en el DOM
 * @param {any} pt punto posición
 */
function ShowCoordinates(pt)
{
    var coords = "Lat/Lon " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3) +
        " | Scale 1:" + Math.round(view.scale * 1) / 1 +
        " | Zoom " + view.zoom;
    coordsWidget.innerHTML = coords;
}

/**
 * Agrega determinado elemento a la vista
 * @param {string} nameElement Nombre del elemento a agregar, (<name>-<typeOf>: para incluir elemento y atributo type)
 * @param {string} idElement ID de elemento a agregar
 * @param {string} description descripción para el elemento ó innerText
 * @param {List<string>} classes lista de string con las clases a implementar para el elemento a agregar
 * @param {string} ubication Ubicación del elemento a agregar según librería de esri
 * @param {bool} isVisible determinado si el elemento debe de mostrarse inmediatamente
 */
function AddElementToView(nameElement, idElement, description, classes, ubication, isVisible = true) {
    let elementHTML = "";
    /* si {nameElement} tiene un guión, asumo que tiene una propiedad adicional de tipo {type}
     * En este momento, este caso aplica solo para input */
    if(nameElement.includes("-"))
    {
        let element = nameElement.split("-")[0];
        let typeOfElement = nameElement.split("-")[1];
        elementHTML = document.createElement(element);
        elementHTML.setAttribute("type", typeOfElement);

        //TODO: Validar multiples argumentos para propiedades del elemento
    }else
    {
        elementHTML = document.createElement(nameElement);
        elementHTML.innerText = description;
    }
    elementHTML.id = idElement;
    let classesToImplement = "";
    classes.forEach(x => classesToImplement += `${x} `);
    elementHTML.className = classesToImplement;
    elementHTML.style.padding = "11px";
    view.ui.add(elementHTML, ubication);
    if(!isVisible)
        $(elementHTML).hide();
}


// function getAreaAndLength(evtObj) {
//     geometry = evtObj.geometry;
//     map.graphics.clear();
    
//     var graphic = map.graphics.add(new Graphic(geometry, new SimpleFillSymbol()));

//     //setup the parameters for the areas and lengths operation
//     var areasAndLengthParams = new AreasAndLengthsParameters();
//     areasAndLengthParams.lengthUnit = GeometryService.UNIT_FOOT;
//     areasAndLengthParams.areaUnit = GeometryService.UNIT_ACRES;
//     areasAndLengthParams.calculationType = "geodesic";
//     geometryService.simplify([geometry], function(simplifiedGeometries) {
//       areasAndLengthParams.polygons = simplifiedGeometries;
//       geometryService.areasAndLengths(areasAndLengthParams);
//     });
// }

// function outputAreaAndLength(evtObj) {
// var result = evtObj.result;
// console.log(json.stringify(result));
// dom.byId("area").innerHTML = result.areas[0].toFixed(3) + " acres";
// dom.byId("length").innerHTML = result.lengths[0].toFixed(3) + " feet";
// }
