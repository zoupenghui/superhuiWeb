using Microsoft.AspNetCore.Mvc;
using Superhui.Web.Areas.Docs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

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
                if(item["children"] != null) {
                    Render((JObject)item);
                }
                else
                {
                    string htmlLeafCnt = $@"
                        <div class='treeNode'>
                            <a href='#' class='treeUnselected' onclick='clickAnchor(this)'>{item["name"]}</a>
                        </div>";
                    sb.Append(htmlLeafCnt);
                }
            }
            // Render((JObject)catalog);
            return View((object)sb.ToString());
        }
        private void Render (JObject node)
        {
            if (node["children"] != null)
            {
                string htmlParentCnt = $@"
                    <div class='treeNode'>
                        <span>➭</span>
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
                                <a href='#' class='treeUnselected' onclick='clickAnchor(this)'>{item["name"]}</a>
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
                        <a href='#' class='treeUnselected' onclick='clickAnchor(this)'>{node["name"]}</a>
                    </div>";
                sb.Append(htmlLeafCnt);
            }

        }
    }
}
