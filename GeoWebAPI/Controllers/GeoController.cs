using ExcelDataReader;
using GeoWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;

namespace GeoWebAPI.Controllers
{
    
    public class GeoController : Controller
    {
        [HttpGet]
        [Route("Geo/LoadExcelData")]
        public ActionResult LoadExcelData(string pPathExcel = "")
        {
            var result = new ApiResult();
            List<string> objectResult = new List<string>();
            if (string.IsNullOrEmpty(pPathExcel))
            {
                //Se carga desde una ubicación fija

                
                //objectResult ;
            }

            return result;
        }

        [HttpPost]
        [Route("Geo/LoadDataFromExcel/")]
        public ActionResult LoadDataFromExcel(FileStream file)
        {
            var result = new ApiResult();
            try
            {
                var elementExcel = Request.Files[0];
                
                Stream stream = elementExcel.InputStream;
                // We return the interface, so that
                IExcelDataReader reader = null;
                if (elementExcel.FileName.EndsWith(".xls"))
                {
                    reader = ExcelReaderFactory.CreateBinaryReader(stream);
                }
                else if (elementExcel.FileName.EndsWith(".xlsx"))
                {
                    reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                }
                else
                {
                    return new ApiResult(false, "Revise el formato del archivo");
                }
                //3. DataSet - Se convierte a dataset
                while(reader.Read())
                {

                }

                reader.Close();
                return result;
            }
            catch (Exception ex)
            {
                this.WriteEvent(ex.Message, EventLogEntryType.Error);
                throw ex;
            }
        }

        /// <summary>
        /// Escribe un mensaje en el event viewer de la aplicación
        /// </summary>
        /// <param name="message">mensaje</param>
        /// <param name="typeEntry">Tipo de evento</param>
        private void WriteEvent(string message, EventLogEntryType typeEntry)
        {
            using (EventLog eventLog = new EventLog("Application"))
            {
                eventLog.Source = "Application";
                eventLog.WriteEntry(message, typeEntry);
            }
        }
    }
}
