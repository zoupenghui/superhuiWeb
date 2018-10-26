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
//using Superhui.Web.Utility;
using Superhui.Tls;

namespace Superhui.Api.Controllers
{
    [Route("api/[controller]")]
    [Area("Echart")]
    public class saController : Controller
    {
        public saController()
        {
        }

        // POST api/values
        [HttpPost("{*fileName}")]
        public async Task<string> Get(string fileName = "" )
        {
            var http = NetworkRequest.CreateHttp("http://localhost:58221/api/localFile/chartData.json");
            var bytes = await http.GetAsync();
            string dataStr = Encoding.UTF8.GetString(bytes);
            
            return dataStr;
        }
    }
}
