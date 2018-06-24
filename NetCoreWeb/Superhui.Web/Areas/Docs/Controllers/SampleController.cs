using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Superhui.Web.Areas.Docs.Controllers
{
    [Area("Docs")]
    public class SampleController : Controller
    {
        private IHostingEnvironment hostingEnv;
        public SampleController(IHostingEnvironment env)
        {
            hostingEnv = env;
        }
        public IActionResult Index()
        {
            string filePath = hostingEnv.WebRootPath + $@"\docs\samples\test.md";
            FileStream stream = new FileStream(filePath, FileMode.Open);
            StreamReader sReader = new StreamReader(stream, Encoding.UTF8);
            string str = sReader.ReadToEnd();
            sReader.Close();
            stream.Close();
            return View((object)str);
        }  
        [HttpGet]
        public IActionResult Simple()
        {
            return View();
        }
        [HttpPost]
        public string Simple(IList<IFormFile> files)
        {

            //Request.Form["test-editormd-markdown-doc"];
            //Request.Form["test-editormd-html-code"];
            return Request.Form["test-editormd-markdown-doc"];
        }
    }
}