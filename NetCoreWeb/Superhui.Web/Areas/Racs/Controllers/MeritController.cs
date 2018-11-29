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
using Newtonsoft.Json.Linq;
using Superhui.Tls;

namespace Superhui.Web.Areas.Racs.Controllers
{
    [Area("Racs")]
    public class MeritController : Controller
    {
        public MeritController()
        {
        }
        public JsonResult Home()
        {
            var homeDataObj = new {
                meritBoxName = "兴国禅寺功德箱",
                siyuanName = "兴国禅寺",
                siyuanAdd = "山东济南千佛山",
                totalMoeny = "68451",
                donationTimes = "1248",

            };
            return Json(homeDataObj);
        }
        public JsonResult Detail()
        {
            List<object> list = new List<object>();
            for(int i = 0; i < 15; i ++) {
                list.Add(new {
                    userName = "王四", 
                    userAdd = "湖北", 
                    money = "77.78", 
                    time= "2018-11-28 10:30", 
                    prayType= "还愿报恩" 
                    }
                );
            }
            // var jsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(list);
            return Json(list);
        }
    }
}