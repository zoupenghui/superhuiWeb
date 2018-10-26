using System;
using System.IO;
using System.Text;
using System.Net;
using System.Threading.Tasks;
using Superhui.Tls;
using Microsoft.AspNetCore.Http;
namespace Superhui.AspNetCore.Http.Retransmit
{
    public class HttpRetransmit : IHttpRetransmit
    {
        IHttpRetransmitConfig httpRetransmitConfig;
        public HttpRetransmit(IHttpRetransmitConfig retrasmitConfig)
        {
            httpRetransmitConfig = retrasmitConfig;
        }

        /// <summary>
        /// Gets the async http retransmission.
        /// </summary>
        /// <returns>The async string result.</returns>
        /// <param name="path">url path</param>
        /// <param name="httpContext">original HttpContext.</param>
        public async Task<string> GetAsync(string path, HttpContext httpContext)
        {
            INetworkHttpRequest networkRequest = NetworkRequest.CreateHttp(httpRetransmitConfig.GetUrl(path));
            networkRequest.Request.Headers["channel"] = "app";
            networkRequest.Request.Accept = "application/json";
            foreach (var key in httpContext.Request.Headers.Keys)
            {
                networkRequest.Request.Headers[key] = httpContext.Request.Headers[key];
            }

            if (!string.IsNullOrWhiteSpace(httpRetransmitConfig.Token))
            {
                networkRequest.Request.Headers["Authorization"] = httpRetransmitConfig.Token;
            }
            // cookie process
            // Microsoft.AspNetCore.Http.Internal.RequestCookieCollection
            // var cookieContainer = new System.Net.CookieContainer ();
            // HttpWebResponse response;
            // response.Cookies;
            // httpContext.Response.Cookies

            // foreach (var keyValuePair in httpContext.Request.Cookies)
            // {
            //     cookieContainer.Add(new Cookie(keyValuePair.Key, keyValuePair.Value));
            // }
            // networkRequest.Request.CookieContainer = cookieContainer;
            // ------
            var bytes = await networkRequest.GetAsync();
            return bytes != null ? Encoding.UTF8.GetString(bytes) : "";
        }

        /// <summary>
        /// Posts the async retransmission.
        /// </summary>
        /// <returns>The async string result.</returns>
        /// <param name="path">url path.</param>
        /// <param name="httpContext">original HttpContext.</param>
        public async Task<string> PostAsync(string path, HttpContext httpContext)
        {
            string uri = httpRetransmitConfig.GetUrl(path);
            INetworkHttpRequest networkRequest = NetworkRequest.CreateHttp(uri);
            networkRequest.Request.Headers["channel"] = "app";
            networkRequest.Request.Accept = "application/json";
            networkRequest.Request.ContentType = "application/json";
            foreach (var key in httpContext.Request.Headers.Keys)
            {
                networkRequest.Request.Headers[key] = httpContext.Request.Headers[key];
            }
            if (!string.IsNullOrWhiteSpace(httpRetransmitConfig.Token))
            {
                networkRequest.Request.Headers["Authorization"] = httpRetransmitConfig.Token;
            }
            // todo: cockie process
            // ------
            string requestBody = "";
            using (var bodyStreamReader = new StreamReader(httpContext.Request.Body))
            {
                requestBody = await bodyStreamReader.ReadToEndAsync();
            }
            networkRequest.Body = requestBody;
            //http.Body="{\"pagination\":{\"current\":1,\"pageSize\":10},\"stcd\":\"0\"}";
            var bytes = await networkRequest.PostAsync();
            return bytes != null ? Encoding.UTF8.GetString(bytes) : "";
        }
    }
}
