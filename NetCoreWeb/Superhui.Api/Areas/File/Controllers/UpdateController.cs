using System;
using System.Text;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;

namespace Superhui.Api.Areas.File.Controllers
{
    /// <summary>
    /// Update file controller. only support string file type
    /// </summary>
    [Route("api/[Area]/[controller]")]
    [Area("File")]
    [EnableCors("AllowSepecificOrigins")]
    public class UpdateController : Controller
    {
        private readonly IFileProvider _fileProvider;
        private ILogger<UpdateController> logger;
        public UpdateController(IFileProvider fileProvider, ILogger<UpdateController> log)
        {
            _fileProvider = fileProvider;
            logger = log;
        }

        /// <summary>
        /// 文件流的方式输出        
        /// </summary>
        /// <returns></returns>
        [HttpGet("{*fileName}")]
        public IActionResult Get(string fileName = "", string str = "")
        {
            string path = fileName.TrimStart('/');
            IFileInfo fileInfo = _fileProvider.GetFileInfo(path);
            if (fileInfo.Exists) {
                var filePath = fileInfo.PhysicalPath;
                Byte[] bytes = Encoding.UTF8.GetBytes(str);
                using (FileStream fs = System.IO.File.Open(filePath,FileMode.Truncate,FileAccess.Write)) {
                    fs.Write(bytes, 0, bytes.Length);
                }
                // return StatusCode(StatusCodes.Status200OK);                 
                return new ContentResult {
                    Content = fileInfo.LastModified.LocalDateTime.ToString()
                };               
            } else {
                return StatusCode(StatusCodes.Status404NotFound);
            }
        }
    }
}