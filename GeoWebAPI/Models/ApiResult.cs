using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeoWebAPI.Models
{
    public class ApiResult
    {
        public bool success { get; set; }
        public object data { get; set; }

        #region constructores

        public ApiResult() {
            success = false;
        }

        public ApiResult(bool _success, object _data)
        {
            success = _success;
            data = _data;
        }
        #endregion
    }
}