using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Superhui.Web.Areas.Docs.Models;
using Superhui.Web.Areas.Docs.Models.ViewModels;
using Superhui.Web.Models.ViewModels;
//using Superhui.Web.Utility;
using Newtonsoft.Json.Linq;
//using Superhui.Web.Infrastructure;
using Superhui.AspNetCore.Http.Retransmit;

namespace Superhui.Web.Areas.Racs.Controllers
{
    [Area("Racs")]
    public class RetransmitController : Controller
    {
        private readonly IHttpRetransmit httpRetransmit;
        public RetransmitController(IHttpRetransmit retransmit)
        {
            httpRetransmit = retransmit;
        }

        [HttpGet]
        [ActionName("Index")]
        public async Task<string> IndexGet(string catchall = "")
        {
            ////string uri = httpRetransmitConfig.GetUrl(catchall);
            //var http = NetworkRequest.CreateHttp(httpRetransmitConfig.GetUrl(catchall));
            //http.Request.Headers["channel"] = "app";
            //http.Request.Accept = "application/json";
            //foreach (var key in Request.Headers.Keys)
            //{
            //    http.Request.Headers[key] = Request.Headers[key];
            //}
            //if (!string.IsNullOrWhiteSpace(httpRetransmitConfig.Token))
            //{
            //    http.Request.Headers["Authorization"] = httpRetransmitConfig.Token;
            //}
            //var bytes = await http.GetAsync();
            //return bytes != null ? Encoding.UTF8.GetString(bytes) : "";
            return await httpRetransmit.GetAsync(catchall, HttpContext);
        }

        [HttpPost]
        [ActionName("Index")]
        public async Task<string> IndexPost(string catchall = "")
        {
            //string uri = httpRetransmitConfig.GetUrl(catchall);
            //var http = NetworkRequest.CreateHttp(uri);
            //http.Request.Headers["channel"] = "app";
            //http.Request.Accept = "application/json";
            //http.Request.ContentType = "application/json";
            //foreach (var key in Request.Headers.Keys)
            //{
            //    http.Request.Headers[key] = Request.Headers[key];
            //}
            //if (!string.IsNullOrWhiteSpace(httpRetransmitConfig.Token))
            //{
            //    http.Request.Headers["Authorization"] = httpRetransmitConfig.Token;
            //}
            //string requestBody = "";
            //using (var bodyStreamReader = new StreamReader(Request.Body))
            //{
            //    requestBody = await bodyStreamReader.ReadToEndAsync();
            //}
            //http.Body = requestBody;
            ////http.Body="{\"pagination\":{\"current\":1,\"pageSize\":10},\"stcd\":\"0\"}";
            //var bytes = await http.PostAsync();
            //return bytes != null ? Encoding.UTF8.GetString(bytes) : "";
            return await httpRetransmit.PostAsync(catchall, HttpContext);
        }
    }
}