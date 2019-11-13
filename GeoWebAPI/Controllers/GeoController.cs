using ExcelDataReader;
using GeoWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.IO;
using System.Web.Http;
using System.Linq;

namespace GeoWebAPI.Controllers
{
    
    public class GeoController : ApiController
    {
        // GET api/geo/5
        public string Get(int id)
        {
            return "value";
        }
        
        // POST api/geo
        public void Post([FromBody]string value)
        {
        }

        // PUT api/geo/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/geo/5
        public void Delete(int id)
        {
        }

        /// <summary>
        /// Carga datos de un archivo excel con ExcelDataReader
        /// </summary>
        /// <param name="pPath"></param>
        /// <returns></returns>
        public ApiResult Load(string pPath)
        {
            var result = new ApiResult();
            try
            {
                //Ruta del fichero Excel
                string filePath = pPath;

                using (var stream = File.Open(filePath, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        do
                        {
                            while (reader.Read())
                            {
                                reader.GetDouble(0);
                            }
                        } while (reader.NextResult());
                    }
                }
                return result;
            }
            catch (Exception e)
            {
                this.WriteEvent(e.Message, EventLogEntryType.Error);
                throw e;
            }
        }

        /// <summary>
        /// Carga datos de un archivo excel con Microsoft.Office.Interop.Excel
        /// </summary>
        /// <param name="pPathExcel"></param>
        /// <returns></returns>
        public ApiResult LoadExcelData(string pPathExcel = "")
        {
            var result = new ApiResult();
            List<string> objectResult = new List<string>();
            if (string.IsNullOrEmpty(pPathExcel))
            {
                
            }

            return result;
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
