/**
 * Core principal de funcionalidad del mapa geográfico
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
 * Guardar coordenadas de polígono en .json
 * @param {any} event
 */
function SavePolygon (event) {
    if (event.state === "complete") {
        debugger;
        let polygonCoordinate = event.graphic.geometry.rings;
        _listPoligonToSave.push(polygonCoordinate[0]); 
        if(_listPoligonToSave.length === 1)
            $('#btnGuardar').show('slow');
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
        // let listFormatted = SetFormatDecimal(100000,9);
        let jsonData = JSON.stringify(_listPoligonToSave);
        // let jsonData = JSON.stringify(listFormatted);
        Download(jsonData, nameFile, fileType);
        PolygonsRemove();
        $('#btnGuardar').hide('slow');
    }else{
        alert('No se ha registrado ningún polígono aún. A continuación registra un polígono e intenta de nuevo');
    }
}

/**
 * Eliminar los polígonos que ya se han guardado en el archivo plano
 */
function PolygonsRemove()
{
    _listGraphicsToDelete.forEach(x => graphicsLayer.remove(x.graphic))    
}

/**
 * Cargar los polígonos desde un archivo json
 * * El archivo se carga de forma fija y no tiene ninguna validación
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
 * Ejecuta guardado de archivo a través de una simulación de evento
 * @param {string} content Contenido en formato determinado (.json, .xml)
 * @param {string} fileName Nombre del archivo que se va a agurdar incluyendo formato (.json, .xml, .txt) 
 * @param {string} contentType Typo de contenido // Default value: 'text/json'
 */
function Download(content, fileName, contentType = 'text/json') {
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
            // let obj = [parseFloat((y[1]/divisibleBy).toFixed(lengthFormat)), parseFloat((y[0]/divisibleBy).toFixed(lengthFormat))]
            
            listCoordsPolygon.push(obj);
        });
        listPolygonsAssigned.push(listCoordsPolygon);
    });
    return listPolygonsAssigned;
}

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
 * Buscar aptitud de cultivo a apartir de punto de referencia 
 * @param latitud valor latitud del punto georeferenciado desde la búsqueda
 * @param longitud valor longitud del punto georeferenciado desde la búsqueda
 **/
