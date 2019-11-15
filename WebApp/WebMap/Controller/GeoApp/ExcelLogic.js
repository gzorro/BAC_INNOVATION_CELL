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