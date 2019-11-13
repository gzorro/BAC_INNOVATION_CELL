let rootPath = 'http://localhost:54652/api/geo/';
/**
 * Célula transversal de consumo
 */
class CoreRequest {

    /**
     * Obtiene información guardaba en un archivo excel
     * @returns {any} object Response
     */
    static GetcontentExcel(path) {
        return $.ajax({
             type: "GET",
             // contentType: false, // Not to set any content header  
             // processData: false, // Not to process data
             url: rootPath + 'Load',
             data: JSON.stringify({ pPath: path }),
             data: data,
            dataType: 'json'
        });
    }
}