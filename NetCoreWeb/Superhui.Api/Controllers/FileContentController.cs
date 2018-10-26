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
    [Route("api/file/local/[controller]")]
    [EnableCors("AllowSepecificOrigins")]
    public class FileContentController : Controller
    {
        private readonly IFileProvider _fileProvider;
        private ILogger<FileContentController> logger;
        public FileContentController(IFileProvider fileProvider, ILogger<FileContentController> log)
        {
            _fileProvider = fileProvider;
            logger = log;
        }

        [HttpGet("{*fileName}")]
        public async Task<string> Get(string fileName = "")
        {
            logger.LogInformation($"begin get file conent : {HttpContext.Request.Path}");
            logger.LogInformation($"route controller: {RouteData.Values["controller"]}");
            logger.LogInformation($"route action: {RouteData.Values["action"]}");
            logger.LogInformation($"route fileName: {RouteData.Values["fileName"]}");
            logger.LogInformation($"param fileName: {fileName}");
            string path = fileName.TrimStart('/');
            IFileInfo file = _fileProvider.GetFileInfo(path);

            string fileContentStr = "";
            using (var stream = file.CreateReadStream())
            {
                using (var reader = new StreamReader(stream))
                {
                    fileContentStr = await reader.ReadToEndAsync();
                }
            }
            return fileContentStr;
        }

    }
}