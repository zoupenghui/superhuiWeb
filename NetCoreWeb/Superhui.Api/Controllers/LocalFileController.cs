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
    [Route("api/[controller]")]
    [EnableCors("AllowSepecificOrigins")]
    public class LocalFileController : Controller
    {
        private readonly IFileProvider _fileProvider;
        private ILogger<LocalFileController> logger;
        public LocalFileController(IFileProvider fileProvider, ILogger<LocalFileController> log)
        {
            _fileProvider = fileProvider;
            logger = log;
        }
        [HttpGet("{*fileName}")]
        public async Task<string> Get(string fileName = "")
        {
            logger.LogInformation($"request path: {HttpContext.Request.Path}");
            logger.LogInformation($"controller: {RouteData.Values["controller"]}");
            logger.LogInformation($"action: {RouteData.Values["action"]}");
            string path = fileName.TrimStart('/');
            string output = "";
            if (!string.IsNullOrEmpty(path))
            {
                IFileInfo file = _fileProvider.GetFileInfo(path);

                using (var stream = file.CreateReadStream())
                {
                    using (var reader = new StreamReader(stream))
                    {
                        output = await reader.ReadToEndAsync();
                    }
                }
            }
            return output;
        }


        ///// <summary>
        ///// 文件流的方式输出        
        ///// </summary>
        ///// <returns></returns>
        //[HttpGet("{*fileName}")]
        //public IActionResult Get(string fileName = "")
        //{
        //    string path = fileName.TrimStart('/');
        //    IFileInfo file = _fileProvider.GetFileInfo(path);
        //    var addrUrl = file.PhysicalPath;
        //    var stream = System.IO.File.OpenRead(addrUrl);
        //    return new FileStreamResult(stream, "application/octet-stream");
        //}
    }
}