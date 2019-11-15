/**
 * Core principal de funcionalidad del mapa geográfico
 * @Authors {Germán F. Grimaldi}, {Javier Becerra}
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
 * Buscar aptitud de cultivo a apartir de punto de referencia 
 * @param latitud valor latitud del punto georeferenciado desde la búsqueda
 * @param longitud valor longitud del punto georeferenciado desde la búsqueda
 **/
function searchPoint(latitud, longitud){
    $.get("https://geoservicios.upra.gov.co/arcgis/rest/services/SOE/soe/MapServer/exts/Upra_Operations/consultasAptitudes?Opcion=1&Punto=point(" + latitud + "+" + longitud + ")&f=json", function( data ) {
        debugger;
        arregloJson = JSON.parse(data);
debugger;
       $("select").on('change', function() {
           
          valorAptitud = $("#aptitud option:selected").text();            

          valorCultivo = $("#cultivos option:selected").text();
          

          $("#myDIV *").filter(function() {              

              //Concatenar Variable  
              let terminoBusqueda = valorCultivo+" - "+ valorAptitud;

              if(valorCultivo != "Seleccione" && valorAptitud == "Seleccione"){
                $(this).toggle($(this).text().indexOf(valorCultivo) > -1)  
              }else if(valorCultivo == "Seleccione" && valorAptitud !== "Seleccione"){
                $(this).toggle($(this).text().indexOf(valorAptitud) > -1)
              }else if(valorCultivo !== "Seleccione" && valorAptitud !== "Seleccione"){
                $(this).toggle($(this).text().indexOf(terminoBusqueda) > -1)
              }else{
                $(this).toggle($(this).text())
              }
          });
       });

       //Al realizar la busqueda general de punto se visualiza esta información inicial
       $.each(arreglo.aptitudes, function(i,item){
            
               let contenido = "<div class='list-group' id='myDIV'>"
                +"<div class='list-group-item active'>"               
                + Object.keys(item)[0] +" - "+ item[Object.getOwnPropertyNames(item)[0]].aptitud+"   "
                +  "______________________________________________________________________________"                    
                + " Servicio :::: " 
                + item[Object.getOwnPropertyNames(item)[0]].servicio +"   "
                +  "______________________________________________________________________________"
                + " Nombre cientifico ::::   "						
                + item[Object.getOwnPropertyNames(item)[0]].nombre_cientifico +"   "
                +  "______________________________________________________________________________"                
                + " Municipio ::::  "
                + item[Object.getOwnPropertyNames(item)[0]].municipio+"   "
                +  "______________________________________________________________________________"
                + " Departamento ::::  "						
                + " "+item[Object.getOwnPropertyNames(item)[0]].departamen +"  "                        
                +"</div>";  

            document.getElementById("carga_info").innerHTML += contenido; 
       });

       var firstPart = data.substring(data.indexOf("<br/><br/>"),data.lastIndexOf("</body>"));
       $('#archivo').html(firstPart);
       $('.popup-overlay').height($(window).height());
    });
}

/**
 * abrir modal en donde se muestra la info correspondiente a la aptitud
 * @param
 * @param 
 */
function createModal(){ 
    debugger;
    let modal = $(modalHTML);
        
        $("#ventanaEmergente").html(modal);         
        $("#contenidoModal").append("<div class='alert alert-primary' role='alert' id='archivo'><p>Estamos consultado la UPRA a través del WSO2 BAC.</p>"+
        "<img src='../Content/Images//ajax-loader-2.gif'style='display: block;margin: 0 auto;' />"+
        "</div> <br/><br/><br/>"); 
        $('.popup-overlay').height($(window).height());
        
        //activar modal
        $("#myModal"+nameModal).modal('show');

}

/**
 * Función encargada de cargar el select con los tipos de cultivo cargados desde la UPRA
 *  @param latitud
 *  @param longitud
 */
function searchCultivo( latitud, longitud){

    $.get("https://geoservicios.upra.gov.co/arcgis/rest/services/SOE/soe/MapServer/exts/Upra_Operations/consultasAptitudes?Opcion=1&Punto=point(" + latitud + "+" + longitud + ")&f=json", function( data ) {                  
       
          arreglo = JSON.parse(data);           
                
          let select2 = $("<select></select>").attr("id", "cultivos").attr("name", "cultivos").addClass("target");
          select2.append($("<option></option>").attr("value", "Null").text("Seleccione"))
          $.each(arreglo.aptitudes,function(i,item){ 
           select2.append($("<option></option>").attr("value", Object.keys(item)[0]).text(Object.keys(item)[0]));           
          });     
          $("#tCultivos").html(select2);
    });         
     
}

/**
 * Función encargada de cargar el select con los tipos de cultivo cargados desde la UPRA
 *  @param latitud
 *  @param longitud
 */
function searchAptitup( latitud, longitud){

    $.get("https://geoservicios.upra.gov.co/arcgis/rest/services/SOE/soe/MapServer/exts/Upra_Operations/consultasAptitudes?Opcion=1&Punto=point(" + latitud + "+" + longitud + ")&f=json", function( data ) { 
         
          arreglo = JSON.parse(data);         
          
          let select = $("<select></select>").attr("id", "aptitud").attr("name", "aptitud").addClass("target");
          select.append($("<option></option>").attr("value", "Null").text("Seleccione"))
          $.each(arreglo.aptitudes,function(i,item){
              select.append($("<option></option>").attr("value", i).text(item[Object.getOwnPropertyNames(item)[0]].aptitud));
          });     
          $("#tAptitud").html(select);
        
    });         
     
}

/**
 * Función hace llamado al servicio UPRA para traer u objeto con datos de un punto en especifico
 * @param latitud
 * @param longitud
 */
function searchPointUpra(latitud, longitud){
    $.get("https://geoservicios.upra.gov.co/arcgis/rest/services/SOE/soe/MapServer/exts/Upra_Operations/consultasAptitudes?Opcion=1&Punto=point(" + latitud + "+" + longitud + ")&f=json", function( data ) {

        arreglo = JSON.parse(data);
        return arreglo;

    });  
}

/**
 * Busca puntos y muestra información en cuadro modal
 * @param event evento que llama la función
 */
function SearchAndShowData(event)
{
    if(event.results && event.results.length > 0 && event.results[0].results && event.results[0].results.length > 0){
                
        let latitud;
        let longitud;
        latitud = event.results[0].results[0].extent.xmax; 
        longitud = event.results[0].results[0].extent.ymax;
    
        //Función crear modal
        createModal();
    
        //  Funcion cargar select desde UPRA
        //searchAptitup(latitud, longitud);   
        searchCultivo(latitud, longitud);  

        //Función según punto trae la info de aptitud de cultivo
        searchPoint( latitud, longitud);   
       
    }else{
        console.log("No hay resultados");
    }
}

/**
 * Muestra modal
 * @param {*} pPosX 
 * @param {*} pPosY 
 */
function SearchAndShowDataByPos(pPosX, pPosY)
{
    debugger;
    let lat = pPosX;
    let lon = pPosY;

    //Función crear modal
    createModal();

    //  Funcion cargar select desde UPRA
    searchCultivo(lat,lon);

    //Función según pulon la info de aptitud de cultivo
    searchPoint(lat, lon);   
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

