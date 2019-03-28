using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace Superhui.Api.Areas.File.Controllers
{
    [Route("api/[Area]/[controller]")]
    [Area("File")]
    [EnableCors("AllowSepecificOrigins")]
    public class ImageController : Controller
    {
        private readonly IFileProvider _fileProvider;
        private ILogger<ContentController> logger;
        public ImageController(IFileProvider fileProvider, ILogger<ContentController> log)
        {
            _fileProvider = fileProvider;
            // _fileProvider = new PhysicalFileProvider("/home/zph/note/");
            logger = log;
        }

        /// <summary>
        /// 文件流的方式输出        
        /// </summary>
        /// <returns></returns>
        [HttpGet("{*fileName}")]
        public IActionResult Get(string fileName = "")
        {
            string path = fileName.TrimStart('/');
            IFileInfo file = _fileProvider.GetFileInfo(path);
            var addrUrl = file.PhysicalPath;
            var stream = System.IO.File.OpenRead(addrUrl);
            string contentType = "image/jpeg";
            if (fileName.EndsWith(".jpg")) {
                contentType = "image/jpeg";
            } else if (fileName.EndsWith(".png")) {
                contentType = "image/png";
            } else if (fileName.EndsWith(".gif")) {
                contentType = "image/gif";
            }
            return new FileStreamResult(stream, contentType);
        }
    }
}