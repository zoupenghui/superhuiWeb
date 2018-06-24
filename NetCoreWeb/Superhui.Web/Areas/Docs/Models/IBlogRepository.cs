using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Web.Areas.Docs.Models
{
    public interface IBlogRepository
    {
        IEnumerable<Blog> Blogs { get; }
        void SaveBlog(Blog blog);
        Blog DeleteBlog(int blogID);
    }
}
