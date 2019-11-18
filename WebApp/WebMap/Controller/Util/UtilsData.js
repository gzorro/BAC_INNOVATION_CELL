/**
 * Célula transversal de contenido para el DOM
 */
var nameModal = "Consulta UPRA".replace(/ /g, "");
    
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

var modalHTML = "<div id='myModal"+nameModal+"' class='modal fade' role='dialog'>"+
                    "<div class='modal-dialog>'"+
                        "<!-- Modal content-->"+
                        "<div class='modal-content'>"+
                                "<div class='modal-header'>" + 
                                    "<button type='button' class='close' data-dismiss='modal'>&times;</button>"+
                                    "<h4 class='modal-title'>Consulta UPRA</h4>"+
                                "</div>"+
                                "<div class='modal-body' id='contenidoModal'>"+
                                "<div class='row mensaje'>"+
                                "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'>   "+                 		                    		
                                "<span class='infoPrincipal'>A traves de la siguiente interfaz se puede consultar el tipo de aptitud por cultivo de un determinado lugar en Colombia basado en la UPRA.</span>"    +
                                "</div>"+
                                "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'>   "+
                                    "<div class='col-lg-6 col-md-6 col-xs-12 col-sm-12'>  "+
                                        "<p class='etiquetaBuscador'>"+
                                            "<img src='../Content/Images/item-option-search.png' alt='Icon search'/> Aptitud"+
                                        "</p>  "+
                                    "</div> "+
                                    "<div class='col-lg-6 col-md-6 col-xs-12 col-sm-12'>"+
                                        "<select id='aptitud' name='aptitud' class='target'>"+
                                        "<option value='Null'>Seleccione</option>"+
                                        "<option value='Aptitud alta'>Aptitud alta</option>"+
                                        "<option value='Aptitud baja'>Aptitud baja</option>"+
                                        "<option value='Aptitud media'>Aptitud media</option>"+
                                        "<option value='Exclusión legal'>Exclusión legal</option>"+
                                        "<option value='No apta'>No apta</option>"+
                                    "</select>"+
                                "</div>"+
                            "</div>  "+
                            "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'>"+
                                "<div class='col-lg-6 col-md-6 col-xs-12 col-sm-12'>  "+
                                    "<p class='etiquetaBuscador'>"+
                                        "<img src='../Content/Images/item-option-search.png' alt='Icon search'/>  Tipo cultivo"+
                                    "</p>"+
                                "</div> "+
                                "<div class='col-lg-6 col-md-6 col-xs-12 col-sm-12'>"+
                                    "<div id='tCultivos'></div>"+
                                "</div>"+
                            "</div>"+
                            "<div class='col-lg-12 col-md-12 col-xs-12 col-sm-12'>"+
                                "<div id='carga_info'></div>"+
                            "</div>   "+
                            "</div>"+
                                "</div>" +
                                "<div class='modal-footer'>" +
                                    "<button type='button' class='btn btn-default' data-dismiss='modal'>Cerrar</button>"+
                                "</div>"+
                            "</div>"+
                    "</div>"+
                "</div>" ;