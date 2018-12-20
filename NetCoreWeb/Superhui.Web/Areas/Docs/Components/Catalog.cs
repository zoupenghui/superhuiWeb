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
            StringBuilder sb = new StringBuilder();
            foreach (var item in (catalog as JObject)["children"]) {
              if(item["children"] != null) {
                
              } else {
                string t1 = "xyj";
                string tmp = $"fuck{t1}";
                string htmlCnt = $@"
                <div class='treeNode'>
                  <a href='#' class='treeUnselected' onclick='clickAnchor(this)'>{t1}</a>
                </div>";
              }
            }
            return View(catalog);
        }
        private void Render (JObject node)
        {
            // foreach (var item in (node as JObject)["children"]) {
            //   if(item["children"] != null) {
            //     string htmlCnt = $@"
            //         <span>➭</span>
            //         <span onclick='expandCollapse(this.parentNode)' class='category'>目录节点二</span>
            //         <div class='treeSubnodesHidden'>
            //             <div class='treeNode'>
            //                 <a href='#' class='treeUnselected' onclick='clickAnchor(this)'>叶子结点一</a>
            //             </div>
            //         </div>";
            //     sb.Append(htmlCnt);
            //   } else {
            //     string htmlCnt = $@"
            //         <div class='treeNode'>
            //         <a href='#' class='treeUnselected' onclick='clickAnchor(this)'>{node["name"]}</a>
            //         </div>";
            //     sb.Append(htmlCnt);
            //   }
            // }  

            if(node["children"] != null) {
            string htmlCnt = $@"
                <span>➭</span>
                <span onclick='expandCollapse(this.parentNode)' class='category'>目录节点二</span>
                <div class='treeSubnodesHidden'>";
            sb.Append(htmlCnt);
            // node
            // ===
            sb.Append("</div>");
            } else {
            string htmlCnt = $@"
                <div class='treeNode'>
                <a href='#' class='treeUnselected' onclick='clickAnchor(this)'>{node["name"]}</a>
                </div>";
            sb.Append(htmlCnt);
            }                   
        }
    }
}
