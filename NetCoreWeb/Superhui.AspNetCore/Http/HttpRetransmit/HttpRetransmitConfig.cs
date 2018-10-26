using System;
namespace Superhui.AspNetCore.Http.Retransmit
{
    public class HttpRetransmitConfig: IHttpRetransmitConfig
    {
        public HttpRetransmitConfig()
        {
        }
        public string Host { get; set; }
        public string Area { get; set; }
        public string Token { get; set; }
        public string GetUrl (string path)
        {
            string servicesUri = "";
            if(!string.IsNullOrWhiteSpace(Area)) {
                servicesUri = $"{Host.TrimEnd('/')}/{Area.Trim('/')}/{path.TrimStart('/')}";
            }
            else {
                servicesUri = $"{Host.TrimEnd('/')}/{path.TrimStart('/')}";
            }
            return servicesUri;
        }
    }
}
