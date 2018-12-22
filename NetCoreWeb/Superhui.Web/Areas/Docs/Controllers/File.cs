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
using Superhui.Web.Infrastructure.Filters;
using Superhui.Tls;
using Newtonsoft.Json.Linq;

namespace Superhui.Web.Areas.Docs.Controllers
{
    [Area("Docs")]
    public class FileController : Controller
    {
        private IHostingEnvironment hostingEnv;
        public FileController(IHostingEnvironment env)
        {
            hostingEnv = env;
        }
        
         public async Task<ActionResult> Index(string path = "")
         {
             path = path.Trim('/');
             if(!path.EndsWith(".md"))
             {
                 path += ".md";
             }
             var cataloguePath = path.Substring(0, path.LastIndexOf('/') + 1);
             var nr = NetworkRequest.CreateHttp($"http://localhost:5000/api/file/content/{path}");
             string fContent = await nr.GetAsync<string>();

             var categoryR = NetworkRequest.CreateHttp($"http://localhost:5000/api/file/fileInfo/note");
             string categoryCnt = await categoryR.GetAsync<string>();

             var catalogueInfoRequest = NetworkRequest.CreateHttp($"http://localhost:5000/api/file/fileInfo/{cataloguePath}");
             string catalogueInfo = await catalogueInfoRequest.GetAsync<string>();
             JObject o = JObject.Parse(catalogueInfo);

             JArray fileInfoArray = (JArray)o.SelectToken("children");
             ViewBag.Catalogue = fileInfoArray;
             ViewBag.AllCatalogue = o;
             ViewBag.JCategory = JObject.Parse(categoryCnt);
             return View((object)fContent);
         }
    }
}