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
    }else
    {
        elementHTML = document.createElement(nameElement);
        elementHTML.innerText = description;
    }
    elementHTML.id = idElement;
    let classesToImplement = "";
    classes.forEach(x => classesToImplement += `${x} `);
    elementHTML.className = classesToImplement;

    //Esta propieda se deja fija por cuestiones estéticas.
    elementHTML.style.padding = "11px";

    view.ui.add(elementHTML, ubication);
    if(!isVisible)
        $(elementHTML).hide();
}

/**
 * Agrega un elemento html especìfico al mapa
 * @param {string} idElement ID de elemento a agregar
 * @param {string} ubication Ubicación del elemento a agregar según librería de esri
 * @param {bool} isVisible determinado si el elemento debe de mostrarse inmediatamente
 */
function AddDivToView(idElement, ubication, isVisible = true, webMercator) {
    let elementHTML;
    elementHTML = document.createElement("div");
    elementHTML.id = idElement;
    elementHTML.innerHTML = DashBoardHTML;
    $('.selectpicker').selectpicker('refresh');
    //Agregar elemento a la vista
    view.ui.add(elementHTML, ubication);

    if(!isVisible)
        $(elementHTML).hide();
    BindEventsToSelect(webMercator);
}

/**
 * Vincula eventos sobre los elementos select creados dinámicamente
 */
function BindEventsToSelect(webMercator)
{
    $('#slcType').on('change', function()
    {
        EventToTypeSelect();
    });

    $('#slcValue').on('change',function()
    {
        EventToSelectValue(webMercator);
    });
}

function EventToTypeSelect ()
{
    let valueSelected = $('#slcType').val();
    $('#slcValue').empty().selectpicker('refresh');
    if(valueSelected == "0")
    {
        alert('Debe seleccionar una opción válida');
    }else{
        let list = $('#slcValue');
        let listImplicit = [];
        let uniqueItems;
        //Llenar la otra lista según criterio
        switch(valueSelected)
        {
            case 'C':
                    listBD.forEach(x => listImplicit.push(x["NUMERO IDENTIFICACION"]))
                    uniqueItems = Array.from(new Set(listImplicit));
                    $.each(uniqueItems, function (id, item) {
                        if (id === 0) {
                            let element = document.createElement("option");
                            element.value = "0";
                            element.textContent = "Seleccione";
                            list.append(element);
                        }
                        let element = document.createElement("option");
                        element.value = item;//["NUMERO IDENTIFICACION"];
                        element.textContent = item;//["NUMERO IDENTIFICACION"];
                        list.append(element);
                    });

                break;
            case 'N':
                    listBD.forEach(x => listImplicit.push(x["NOMBRE CLIENTE"]))
                    uniqueItems = Array.from(new Set(listImplicit));
                    $.each(uniqueItems, function (id, item) {
                        if (id === 0) {
                            let element = document.createElement("option");
                            element.value = "0";
                            element.textContent = "Seleccione";
                            list.append(element);
                        }
                        let element = document.createElement("option");
                        element.value = item;
                        element.textContent = item;
                        list.append(element);
                    });

                break;
            case 'D':
                    listBD.forEach(x => listImplicit.push(x["DEPARTAMENTO"]))
                    uniqueItems = Array.from(new Set(listImplicit));
                    $.each(uniqueItems, function (id, item) {
                        if (id === 0) {
                            let element = document.createElement("option");
                            element.value = "0";
                            element.textContent = "Seleccione";
                            list.append(element);
                        }
                        let element = document.createElement("option");
                        element.value = item;
                        element.textContent = item;
                        list.append(element);
                    });

                break;
            case 'M':
                    listBD.forEach(x => listImplicit.push(x["MUNICIPIO"]))
                    uniqueItems = Array.from(new Set(listImplicit));
                    $.each(uniqueItems, function (id, item) {
                        if (id === 0) {
                            let element = document.createElement("option");
                            element.value = "0";
                            element.textContent = "Seleccione";
                            list.append(element);
                        }
                        let element = document.createElement("option");
                        element.value = item;
                        element.textContent = item;
                        list.append(element);
                    });

                break;
            case 'V':
                    listBD.forEach(x => listImplicit.push(x["VEREDA"]))
                    uniqueItems = Array.from(new Set(listImplicit));
                    $.each(uniqueItems, function (id, item) {
                        if (id === 0) {
                            let element = document.createElement("option");
                            element.value = "0";
                            element.textContent = "Seleccione";
                            list.append(element);
                        }
                        let element = document.createElement("option");
                        element.value = item;
                        element.textContent = item;
                        list.append(element);
                    });

                break;
            case 'R':
                listBD.forEach(x => listImplicit.push(x["RUBRO"]))
                uniqueItems = Array.from(new Set(listImplicit));
                $.each(uniqueItems, function (id, item) {
                    if (id === 0) {
                        let element = document.createElement("option");
                        element.value = "0";
                        element.textContent = "Seleccione";
                        list.append(element);
                    }
                    let element = document.createElement("option");
                    element.value = item;
                    element.textContent = item;
                    list.append(element);
                });
                break;
            default:
                break;
        }
        list.val("0");
        $(list).selectpicker('refresh');
    }
}