function searchPoint(latitud, longitud){
          
   
    $.get("https://geoservicios.upra.gov.co/arcgis/rest/services/SOE/soe/MapServer/exts/Upra_Operations/consultasAptitudes?Opcion=1&Punto=point(" + latitud + "+" + longitud + ")&f=json", function( data ) {
        
        arregloJson = JSON.parse(data);
       // console.log(arregloJson);




          



       $("#aptitud").on('change', function() {
           
          valorAptitud = $("#aptitud option:selected").text();            
          console.log("Aptitud "+valorAptitud);       


          valorCultivo = $("#cultivos option:selected").text();
          console.log("Cultivo  "+valorCultivo);

          $("#myDIV *").filter(function() {
              
            $("#myDIV *").each(function() { 

                text = $(this).text()
                text = text.replace(".", "<br/><br/>")                         
                $(this).text(text)
                //$(this).html(text)

              });


              let alt = $(this).html($(this).text())
           
              //$(this).toggle(alt.html().indexOf(valorAptitud) > -1).html()
              //$(this).toggle($(this).text().indexOf(valorAptitud) > -1)
              //$(this).toggle($(this).text().indexOf(valorCultivo) > -1)

              $(this).toggle(alt.html().indexOf(valorAptitud) > -1)

            /** 
              if(alt.html().indexOf(valorAptitud) > -1 || alt.html().indexOf(valorCultivo) > -1){
                   $(this).toggle(alt.html().indexOf(valorAptitud && valorCultivo) > -1)
              }else{
                console.log("Nada");
              }
            **/

          });
        
       });


       //Al realizar la busqueda general de punto se visualiza esta información inicial
       $.each(arreglo.aptitudes, function(i,item){
            
               let contenido = "<div class='list-group' id='myDIV'>"
                +"<div class='list-group-item active'>"
                + ""+ Object.keys(item)[0] +"  . <br/>______________________________________________________________________________<br/>"
            // + "<div class='list-group-item'>"                        
                + " Servicio : . "
                + "                              "
                + item[Object.getOwnPropertyNames(item)[0]].servicio +"<br/>"
                //+ "<div class='list-group-item'>"
                + " Nombre cientifico:  . "						
                + item[Object.getOwnPropertyNames(item)[0]].nombre_cientifico +"<br/>"
                //+ "   ______________________________________________________________________    "
                //+ "<div class='list-group-item'>"
                + " Aptitud: . "
                + item[Object.getOwnPropertyNames(item)[0]].aptitud +" <br/>"
                //+ "   ______________________________________________________________________     "
                //+ "<div class='list-group-item'>"
                + " Municipio: . "
                //+ "   ______________________________________________________________________     "
                + item[Object.getOwnPropertyNames(item)[0]].municipio+"<br/>"
                //+ "<div class='list-group-item'>"
                + " Departamento: . "						
                + " "+item[Object.getOwnPropertyNames(item)[0]].departamen +" <br/> "                        
                //+ "    ______________________________________________________________________   "
                +"</div>";  

            document.getElementById("carga_info").innerHTML += contenido; 
                

       });

       //$( "#aptitud").html(select);
       $( ".result" ).html( data );
         
       //console.log(data);

       $('#popup').fadeIn('slow');

       var firstPart = data.substring(data.indexOf("<br/><br/>"),data.lastIndexOf("</body>"));

       $('#archivo').html(firstPart);
       //debugger;
       $('.popup-overlay').fadeIn('slow');
       $('.popup-overlay').height($(window).height());             



    });
}

/**
 * abrir modal en donde se muestra la info correspondiente a la aptitud
 * 
 * 
 */
function openModal(){

    $('#popup').fadeIn('slow');
    $('#archivo').html(
      "<p id='archivo'>Estamos consultado la UPRA a través del WSO2 BAC.</p>"+
      "<img src='../Content/Images//ajax-loader-2.gif'style='display: block;margin: 0 auto;' />"+
      "<br/><br/><br/>"                      
    );
    $('.popup-overlay').fadeIn('show');
    $('.popup-overlay').height($(window).height());

}

/**
 * Función encargada de cargar el select con los tipos de cultivo cargados desde la UPRA
 *  @param latitud
 *  @param longitud
 */
function buscarCultivo( latitud, longitud){

    $.get("https://geoservicios.upra.gov.co/arcgis/rest/services/SOE/soe/MapServer/exts/Upra_Operations/consultasAptitudes?Opcion=1&Punto=point(" + latitud + "+" + longitud + ")&f=json", function( data ) { 
         
       //alert( latitud + " + " + longitud);
       
          arreglo = JSON.parse(data);           
       
          var select2 = $("<select></select>").attr("id", "cultivos").attr("name", "cultivos").addClass("target");
          select2.append($("<option></option>").attr("value", " ").text("Seleccione"))
          $.each(arreglo.aptitudes,function(i,item){
           select2.append($("<option></option>").attr("value", Object.keys(item)[0]).text(Object.keys(item)[0]));
          });     
          $("#tCultivos").html(select2);
        
    });         
     
}

/**
 * 
 * 
 */
function buscarUpra(){     

}

/**
 * Función de carga de datos
 */
function LoadDataExcel()
{
    debugger;
    if (fileupd.files.length === 1)
    {
        var $file = document.getElementById('fileupd');
        var fileData = new FormData();
        if ($file.files.length > 0) {
            for (var i = 0; i < $file.files.length; i++) {
                fileData.append($file.files[i].name, $file.files[i]);
            }
        }
    }
    
    //Consumo Api REST para obtener data del excel
    CoreRequest.GetcontentExcel(fileData).done(function(d)
    {
        
    }).fail(function(ex)
    {

    });
}