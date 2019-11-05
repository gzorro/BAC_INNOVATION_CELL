using System.Web;
using System.Web.Configuration;
using System.Web.Optimization;

namespace WebApp
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-3.3.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/esri").Include(
                      "~/Content/esri/esri-arcGis-4.min.css"
                      ,"~/Content/esri/esri-main.css"
                      //, "~/Content/esri/esri-bootstrap.min.css"
                      ));

            /*Validamos la configuración de compilación, si es debug, lanzar las configuraciones js no minificadas */
            if (((CompilationSection)System.Configuration.ConfigurationManager.GetSection(@"system.web/compilation")).Debug)
            {
                bundles.Add(new ScriptBundle("~/bundles/GeoApp").Include(
                      "~/Scripts/GeoApp/GeoApp.js"
                      , "~/Scripts/GeoApp/ArcGisCom-4.13.js"));
            }
            else //Production
            {
                bundles.Add(new ScriptBundle("~/bundles/GeoApp").Include(
                      "~/Scripts/GeoApp/GeoApp.min.js"));
            }
        }
    }
}
