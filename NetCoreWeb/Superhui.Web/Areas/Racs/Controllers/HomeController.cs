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

namespace Superhui.Web.Areas.Racs.Controllers
{
    [Area("Racs")]
    public class HomeController : Controller
    {
        public HomeController(IBlogRepository repo, BlogDbContext ctx, IHostingEnvironment env)
        {
        }
        // GET: Blog
        public ActionResult Index()
        {
            return View();
        }
    }
}