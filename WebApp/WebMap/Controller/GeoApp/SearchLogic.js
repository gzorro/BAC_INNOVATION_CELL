/**
 *  Funcionalidad busqueda dados un punto geográfico (Latitud y longitud)
 * @Authors {Germán F. Grimaldi}, {Javier Becerra}
 */

/* ******************************************************************************************************* */
/* ******************************************************************************************************* */

/** 
 * Buscar aptitud de cultivo a apartir de punto de referencia 
 * @param latitud valor latitud del punto georeferenciado desde la búsqueda
 * @param longitud valor longitud del punto georeferenciado desde la búsqueda
 * @param isLatLon si las coordenadas vienen en formato wkid: 4326s
 **/

function searchPoint(latitud, longitud){
    debugger;
    $.get("https://geoservicios.upra.gov.co/arcgis/rest/services/SOE/soe/MapServer/exts/Upra_Operations/consultasAptitudes?Opcion=1&Punto=point(" + latitud + "+" + longitud + ")&f=json", function( data ) {
        arregloJson = JSON.parse(data);
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
            if(item != null)
            {
                let contenido = "<div class='list-group' id='myDIV'>"
                 +"<div class='list-group-item active'>"               
                 + Object.keys(item)[0] +" - "+ item[Object.getOwnPropertyNames(item)[0]].aptitud+"  "               
                 +  "______________________________________________________________________________"                
                 + " Municipio ::::  "
                 + item[Object.getOwnPropertyNames(item)[0]].municipio +"   "
                 +  "______________________________________________________________________________"
                 + " Departamento ::::  "						
                 + " "+item[Object.getOwnPropertyNames(item)[0]].departamen.toUpperCase() +"  "                        
                 +"</div>";  
 
                document.getElementById("carga_info").innerHTML += contenido;
            }
       });

       var firstPart = data.substring(data.indexOf("<br/><br/>"),data.lastIndexOf("</body>"));
       $('#archivo').html(firstPart);
       $('.popup-overlay').height($(window).height());
    });
}

/**
 * abrir modal en donde se muestra la info correspondiente a la aptitud
 * 
 */
function createModal(area = 0, length = 0){
    // valueArea = 0;
    // valueLength = 0;
    // let modal = $(modalHTML);
    if(area == 0 && length == 0)
        $("#ventanaEmergente").html($(modalHTML));  
    else{        
        $("#ventanaEmergente").html($(WriteHTMLModal(area, length)));  
    }
    $("#contenidoModal").append(loadingPopUpHTML);
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
            if(item != null)
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
    //debugger;
    let area = "";
    let length = "";

    //Se recorre la lista de polígonos con el fin de encontrar el polígono seleccionado
    _listPolygonWithArea.forEach(x => {
        //Se realiza comparación a través de los centroides del polígono
        if(x.centroid.x == pPosX)
            if(x.centroid.y == pPosY)
            {
                area = x.area;
                length = x.length;
            }
    });

    //Función crear modal, teniendo el áre y períemtro del polígono, solo resta mostrarlos en el modal
    createModal(area, length);

    //Funcion cargar select desde UPRA
    searchCultivo(pPosX,pPosY);

    //Función según pulon la info de aptitud de cultivo
    searchPoint(pPosX, pPosY);   
}