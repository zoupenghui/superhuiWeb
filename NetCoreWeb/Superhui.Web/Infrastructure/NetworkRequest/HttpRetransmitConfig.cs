//using System;
//namespace Superhui.Web.Infrastructure
//{
//    public class HttpRetransmitConfig: IHttpRetransmitConfig
//    {
//        public HttpRetransmitConfig()
//        {
//            //Host = "https://ras.ccb.com/religion";
//            //Token = "BearereyJhbGciOiJIUzUxMiJ9.eyJjaXR5Q2QiOm51bGwsInpvbkNkIjpudWxsLCJwcm92Q2QiOiIzMjAwMDAwMDAwMDAiLCJzdHJDZCI6bnVsbCwiZXhwIjoxNTQwNDU2MDc3LCJ1c2VybmFtZSI6IjEyMzQ1Njc4OTExIn0.Gyl0mV0fe98udkq7UJIIkFlqilCf_KtePODuLDAVjXpzfKkUkvAKu3AvVTG8HR0cH6woej4B1QPUE9krdWUsLA";
        
//        }
//        public string Host { get; set; }
//        public string Area { get; set; }
//        public string Token { get; set; }
//        public string GetUrl (string path)
//        {
//            string servicesUri = "";
//            if(!string.IsNullOrWhiteSpace(Area)) {
//                servicesUri = $"{Host.TrimEnd('/')}/{Area.Trim('/')}/{path.TrimStart('/')}";
//            }
//            else {
//                servicesUri = $"{Host.TrimEnd('/')}/{path.TrimStart('/')}";
//            }
//            return servicesUri;
//        }
//    }
//}
