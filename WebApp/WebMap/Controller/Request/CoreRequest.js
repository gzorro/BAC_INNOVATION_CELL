let rootPath = 'http://localhost:54652/api/geo/';
let pathAreasAndLength = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer/areasAndLengths';
/**
 * Célula transversal de consumo
 * @author {German F. Grimaldi}
 */
class CoreRequest {

    /**
     * Obtiene información guardada en un archivo excel
     * @returns {any} object Response
     */
    static GetcontentExcel(path) {
        return $.ajax({
             type: "GET",
             // contentType: false, // Not to set any content header  
             // processData: false, // Not to process data
             url: rootPath + 'Load',
             data: JSON.stringify({ pPath: path }),
            dataType: 'json'
        });
    }

    /**
     * Obtiene información de áre y longitud de un polígono
     * @returns {any} object Response
     */
    static GetAreaAndLength(pPolygon) {
        return $.ajax({
             type: "GET",
             // contentType: false, // Not to set any content header  
             // processData: false, // Not to process data
             url: pathAreasAndLength + "?" + pPolygon,
            //  data: { sr:102100, polygon: pPolygon},
            //  data: JSON.stringify({ polygons: pPolygon }),
            dataType: 'json'
        });
    }
}