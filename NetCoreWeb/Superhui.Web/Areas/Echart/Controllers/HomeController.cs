﻿using System;
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
using Superhui.Tls;
using Newtonsoft.Json.Linq;

namespace Superhui.Web.Areas.Echart.Controllers
{
    [Area("Echart")]
    public class HomeController : Controller
    {
        public HomeController()
        {
        }
        public ViewResult Index()
        {
            return View();
        }
        // public async Task<ActionResult> Index()
        // {
        //     //var http = NetworkRequest.CreateHttp("http://localhost:58221/api/fileInfo/packages");
        //     //var bytes = await http.GetAsync();
        //     //string fileInfoStr = Encoding.UTF8.GetString(bytes);
        //     //JObject o = JObject.Parse(fileInfoStr);
        //     //JArray fileInfoArray = (JArray)o.SelectToken("children");
        //     return View();
        // }
    }
}