using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Superhui.Api.MiddelWare
{
    public class RequestLoggerMiddleware
    {
        private readonly RequestDelegate _next;
        private ILogger<RequestLoggerMiddleware> logger;
        public RequestLoggerMiddleware (RequestDelegate requestDelegate, ILogger<RequestLoggerMiddleware> log)
        {
            _next = requestDelegate;
            logger = log;
        }

        public async Task Invoke(HttpContext context)
        {
            logger.LogInformation($"request path: {context.Request.Path}\r\n");
            await _next.Invoke(context);
            logger.LogInformation($"finished request: {context.Request.Path}\r\n");
        }
    }
}
