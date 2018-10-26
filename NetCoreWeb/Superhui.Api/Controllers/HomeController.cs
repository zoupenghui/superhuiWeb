using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace Superhui.Api.Controllers
{
    [EnableCors("AllowSepecificOrigins")]
    public class HomeController : Controller
    {
        private readonly IFileProvider _fileProvider;
        private ILogger<HomeController> logger;
        public HomeController(IFileProvider fileProvider, ILogger<HomeController> log)
        {
            _fileProvider = fileProvider;
            logger = log;
        }

        public IActionResult Index()
        {
            return View();
        }
        public async Task<string> LocalFile(string catchall)
        {
            logger.LogInformation($"request local file : {HttpContext.Request.Path}");
            logger.LogInformation($"controller: {RouteData.Values["controller"]}");
            logger.LogInformation($"action: {RouteData.Values["action"]}");
            logger.LogInformation($"catchall: {RouteData.Values["catchall"]}");
            logger.LogInformation($"catchall: {catchall}");
            string path = catchall.TrimStart('/');
            IFileInfo file = _fileProvider.GetFileInfo(path);

            string res = "";
            using (var stream = file.CreateReadStream())
            {
                using (var reader = new StreamReader(stream))
                {
                    var output = await reader.ReadToEndAsync();
                    res = output;
                }
            }
            return res;
        }

    }
}