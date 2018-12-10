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
        // GET: Blog
        //public async Task<ActionResult> Index(string path = "")
        //{
        //    path = path.Trim('/');
        //    if(!path.EndsWith(".md"))
        //    {
        //        path += ".md";
        //    }
        //    // var nr = NetworkRequest.CreateHttp($"http://localhost:5000/api/file/content/{path}");
        //    var nr = NetworkRequest.CreateHttp($"http://192.168.100.1/api/file/fileInfo/{path}");
        //    string fContent = await nr.GetAsync<string>();
        //    return View((object)fContent);
        //}
         public async Task<ActionResult> Index(string path = "")
         {
             path = path.Trim('/');
             if(!path.EndsWith(".md"))
             {
                 path += ".md";
             }
             // var cataloguePath = path.Substring(0, path.LastIndexOf('/') + 1);
             var nr = NetworkRequest.CreateHttp($"http://192.168.100.1/api/file/content/{path}");
             string fContent = await nr.GetAsync<string>();

             var catalogueInfoRequest = NetworkRequest.CreateHttp($"http://192.168.100.1/api/file/fileInfo/note/linux");
             string catalogueInfo = await catalogueInfoRequest.GetAsync<string>();
             JObject o = JObject.Parse(catalogueInfo);
             JArray fileInfoArray = (JArray)o.SelectToken("children");
             ViewBag.Catalogue = fileInfoArray;
             return View((object)fContent);
         }
        public async Task<ActionResult> List1(string path = "")
        {
            path = path.Trim('/');
            // if(!path.EndsWith(".md"))
            // {
            //     path += ".md";
            // }
            var nr = NetworkRequest.CreateHttp($"http://localhost:5000/api/file/fileInfo/note/linux/");
            string fContent = await nr.GetAsync<string>();
            return View((object)fContent);
        }
    }
}