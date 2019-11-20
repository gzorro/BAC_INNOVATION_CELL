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

/**
 * Agrega determinado elemento a la vista
 * @param {string} idElement ID de elemento a agregar
 * @param {string} ubication Ubicación del elemento a agregar según librería de esri
 * @param {bool} isVisible determinado si el elemento debe de mostrarse inmediatamente
 */
function AddDivToView(idElement, ubication, isVisible = true) {
    let elementHTML = "";
    elementHTML = document.createElement(nameElement);
    elementHTML.innerText = description;
    elementHTML.id = idElement;

    //Se agregan clases específicas
    elementHTML.className = '';
    elementHTML.style.padding = "11px";

    //Agregar elemento a la vista
    view.ui.add(elementHTML, ubication);

    if(!isVisible)
        $(elementHTML).hide();
}

/**
 * Toma un nombre de archivo con extensión y lo carga como objeto, este archivo debe existir en la raíz.
 * @param {string} nameFile Nombre de archivo, incluir formato 
 */
function MapJsonData(nameFile) 
{
    let dfd = $.Deferred();
    if(nameFile.includes(".json"))
    {
        $.getJSON(nameFile, function(json) {
            dfd.resolve(json);
        });
        return dfd.promise();
    }else
    {
        console.error('No se cargó ningún archivo');
        dfd.reject();
        return dfd.promise();
    }
}

/**
 * Cargar datos del json al sistema
 */
function LoadBDData()
{
    debugger;
    MapJsonData('JsonBD.json').then(function(obj) {
        obj.Hoja1.forEach(x => 
            {
                debugger;
                let object = x;
            })
    });
}


