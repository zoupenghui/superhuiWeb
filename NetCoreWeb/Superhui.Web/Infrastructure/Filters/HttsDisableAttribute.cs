using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Mvc.ModelBinding;
namespace Superhui.Web.Infrastructure.Filters
{
    public class HttpsDisableAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context.HttpContext.Request.IsHttps)
            {
                context.Result = new ContentResult {
                    Content = "Not support https!",
                    ContentType = "text/plain"
                };
                // context.Result = new ViewResult
                // {
                //     ViewName = "Message",
                //     ViewData = new ViewDataDictionary(
                //         new EmptyModelMetadataProvider(),
                //         new ModelStateDictionary()) { 
                //             Model = "not support https"
                //         }
                // };
            }
        }
    }
}
