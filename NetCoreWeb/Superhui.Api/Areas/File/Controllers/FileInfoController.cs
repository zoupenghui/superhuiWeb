using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Linq;

namespace Superhui.Api.Areas.File.Controllers
{
    /// <summary>
    /// get file tree infomation
    /// </summary>
    [Route("api/[Area]/[controller]")]
    [Area("File")]
    [EnableCors("AllowSepecificOrigins")]
    public class FileInfoController : Controller
    {
        private readonly IFileProvider _fileProvider;
        StringBuilder strBuilder = new StringBuilder();
        public FileInfoController(IFileProvider fileProvider)
        {
            _fileProvider = fileProvider;
        }

        // GET api/values
        [HttpGet("{*fileName}")]
        public string Get(string fileName = "")
        {
            if (string.IsNullOrWhiteSpace(fileName))
            {
                fileName = "";
            }
            fileName = $"/{fileName.Trim('/')}";
            var rootFileInfo = _fileProvider.GetFileInfo(fileName);
            IDirectoryContents dirContents = _fileProvider.GetDirectoryContents(fileName);
            if (rootFileInfo != null && rootFileInfo.Exists && !rootFileInfo.IsDirectory)
            {
                strBuilder.Append("{");
                strBuilder.Append($"\"name\":\"{fileName.Trim('/').Split('/').LastOrDefault()}\",");
                strBuilder.Append($"\"path\":\"{fileName}\",");
                strBuilder.Append($"\"info\":");
                strBuilder.Append("{");
                strBuilder.Append($"\"lastModified\":\"{rootFileInfo.LastModified.LocalDateTime}\",");
                strBuilder.Append($"\"size\":\"{rootFileInfo.Length}\"");
                strBuilder.Append("}");
                strBuilder.Append("}");
            }
            else if (dirContents != null && dirContents.Exists)
            {
                strBuilder.Append("{");
                strBuilder.Append($"\"name\":\"{fileName.Trim('/').Split('/').LastOrDefault()}\",");
                strBuilder.Append($"\"path\":\"{fileName}\",");
                strBuilder.Append("\"children\":[");
                if (dirContents.Count() > 0)
                {
                    Render($"{fileName}");
                    strBuilder.Remove(strBuilder.Length - 1, 1);
                }
                strBuilder.Append("]");
                strBuilder.Append("}");
            }
            else
            {
                strBuilder.Append("{}");
            }
            
            //JObject o = JObject.Parse(strBuilder.ToString());
            //JArray categories = (JArray)o["children"][1]["children"];
            //JArray categories2 = (JArray)o.SelectToken("children[1].children");
            return strBuilder.ToString();
        }

        private void Render(string subPath)
        {
            var dirContents = _fileProvider.GetDirectoryContents(subPath);

            foreach (var fileInfo in dirContents)
            {
                strBuilder.Append("{");
                strBuilder.Append($"\"name\":\"{GetFileName(fileInfo.Name)}\",");
                if (fileInfo.IsDirectory)
                {
                    strBuilder.Append($"\"path\":\"{subPath.TrimEnd('/')}/{fileInfo.Name}\",");
                    strBuilder.Append("\"children\":[");
                    // if()
                    // windows系统独有的路径分割符\
                    // Render($@"{subPath}\\{fileInfo.Name}".TrimStart('\\'));
                    // windows&linux都可识别/路径分割符
                    string subRootPath = $@"{subPath.TrimEnd('/')}/{fileInfo.Name}".TrimStart('\\');
                    if (_fileProvider.GetDirectoryContents(subRootPath).Count() > 0)
                    {
                        Render(subRootPath);
                        strBuilder.Remove(strBuilder.Length - 1, 1);
                    }
                    strBuilder.Append("]}");
                    strBuilder.Append(",");
                }
                else
                {
                    strBuilder.Append($"\"path\": \"{subPath.TrimEnd('/')}/{fileInfo.Name}\",".Replace('\\', '/'));
                    strBuilder.Append($"\"info\":");
                    strBuilder.Append("{");
                    strBuilder.Append($"\"lastModified\":\"{fileInfo.LastModified.LocalDateTime}\",");
                    strBuilder.Append($"\"size\":\"{fileInfo.Length}\"");
                    strBuilder.Append("}");
                    strBuilder.Append("}");
                    strBuilder.Append(",");
                }
            }
        }

        private string GetFileName(string fileName, bool withFileNameExtention = true)
        {
            if (!withFileNameExtention && fileName.Contains('.'))
            {
                return fileName.Substring(0, fileName.LastIndexOf('.'));
            }
            else
            {
                return fileName;
            }
        }

    }
}
