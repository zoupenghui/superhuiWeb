using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;

namespace Superhui.Api.Areas.File.Controllers
{
    [Route("api/[Area]/[controller]")]
    [Area("File")]
    [EnableCors("AllowSepecificOrigins")]
    public class UploadController : Controller
    {
        private readonly IFileProvider _fileProvider;
        private ILogger<UploadController> logger;
        private IHostingEnvironment hostingEnv;

        public UploadController(IFileProvider fileProvider, ILogger<UploadController> log, IHostingEnvironment env)
        {
            _fileProvider = fileProvider;
            logger = log;
            hostingEnv = env;
        }

        [HttpGet]
        public string Get()
        {
            string path = hostingEnv.WebRootPath;
            return path;
        }

        /// <summary>
        /// 文件上传
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public JsonResult Post(IFormFile file)
        {
            var uploadfile = Request.Form.Files[0];
            string filePath = hostingEnv.WebRootPath;

            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
            string suffix = fileName.Substring(fileName.LastIndexOf(".", StringComparison.Ordinal) + 1, (fileName.Length - fileName.LastIndexOf(".", StringComparison.Ordinal) - 1));
            var fileExtension = Path.GetExtension(fileName);
            string[] pictureFormatArray = { "png", "jpg", "jpeg", "bmp", "gif", "ico", "PNG", "JPG", "JPEG", "BMP", "GIF", "ICO" };
            fileName = Guid.NewGuid() + "." + suffix;
            string fileFullName = filePath + "/" + fileName;
            using (FileStream fs = System.IO.File.Create(fileFullName))
            {
                file.CopyTo(fs);
                fs.Flush();
            }
            return new JsonResult(new { filePath = $@"http://192.168.8.106:8100/{fileName}"});
        }
    }
}