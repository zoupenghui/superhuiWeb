using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Web.Areas.Docs.Models.ViewModels
{
    public class BlogIndexViewModel
    {
        public IEnumerable<Blog> AllRelatedBlogs { get; set; }
        public Blog CurrentBlog { get; set; }
        public string CurrentCategory { get; set; }
    }
}
