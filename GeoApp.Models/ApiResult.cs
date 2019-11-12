using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace GeoApp.Models
{
    public class ApiResult
    {
        public bool success { get; set; }
        public object data { get; set; }

        #region constructores

        public ApiResult() { }

        public ApiResult(bool _success, object _data)
        {
            success = _success;
            data = _data;
        }
        #endregion
    }
}
