let rootPath = '../../../http://localhost:54652/api/Geo/';
/**
 * Célula transversal de consumo
 */
class CoreRequest {

    /**
     * Obtiene información guardaba en un archivo excel
     * @returns {any} object Response
     */
    static GetcontentExcel(data) {
        return $.ajax({
            type: "POST",
            contentType: false, // Not to set any content header  
            processData: false, // Not to process data
            url: rootPath + 'LoadExcelData',
            //data: JSON.stringify({ example: data }),
            data: data,
            dataType: 'json'
        });
    }
}