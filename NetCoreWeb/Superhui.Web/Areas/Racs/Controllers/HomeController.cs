using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Superhui.Web.Areas.Docs.Models;
using Superhui.Web.Areas.Docs.Models.ViewModels;
using Superhui.Web.Models.ViewModels;
using Newtonsoft.Json.Linq;
using Superhui.Tls;

namespace Superhui.Web.Areas.Racs.Controllers
{
    [Area("Racs")]
    public class HomeController : Controller
    {
        public HomeController()
        {
        }
        // GET: Blog
        public async Task<ActionResult> Index()
        {
            var http = NetworkRequest.CreateHttp("http://localhost:5000/api/file/fileInfo/app");
            var bytes = await http.GetAsync();
            string fileInfoStr = Encoding.UTF8.GetString(bytes);
            JObject o = JObject.Parse(fileInfoStr);
            JArray fileInfoArray = (JArray)o.SelectToken("children");
            return View(fileInfoArray);
        }

        public IActionResult Select()
        {
            return View();
        }
    }
}