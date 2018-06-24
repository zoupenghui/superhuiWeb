using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Web.Areas.Docs.Models
{
    public class EFBlogRepository : IBlogRepository
    {
        private BlogDbContext context;
        public EFBlogRepository(BlogDbContext ctx) { context = ctx; }
        public IEnumerable<Blog> Blogs => context.Blogs;
        public void SaveBlog(Blog blog)
        {
            if (blog.BlogID == 0)
            {
                context.Blogs.Add(blog);
            }
            else
            {
                Blog dbEntry = context.Blogs.FirstOrDefault(a => a.BlogID == blog.BlogID);
                if (dbEntry != null)
                {
                    dbEntry.Name = blog.Name;
                    dbEntry.Content = blog.Content;
                    dbEntry.Category = blog.Category;
                    dbEntry.CreateTime = blog.CreateTime;
                    dbEntry.IsPrivate = blog.IsPrivate;
                }
            }
            context.SaveChanges();
        }
        public Blog DeleteBlog(int blogID)
        {
            Blog dbEntry = context.Blogs.FirstOrDefault(a => a.BlogID == blogID);
            if (dbEntry != null)
            {
                context.Blogs.Remove(dbEntry);
                context.SaveChanges();
            }
            return dbEntry;
        }
    }
}
