/**
 * Célula transversal de contenido para el DOM
 */
var nameModal = "Consulta UPRA".replace(/ /g, "");
// var nameModal2 = "Consulta UPRA2".replace(/ /g, "");

var dashboardHTML = `<div class="card text-center">
                        <div class="card-header">
                        <ul class="nav nav-pills card-header-pills">
                            <li class="nav-item">
                            <a class="nav-link active" href="#">Active</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                            </li>
                            <li class="nav-item">
                            <a class="nav-link disabled" href="#">Disabled</a>
                            </li>
                        </ul>
                        </div>
                        <div class="card-body">
                        <h5 class="card-title">Special title treatment</h5>
                        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>`;

var modalHTML = 
`<div id='myModal${nameModal}' class='modal fade' role='dialog'>
    <div class='modal-dialog'>
        <!-- Modal content-->
        <div class='modal-content' style='overflow-y:scroll;max-height: 32em;'>
            <div class='modal-header modal-fixed'>
                    <button type='button' class='close' data-dismiss='modal'>&times;</button>
                    <h4 class='modal-title'>Consulta UPRA</h4>
            </div>
            <div class='modal-body' id='contenidoModal' style='top:3em;'>
                <div class='row mensaje'>
                    <div class='col-sm-12'>
                        <span class='infoPrincipal'>A traves de la siguiente interfaz se puede consultar el tipo de aptitud por cultivo de un determinado lugar en Colombia basado en la UPRA.</span>
                    </div>
                    <div class='col-sm-12'>   
                        <div class='col-sm-6'>  
                            <p class='etiquetaBuscador'>
                                <img src='../Content/Images/item-option-search.png' alt='Icon search'/> Aptitud
                            </p>  
                        </div> 
                        <div class='col-sm-6'>
                            <select id='aptitud' name='aptitud' class='target'>
                                <option value='Null'>Seleccione</option>
                                <option value='Aptitud alta'>Aptitud alta</option>
                                <option value='Aptitud baja'>Aptitud baja</option>
                                <option value='Aptitud media'>Aptitud media</option>
                                <option value='Exclusión legal'>Exclusión legal</option>
                                <option value='No apta'>No apta</option>
                            </select>
                        </div>
                    </div>  
                    <div class='col-sm-12'>
                        <div class='col-sm-6'>  
                            <p class='etiquetaBuscador'>
                                <img src='../Content/Images/item-option-search.png' alt='Icon search'/>  Tipo cultivo
                            </p>
                        </div> 
                        <div class='col-sm-6'>
                            <div id='tCultivos'></div>
                        </div>
                    </div>
                    <div class='col-sm-12'>
                        <div id='carga_info'></div>
                    </div>   
                </div>
            </div>
        </div>
    </div>
</div>` ;

/**
 * Cargar estructura de div modal adicionando area y perímetro
 * @param {double} pArea Área del polígono en km
 * @param {double} pLength Perímetro del polígono en km
 */
function WriteHTMLModal(pArea, pLength)
{
let modalWithAreaHTML = 
    `<div id='myModal${nameModal}' class='modal fade' role='dialog'>
        <div class='modal-dialog'>
            <!-- Modal content-->
            <div class='modal-content' style='overflow-y:scroll;max-height: 32em;'>
                <div class='modal-header modal-fixed'>
                        <button type='button' class='close' data-dismiss='modal'>&times;</button>
                        <h4 class='modal-title'>Consulta UPRA</h4>
                </div>
                <div class='modal-body' id='contenidoModal' style='top:3em;'>
                    <div class='row mensaje'>
                        <div class='col-sm-12'>
                            <span class='infoPrincipal'>A traves de la siguiente interfaz se puede consultar el tipo de aptitud por cultivo de un determinado lugar en Colombia basado en la UPRA.</span>
                            <span class='spanSecondary'> <b>Área del polígono:</b> ${pArea} <b><i>Km^2</i></b> <br />
                                <b>Perímetro del polígono:</b> ${pLength} <b><i>Km</i></b> 
                            </span>
                        </div>
                        <div class='col-sm-12'>   
                            <div class='col-sm-4'>  
                                <p class='etiquetaBuscador'>
                                    <img src='../Content/Images/item-option-search.png' alt='Icon search'/> Aptitud
                                </p>  
                            </div> 
                            <div class='col-sm-6'>
                                <select id='aptitud' name='aptitud' class='target'>
                                    <option value='Null'>Seleccione</option>
                                    <option value='Aptitud alta'>Aptitud alta</option>
                                    <option value='Aptitud baja'>Aptitud baja</option>
                                    <option value='Aptitud media'>Aptitud media</option>
                                    <option value='Exclusión legal'>Exclusión legal</option>
                                    <option value='No apta'>No apta</option>
                                </select>
                            </div>
                        </div>  
                        <div class='col-sm-12'>
                            <div class='col-sm-4'>  
                                <p class='etiquetaBuscador'>
                                    <img src='../Content/Images/item-option-search.png' alt='Icon search'/>  Tipo cultivo
                                </p>
                            </div> 
                            <div class='col-sm-6'>
                                <div id='tCultivos'></div>
                            </div>
                        </div>
                        <div class='col-sm-12'>
                            <div id='carga_info'></div>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    </div>` ;
    return modalWithAreaHTML;
}


var loadingPopUpHTML = `<div class='alert alert-primary' role='alert' id='archivo'><p>Estamos consultado la UPRA a través del WSO2 BAC.</p>
                            <img src='../Content/Images//ajax-loader-2.gif'style='display: block;margin: 0 auto;' />
                            </div>`



var DashBoardHTML = 
`
<div class="panel panel-default">
    <div class="panel-body">
        
    </div>
</div>

`


/**
 * Función encargada de visualizar la información general de un cliente BancoAgrario
 * @param person Objeto cargado con l ainformación de usuario especifoco de la búsqueda
 */

 function modalUser(person){
    var modalInfoUser = 
    `
    <div id="modalUser" class="modal fade" role="dialog">
      <div class="modal-dialog">    
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Información usuario</h4>
          </div>
    
          <div class="modal-body">
               <ul class="list-group">
                    <li class="list-group-item active"> Cliente Banco Agrario </li>
                    ${ $.each( JSON.parse(person), function( index, item ){ 
                        `<li class="list-group-item">Nombre: ${ item[Object.getOwnPropertyNames(item)[0]]["NOMBRE CLIENTE"] }</li> `
                        `<li class="list-group-item">Tipo identificación: ${ item[Object.getOwnPropertyNames(item)[0]]["TIPO IDENTIFICACION"] }</li>`
                        `<li class="list-group-item">Identificación: ${ item[Object.getOwnPropertyNames(item)[0]]["NUMERO IDENTIFICACION"] }</li>`
                        `<li class="list-group-item">Departamento: ${ item[Object.getOwnPropertyNames(item)[0]]["DEPARTAMENTO"] } </li>`
                        `<li class="list-group-item">Municipio: ${ item[Object.getOwnPropertyNames(item)[0]]["MUNICIPIO"] }</li>`
                        `<li class="list-group-item">Vereda: ${ item[Object.getOwnPropertyNames(item)[0]]["VEREDA"] }</li>`
                        `<li class="list-group-item">Oficina: ${ item[Object.getOwnPropertyNames(item)[0]]["OFICINA"] }</li>`
                        `<li class="list-group-item">Rubro: ${ item[Object.getOwnPropertyNames(item)[0]]["RUBRO"] }</li>`
                    }) }  
               </ul>
          </div>
    
        </div>
    
      </div>
    </div>
    `
 }

