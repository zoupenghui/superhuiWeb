using System;
namespace Superhui.AspNetCore.Http.Retransmit
{
    public interface IHttpRetransmitConfig
    {
        string Host { get; }
        string Token { get; set; }
        string Area { get; set; }
        string GetUrl( string path);
    }
}
