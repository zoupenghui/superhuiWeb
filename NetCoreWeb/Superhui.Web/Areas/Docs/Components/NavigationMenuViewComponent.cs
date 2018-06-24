using Microsoft.AspNetCore.Mvc;
using Superhui.Web.Areas.Docs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Web.Areas.Docs.Conponents
{
    public class NavigationMenuViewComponent : ViewComponent
    {
        private IBlogRepository repository;
        public NavigationMenuViewComponent(IBlogRepository repo)
        {
            repository = repo;
        }
        public IViewComponentResult Invoke()
        {
            ViewBag.SelectedCategory = RouteData?.Values["category"];
            return View(repository.Blogs
                .Select(x => x.Category)
                .Distinct()
                .OrderBy(x => x));
        }
    }
}
