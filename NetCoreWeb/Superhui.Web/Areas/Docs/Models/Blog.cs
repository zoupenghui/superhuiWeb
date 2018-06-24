using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Web.Areas.Docs.Models
{
    public class Blog
    {
        //[BindNever]
        public int BlogID { get; set; }
        //[BindNever]
        //public ICollection<BlogLine> Lines { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }//blog类别
        public string Content { get; set; }
        public DateTime CreateTime { get; set; }//创建时间       
        public bool IsPrivate { get; set; }//是否属于私密blog     
    }
}
