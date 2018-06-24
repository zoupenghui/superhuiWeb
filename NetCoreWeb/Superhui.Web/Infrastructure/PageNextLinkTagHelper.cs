using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Superhui.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Web.Infrastructure
{
    [HtmlTargetElement("nav", Attributes = "page-model")]
    public class PageNextLinkTagHelper : TagHelper
    {
        private IUrlHelperFactory urlHelperFactory;
        public PageNextLinkTagHelper(IUrlHelperFactory helperFactory)
        {
            urlHelperFactory = helperFactory;
        }
        [ViewContext]
        [HtmlAttributeNotBound]
        public ViewContext ViewContext { get; set; }
        public PagingInfo PageModel { get; set; }
        public string PageAction { get; set; }
        [HtmlAttributeName(DictionaryAttributePrefix = "page-url-")]
        public Dictionary<string, object> PageUrlValues { get; set; }
            = new Dictionary<string, object>();
        public bool PageClassesEnabled { get; set; } = false;
        /// <summary>
        /// 上一页按钮样式名
        /// </summary>
        public string PagePreClass { get; set; }
        /// <summary>
        /// 下一页按钮样式名
        /// </summary>
        public string PageNextClass { get; set; }
        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            IUrlHelper urlHelper = urlHelperFactory.GetUrlHelper(ViewContext);
            TagBuilder result = new TagBuilder("nav");
            TagBuilder tag = new TagBuilder("span");
            tag.AddCssClass("page-number");
            tag.InnerHtml.Append($"第 {PageModel.CurrentPage} 页/共 {PageModel.TotalPages} 页");
            if (PageModel.CurrentPage != 1)
            {
                TagBuilder preTag = new TagBuilder("a");
                preTag.AddCssClass(PagePreClass);
                PageUrlValues["page"] = PageModel.CurrentPage - 1;
                preTag.Attributes["href"] = urlHelper.Action(PageAction, PageUrlValues);
                preTag.InnerHtml.Append("← 上一页");
                result.InnerHtml.AppendHtml(preTag);
            }
            result.InnerHtml.AppendHtml(tag);
            if (PageModel.CurrentPage != PageModel.TotalPages)
            {
                TagBuilder nextTag = new TagBuilder("a");
                nextTag.AddCssClass(PageNextClass);
                PageUrlValues["page"] = PageModel.CurrentPage + 1;
                nextTag.Attributes["href"] = urlHelper.Action(PageAction, PageUrlValues);
                nextTag.InnerHtml.Append("下一页 →");
                result.InnerHtml.AppendHtml(nextTag);
            }



            //TagBuilder result = new TagBuilder("div");
            //for (int i = 1; i <= PageModel.TotalPages; i++)
            //{
            //    TagBuilder tag = new TagBuilder("a");
            //    PageUrlValues["page"] = i;
            //    tag.Attributes["href"] = urlHelper.Action(PageAction, PageUrlValues);
            //    if (PageClassesEnabled)
            //    {
            //        tag.AddCssClass(PageClass);
            //        tag.AddCssClass(i == PageModel.CurrentPage ? PageClassSelected : PageClassNormal);
            //    }
            //    tag.InnerHtml.Append(i.ToString());
            //    result.InnerHtml.AppendHtml(tag);
            //}
            output.Content.AppendHtml(result.InnerHtml);
        }
    }
}
