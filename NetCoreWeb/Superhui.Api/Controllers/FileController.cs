using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;

namespace Superhui.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowSepecificOrigins")]
    public class FileController : Controller
    {
        private readonly IFileProvider _fileProvider;
        StringBuilder strBuilder = new StringBuilder();
        public FileController (IFileProvider fileProvider)
        {
            _fileProvider = fileProvider;
        }

        // GET api/values
        [HttpGet]
        public string Get()
        {
            //var output = new StringBuilder("");
            //IDirectoryContents dir = _fileProvider.GetDirectoryContents("Note");
            //foreach (IFileInfo item in dir)
            //{
            //    output.AppendLine(item.Name);
            //}
            //return output.ToString();


            //IFileInfo file = _fileProvider.GetFileInfo(@"Note\git\基础打操作.md");
            //IFileInfo file = _fileProvider.GetFileInfo("mdStructure.json");

            //string res = "";
            //using (var stream = file.CreateReadStream())
            //{
            //    using (var reader = new StreamReader(stream))
            //    {
            //        var output = await reader.ReadToEndAsync();
            //        //await context.Response.WriteAsync(output.ToString());
            //        res = output;
            //    }
            //}
            //return res;

            strBuilder.Append("[");
            Render("Note");
            strBuilder.Remove(strBuilder.Length - 1, 1);
            strBuilder.Append("]");
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
                    strBuilder.Append($"\"path\":\"{GetFileName(fileInfo.Name)}\",");
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
                    strBuilder.Append($"\"path\": \"{fileInfo.PhysicalPath.Substring(fileInfo.PhysicalPath.IndexOf(':') + 1)}\"".Replace('\\', '/'));
                    strBuilder.Append("}");
                    strBuilder.Append(",");
                }
            }
        }

        private string GetFileName(string fileName)
        {
            if(fileName.Contains('.'))
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