function EventToSelectValue (webMercator)
{
    let textSelected = $('#slcType option:selected').text();
    let valueSelected = $('#slcValue').val();
    if(valueSelected == "0")
    {
        alert('Debe seleccionar una opción válida');
    }else{
        let listElements = [];
        listBD.forEach(x =>
            {
                if(x[textSelected] == valueSelected)
                {
                    listElements.push(x);
                }
            });//.find(x => x[textSelected] == valueSelected);

        var divToAddTable = $('#divMain');
        var table = $('<table />'),
            thead,
            tfoot,
            rows = [],
            row,
            i,
            j,
            defaults = {
                th: true,
                thead: false,
                tfoot: false,
                attrs: {}
            };
        var options = {
            thead: true,
            attrs: { class: 'table' }
        };
        options = $.extend(defaults, options);

        table.attr(options.attrs);
        row = $('<tr />');
        row.append($('<th colspan=4 />').html('<center><b>Resultado consulta</b></center>'));
        rows.push(row);

        row = $('<tr />');
        row.append($('<td />').html('<b>Nombre</b>'));
        row.append($('<td />').html('<center><b>Cédula</b></center>'));
        // row.append($('<td />').html('<center><b>Rubro</b></center>'));
        // row.append($('<td />').html('<center><b>Monto</b></center>'));
        rows.push(row);

        $.each(listElements, function (value, obj) {
            row = $('<tr />');

            row.append($("<td align='center' style='white-space:pre;'/>").html(
                `${obj["NOMBRE CLIENTE"]} `));
            row.append($("<td align='center' style='white-space:pre;'/>").html(
                `${obj["NUMERO IDENTIFICACION"]}`));
            // row.append($("<td align='center' style='white-space:pre;'/>").html(
            //     `${obj["PUNTO REFERENCIA VISITA"]}`));
            // row.append($("<td align='center' style='white-space:pre;'/>").html(
            //     `${obj["MONTO"]}`));

            let imgViewMap = document.createElement("input");
            imgViewMap.id = obj["NUMERO IDENTIFICACION"];
            imgViewMap.type = "image";
            imgViewMap.title = "Consulta UPRA";
            imgViewMap.src = "../Content/Images/find-map.png";
            $(imgViewMap).prop('cursor', 'pointer');
            $(imgViewMap).on('click', function () {
                let arrPosition = obj["PTO REFERENCIADO"].split(',');
                let objLat = arrPosition[0].trim();
                let objLon = arrPosition[1].trim();
                let result = webMercator.lngLatToXY(objLon, objLat);
                let objLatF = result[0];
                let objLonF = result[1];
                // var point = {
                //     type: "point",  // autocasts as new Point()
                //     longitude: -71.2643,
                //     latitude: 42.0909
                // };
                // var markerSymbol = {
                //     type: "simple-marker",  // autocasts as new SimpleMarkerSymbol()
                //     color: [226, 119, 40]
                // };
                // var pointGraphic = new Graphic({
                //     geometry: point,
                //     symbol: markerSymbol
                // });
                // let pt = new Point({
                //     latitude: objLat,
                //     longitude: objLon
                //   });
                view.goTo({
                    center: [objLon, objLat],
                    zoom: 15
                  });
                createModal();
                searchCultivo(objLatF, objLonF);
                searchPoint(objLatF, objLonF);
            });
            row.append($("<td align='center' style='white-space:pre;'/>").html(
                $(imgViewMap)));

                let imgViewPerfil = document.createElement("input");
                imgViewPerfil.id = obj["NUMERO IDENTIFICACION"];
                imgViewPerfil.type = "image";
                imgViewPerfil.title = "Ver perfil detallado";
                imgViewPerfil.src = "../Content/Images/person2.png";
                $(imgViewPerfil).prop('cursor', 'pointer');
                $(imgViewPerfil).on('click', function () {
                    let objSelected = listBD.find(x => x["NUMERO IDENTIFICACION"] == imgViewPerfil.id);
                    $(divToAddTable).html(ModalUser(objSelected));
                    // $('#divPerson').html(ModalUser(objSelected));
                });
                row.append($("<td align='center' style='white-space:pre;'/>").html(
                    $(imgViewPerfil)));

            rows.push(row);
            table.append(rows);
        });
        $(divToAddTable).html(table);
        // divToAddTable.append('<br /> <br />');
    }
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
 * Carga información de una o varias personas dependiendo del criterio de búsqueda
 * @param {string} typeSearch
 * @param {string} value
 */
function SearchPersonsByCriteria(typeSearch, value)
{
    switch(typeSearch){
        case 'CC':

            break;

        default:
            break;
    }
}
/**
 * Cargar datos del json al mapa
 */
function LoadBDData()
{
    MapJsonData('JsonBD.json').then(function(obj) {
        listBD = obj.Hoja1;
    });
}

/**
 * vacia el div con la información de personas
 */
function ClosePersonInfo()
{
    $('#divMain').html('');
    $('#slcType').val('0').selectpicker('refresh');
    $('#slcValue').empty().selectpicker('refresh');
}


