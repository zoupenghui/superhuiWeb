using Superhui.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Web.Areas.Docs.Models.ViewModels
{
    public class BlogListViewModel
    {
        public IEnumerable<Blog> Blogs { get; set; }
        public PagingInfo PagingInfo { get; set; }
        public string CurrentCategory { get; set; }
    }
}
