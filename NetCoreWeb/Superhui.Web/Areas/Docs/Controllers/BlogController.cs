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
using Superhui.Web.Infrastructure.Filters;

namespace Superhui.Web.Areas.Docs.Controllers
{
    [Area("Docs")]
    [HttpsDisable]
    public class BlogController : Controller
    {
        private IBlogRepository repository;
        private BlogDbContext context;
        private IHostingEnvironment hostingEnv;
        public BlogController(IBlogRepository repo, BlogDbContext ctx, IHostingEnvironment env)
        {
            repository = repo;
            context = ctx;
            hostingEnv = env;
        }
        // GET: Blog
        public ActionResult Index(int blogId)
        {
            Blog blog = repository.Blogs.FirstOrDefault(b => b.BlogID == blogId);
            string blogContent = "";
            if (blog != null)
            {
                var allRelatedBlogs = repository.Blogs.Where(b => b.Category == blog.Category);
                blogContent = blog.Content;
                ViewBag.SelectedBlog = blog;
                //return View((object)blogContent);
                return View(new BlogIndexViewModel() { AllRelatedBlogs = allRelatedBlogs, CurrentBlog = blog });
            }
            else
            {
                blogContent = "未查找到相关内容";
                return View();
            }
        }
        public int PageSize = 8;
        public IActionResult List(string category, int page = 1)
        {
            return View(new BlogListViewModel
            {
                Blogs = repository.Blogs
                .Where(p => category == null || p.Category == category)
                .OrderBy(p => p.CreateTime).Reverse()
                .Skip((page - 1) * PageSize)
                .Take(PageSize),

                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = PageSize,
                    TotalItems = category == null ? repository.Blogs.Count() : repository.Blogs.Where(e => e.Category == category).Count()
                },
                CurrentCategory = category
            });
        }
        // GET: Blog/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Blog/Create
        //public string Create()
        //{
        //    Blog blog = new Blog();
        //    blog.Name = "example";
        //    blog.Category = "未分类";
        //    blog.IsPrivate = false;
        //    blog.CreateTime = DateTime.Now;
        //    //设置blog内容
        //    string filePath = hostingEnv.WebRootPath + $@"\docs\samples\test.md";
        //    FileStream stream = new FileStream(filePath, FileMode.Open);
        //    StreamReader sReader = new StreamReader(stream, Encoding.UTF8);
        //    string mdContent = sReader.ReadToEnd();
        //    blog.Content = mdContent;
        //    sReader.Close();
        //    stream.Close();
        //    repository.SaveBlog(blog);
        //    return mdContent;
        //}
        [HttpGet]
        [Authorize]
        public IActionResult Create()
        {
            Blog blog = new Blog();
            blog.Name = "未命名";
            blog.Category = "未分类";
            return View(blog);
        }
        // POST: Blog/Create
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public string Create(IFormCollection collection,Blog blog)
        //{
        //    try
        //    {
        //        // TODO: Add insert logic here
        //        blog.CreateTime = DateTime.Now;
        //        repository.SaveBlog(blog);
        //        //return Request.Form["test-editormd-markdown-doc"];
        //        return blog.Content;
        //    }
        //    catch
        //    {
        //        return "error";
        //    }
        //}


        //[HttpPost]
        //public string Create(IList<IFormFile> formFiles)
        //{
        //    //Request.Form["test-editormd-markdown-doc"];
        //    //Request.Form["test-editormd-html-code"];
        //    return Request.Form["test-editormd-markdown-doc"];
        //}
        // POST: Blog/Create
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection,Blog blog)
        {
            try
            {
                // TODO: Add insert logic here
                blog.CreateTime = DateTime.Now;
                blog.IsPrivate = false;
                repository.SaveBlog(blog);
                //return Request.Form["test-editormd-markdown-doc"];
                return RedirectToAction(nameof(List));
            }
            catch
            {
                return View();
            }
        }

        // GET: Blog/Edit/5
        [Authorize]
        public IActionResult Edit(int blogID)
        {
            //var blog = repository.Blogs.FirstOrDefault(a => a.BlogID == id);

            ////设置blog内容
            //string filePath = hostingEnv.WebRootPath + $@"\docs\samples\test.md";
            //FileStream stream = new FileStream(filePath, FileMode.Open);
            //StreamReader sReader = new StreamReader(stream, Encoding.UTF8);
            //string mdContent = sReader.ReadToEnd();
            //blog.Content = mdContent;
            //sReader.Close();
            //stream.Close();

            //repository.SaveBlog(blog);

            Blog blog = repository.Blogs.FirstOrDefault(b => b.BlogID == blogID);        
            return View(blog);
        }

        // POST: Blog/Edit/5
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(Blog blog, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here
                repository.SaveBlog(blog);
                return RedirectToAction(nameof(List));
            }
            catch
            {
                return View();
            }
        }

        // GET: Blog/Delete/5
        [Authorize]
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Blog/Delete/5
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}