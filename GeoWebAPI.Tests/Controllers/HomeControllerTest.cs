using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GeoWebAPI;
using GeoWebAPI.Controllers;
using System.Web;
using System.IO;

namespace GeoWebAPI.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Disponer
            GeoController controller = new GeoController();

            //variable 
            var testFile = File.OpenRead("E:/Gzorro/BAC/Projects/GeoAppSolution/WebApp/WebMap/Content/Data/");//Open("");

            // Actuar
            var result = controller.LoadDataFromExcel(testFile);

            // Declarar
            Assert.IsNotNull(result);
            //Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
