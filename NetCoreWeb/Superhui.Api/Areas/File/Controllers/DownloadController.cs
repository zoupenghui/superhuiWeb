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
    [Route("[Area]/api/[controller]")]
    [Area("File")]
    [EnableCors("AllowSepecificOrigins")]
    public class DownloadController : Controller
    {
        private readonly IFileProvider _fileProvider;
        private ILogger<DownloadController> logger;
        public DownloadController(IFileProvider fileProvider, ILogger<DownloadController> log)
        {
            _fileProvider = fileProvider;
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
            return new FileStreamResult(stream, "application/octet-stream");
        }
    }
}