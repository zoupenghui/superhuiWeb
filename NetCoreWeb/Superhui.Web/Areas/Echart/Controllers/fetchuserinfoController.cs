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
using Superhui.Tls;

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
            var http = NetworkRequest.CreateHttp("https://ras.ccb.com/religion/api/im/cptlwarnpcs/search");
            http.Request.Headers["channel"] = "app";
            http.Request.Headers["Authorization"] = "BearereyJhbGciOiJIUzUxMiJ9.eyJjaXR5Q2QiOm51bGwsInpvbkNkIjpudWxsLCJwcm92Q2QiOiIzMjAwMDAwMDAwMDAiLCJzdHJDZCI6bnVsbCwiZXhwIjoxNTQwMzcwNjczLCJ1c2VybmFtZSI6IjEyMzQ1Njc4OTExIn0.aFdHv32ow8gcoC3nqwzzv_6s3hEga5xYiX3UjUC5ln9RrI8cUJjF5V85DirdKxViDBnsv5hJNY1f_WGrQ5yMJg";
            http.Request.Accept = "application/json";
            http.Request.ContentType = "application/json";
            // http.Body="{pagination: {current: 1, pageSize: 10}, stcd: \"0\"}";
            http.Body="{\"pagination\":{\"current\":1,\"pageSize\":10},\"stcd\":\"0\"}";
            var bytes = await http.PostAsync();
            string fileInfoStr = Encoding.UTF8.GetString(bytes);
            
            return fileInfoStr;



            // // var http = NetworkRequest.CreateHttp("http://localhost:58221/api/localFile/userinfo.json");
            // var http = NetworkRequest.CreateHttp("https://ras.ccb.com/religion/fetchuserinfo");
            // http.Request.Headers["channel"] = "app";
            // http.Request.Headers["Authorization"] = "BearereyJhbGciOiJIUzUxMiJ9.eyJjaXR5Q2QiOm51bGwsInpvbkNkIjpudWxsLCJwcm92Q2QiOiIzMjAwMDAwMDAwMDAiLCJzdHJDZCI6bnVsbCwiZXhwIjoxNTQwMzcwNjczLCJ1c2VybmFtZSI6IjEyMzQ1Njc4OTExIn0.aFdHv32ow8gcoC3nqwzzv_6s3hEga5xYiX3UjUC5ln9RrI8cUJjF5V85DirdKxViDBnsv5hJNY1f_WGrQ5yMJg";
            // http.Request.Accept = "application/json";
            // var bytes = await http.GetAsync();
            // string fileInfoStr = Encoding.UTF8.GetString(bytes);
            
            // return fileInfoStr;
        }
    }
}
