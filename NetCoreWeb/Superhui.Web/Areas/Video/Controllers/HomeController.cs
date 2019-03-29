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
using Superhui.Tls;
using Newtonsoft.Json.Linq;

namespace Superhui.Web.Areas.Video.Controllers
{
    [Area("Video")]
    public class HomeController : Controller
    {
        public HomeController()
        {
        }
        public ViewResult Index()
        {
            return View();
        }
    }
}