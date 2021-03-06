﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json.Linq;

namespace Superhui.Api.Controllers
{
    /// <summary>
    /// get file tree infomation
    /// </summary>
    [Route("api/[controller]")]
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
        public string Get(string fileName = "" )
        {
            IFileInfo fileInfo_root = _fileProvider.GetFileInfo($"/{fileName}");
            strBuilder.Append("{");
            strBuilder.Append($"\"name\":\"{fileInfo_root.Name}\",");
            strBuilder.Append($"\"path\":\"/{fileInfo_root.Name}\",");
            strBuilder.Append("\"children\":[");
            Render($"/{fileInfo_root.Name}");
            strBuilder.Remove(strBuilder.Length - 1, 1);
            strBuilder.Append("]");
            strBuilder.Append("}");
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
                    strBuilder.Append($"\"path\":\"{subPath}/{fileInfo.Name}\",");
                    strBuilder.Append("\"children\":[");
                    // windows系统独有的路径分割符\
                    // Render($@"{subPath}\\{fileInfo.Name}".TrimStart('\\'));
                    // windows&linux都可识别/路径分割符
                    Render($@"{subPath}/{fileInfo.Name}".TrimStart('\\'));
                    strBuilder.Remove(strBuilder.Length - 1, 1);
                    strBuilder.Append("]}");
                    strBuilder.Append(",");
                }
                else
                {
                    strBuilder.Append($"\"path\": \"{subPath}/{fileInfo.Name}\",".Replace('\\', '/'));
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
