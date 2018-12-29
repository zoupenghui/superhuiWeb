using Microsoft.AspNetCore.Mvc;
using Superhui.Web.Areas.Docs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Mvc.ViewComponents;
using Microsoft.AspNetCore.Html;

namespace Superhui.Web.Areas.Docs.Conponents
{
    public class Catalog: ViewComponent
    {
        StringBuilder sb = new StringBuilder();
        public Catalog()
        {
        }
        public IViewComponentResult Invoke(object catalog)
        {
            foreach (var item in (catalog as JObject)["children"])
            {
                if (item["children"] != null) {
                    Render((JObject)item);
                }
                else
                {
                    string htmlLeafCnt = $@"
                        <div class='treeNode'>
                            <a href='javascript:void(0);' path={item["path"]} class='treeUnselected' onclick='clickAnchor(this);getDoc(this);'>{item["name"].ToString().Replace(".md", "")}</a>
                        </div>";
                    sb.Append(htmlLeafCnt);
                }
            }
            return new HtmlContentViewComponentResult(new HtmlString(sb.ToString()));
        }
        private void Render (JObject node)
        {
            if (node["children"] != null)
            {
                // ignore images 
                if (node["name"].ToString().ToLower() == "images")
                    return;
                string htmlParentCnt = $@"
                    <div class='treeNode'>
                        <span onclick='expandCollapse(this.parentNode)' class='cursor category'>➭</span>
                        <span onclick='expandCollapse(this.parentNode)' class='category'>{node["name"]}</span>
                        <div class='treeSubnodesHidden'>";
                sb.Append(htmlParentCnt);
                // children node
                foreach(var item in node["children"])
                {
                    if(item["children"] != null)
                    {                        
                        Render((JObject)item);
                    } 
                    else
                    {
                        string htmlLeafCnt = $@"
                            <div class='treeNode'>
                                <a href='javascript:void(0);' path={item["path"]} class='treeUnselected' onclick='clickAnchor(this);getDoc(this);'>{item["name"].ToString().Replace(".md", "")}</a>
                            </div>";
                        sb.Append(htmlLeafCnt);
                    }                   
                }
                // ===
                sb.Append("</div></div>");
            }
            else
            {
                string htmlLeafCnt = $@"
                    <div class='treeNode'>
                        <a href='javascript:void(0);' path={node["path"]} class='treeUnselected' onclick='clickAnchor(this);getDoc(this);'>{node["name"].ToString().Replace(".md", "")}</a>
                    </div>";
                sb.Append(htmlLeafCnt);
            }
        }
    }
}
