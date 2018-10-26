using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Superhui.AspNetCore.Http.Retransmit
{
    public interface IHttpRetransmit
    {
        /// <summary>
        /// Gets the async http retransmission.
        /// </summary>
        /// <returns>The async string result.</returns>
        /// <param name="path">url path</param>
        /// <param name="httpContext">original HttpContext.</param>
        Task<string> GetAsync(string path, HttpContext httpContext);

        /// <summary>
        /// Posts the async retransmission.
        /// </summary>
        /// <returns>The async string result.</returns>
        /// <param name="path">url path.</param>
        /// <param name="httpContext">original HttpContext.</param>
        Task<string> PostAsync(string path, HttpContext httpContext);
    }
}
