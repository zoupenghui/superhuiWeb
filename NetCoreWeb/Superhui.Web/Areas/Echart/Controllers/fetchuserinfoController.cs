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
using Superhui.Web.Utility;

namespace Superhui.Api.Controllers
{
    [Route("[controller]")]
    [Area("Echart")]
    public class fetchuserinfoController : Controller
    {
        public fetchuserinfoController()
        {
        }

        // GET api/values
        [HttpGet]
        public async Task<string> Get(string fileName = "" )
        {
            var http = NetworkRequest.CreateHttp("http://localhost:58221/api/localFile/userinfo.json");
            var bytes = await http.GetAsync();
            string fileInfoStr = Encoding.UTF8.GetString(bytes);
            
            return fileInfoStr;
        }
    }
}
