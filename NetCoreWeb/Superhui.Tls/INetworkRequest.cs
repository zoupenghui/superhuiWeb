using System;
using System.Net;
using System.Threading.Tasks;

namespace Superhui.Tls
{
    public interface INetworkHttpRequest
    {
        string Body { get; set; }
        HttpWebRequest Request { get; }
        byte[] Get();
        Task<byte[]> GetAsync();
        byte[] Post(string body = null);
        Task<byte[]> PostAsync(string body = null);
        Action<NetworkRequest> ErrorAction { get; set; }
    }
}
