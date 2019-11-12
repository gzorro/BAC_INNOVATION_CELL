using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeoWebAPI.Models
{
    public class ApiResult : ActionResult
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

        public override void ExecuteResult(ControllerContext context)
        {
            if (context == null)
                throw new ArgumentNullException("context");
            else
            {
                if (context.HttpContext.User != null) { }
                if (context.HttpContext.Error != null) { }
                HttpResponseBase Response = context.HttpContext.Response;
                Response.Charset = "UTF-8";
                Response.ContentType = "application/json";
                context.HttpContext.Response.Write(JsonConvert.SerializeObject(this));
                Response.TrySkipIisCustomErrors = true;

                //Preference
                Response.AppendCookie(new HttpCookie("HannibalDate", DateTime.Now.ToString()));
            }
        }
    }
}