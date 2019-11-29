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
            <div class='modal-header modal-fixed' style='width: 96%;'>
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
                            <span class='spanSecondary'> <b>Área del polígono:</b> ${pArea} <b><i>m^2</i></b> <br />
                                <b>Perímetro del polígono:</b> ${pLength} <b><i>metros</i></b> 
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
/*`
<div class="card bg-light mb-3" style="max-width: 18rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h5 class="card-title">Light card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
`*/

`<div class="card text-center" style="background-color: azure; border-radius: 15px 15px 0px 0px; width: 30em;">
  <div class="card-header"> 
    Contenido
  </div>
  <div class="card-body">
    <h5 class="card-title">DashBoard</h5>
    <div class="row">
        <div class="col-sm-5">
            <h6 class="card-subtitle mb-2 text-muted">Concepto</h6>
            <select id="slcType" class="selectpicker" data-width="8em">
                <option value="0">Seleccione</option>
                <option value="N">NOMBRE CLIENTE</option>
                <option value="C">NUMERO IDENTIFICACION</option>
                <option value="D">DEPARTAMENTO</option>
                <option value="M">MUNICIPIO</option>
                <option value="V">VEREDA</option>
                <option value="R">PUNTO REFERENCIA VISITA</option>
            </select>
        </div>
        <div class="col-sm-7">
            <h6 class="card-subtitle mb-2 text-muted">Escoja</h6>
            <select id="slcValue" class="selectpicker" data-width="9em"> </select>
        </div>
    </div><br /><br />
    <div class="row">
            <div class="col-sm-12">
                <div id="divMain" style="border: 1px solid black; margin: 2px; max-height: 15em;overflow-y: auto;"></div>
            </div>
        </div>
    <p class="card-text">Panel principal de consulta de clientes.</p>
    <!--<a href="#" class="btn btn-primary">Buscar</a>-->
  </div>
  <!--<div class="card-footer text-muted">
    2 days ago
  </div>-->
</div>
`;



/**
 * Función encargada de visualizar la información general de un cliente BancoAgrario
 * @param person Objeto cargado con l ainformación de usuario especifoco de la búsqueda
 */

 function ModalUser(person){
    let modalInfoUser = 
    `
    <div id="modalUser" class="row">
        <div class="col">
            <span> <b>Nombre:</b> ${person["NOMBRE CLIENTE"]}</span><br />
            <span> <b>Tipo identificación:</b> ${person["TIPO IDENTIFICACION"]}</span><br />
            <span> <b>Identificación:</b> ${person["NUMERO IDENTIFICACION"]}</span><br />
            <span> <b>Departamento:</b> ${person["DEPARTAMENTO"]}</span><br />
            <span> <b>Municipio:</b> ${person["MUNICIPIO"]}</span><br />
            <span> <b>Vereda:</b> ${person["VEREDA"]}</span><br />
            <span> <b>Oficina:</b> ${person["OFICINA"]}</span><br />
            <span> <b>Rubro:</b> ${person["RUBRO"]}</span><br />
            <span> <b>Monto:</b> ${person["MONTO"]}</span><br />
            <span> <b>Un. Ejecutadas:</b> ${person["UNID. EJECUTADAS"]}</span><br />
            <span> <b>Un. Financiadas:</b> ${person["UNID. FINANCIADAS"]}</span><br />
            <span> <b>Valor destino:</b> ${person["VALOR DESTINO"]}</span><br />
            <span> <b>Valor Rubro:</b> ${person["VALOR RUBRO"]}</span><br />
            <span> <b>ejecutado:</b> ${person["COSTO EJECUTADO"]}</span><br />
            <span> <b>Referencia visita:</b> ${person["PUNTO REFERENCIA VISITA"]}</span><br />
            <span> <b>Punto referencia(Lat/Lon):</b> ${person["PTO REFERENCIADO"]}</span><br />
            <span> <b>Tiene polígono asociado:</b> No </span><br />
            <button type="button" class="btn btn-secondary" onclick="ClosePersonInfo()">Volver</button>
        </div>
    </div>
    `

    return modalInfoUser;
 }

