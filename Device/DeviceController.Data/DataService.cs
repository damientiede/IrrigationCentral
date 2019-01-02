using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using DeviceController.Data.Authentication;
using RestSharp;
using log4net;

namespace DeviceController.Data
{
    public class DataService
    {
        private static IRestApi proxy;

        public static IRestApi Proxy
        {
            get
            {
                if (proxy == null)
                {
                    ILog log = LogManager.GetLogger("Device");                    

                    string env = "PROD";
                    if (ConfigurationManager.AppSettings["environment"] != null)
                    {
                        env = ConfigurationManager.AppSettings["environment"].ToString();
                    }                                        
                    string authServerUri = ConfigurationManager.AppSettings["AuthServerUri"].ToString();
                    string restApiUrl = ConfigurationManager.AppSettings["RestApiUri"].ToString();
                    string authClientId = ConfigurationManager.AppSettings["AuthClientId"].ToString();
                    string authClientSecret = ConfigurationManager.AppSettings["AuthClientSecret"].ToString();
                    if (env == "TEST")
                    {
                        authServerUri = ConfigurationManager.AppSettings["TestAuthServerUri"].ToString();
                        restApiUrl = ConfigurationManager.AppSettings["TestRestApiUri"].ToString();
                        authClientId = ConfigurationManager.AppSettings["TestAuthClientId"].ToString();
                        authClientSecret = ConfigurationManager.AppSettings["TestAuthClientSecret"].ToString();
                    }
                    log.DebugFormat("Initializing Rest Api proxy for {0} ...",restApiUrl);
                    AuthClientSecret secret = new AuthClientSecret()
                    {
                        client_id = authClientId,
                        client_secret = authClientSecret,
                        audience = restApiUrl,
                        grant_type = "client_credentials"
                    };
                    //string authToken = AuthTokenProvider.GetAuthToken(authServerUri, secret);
                    //log.InfoFormat("DataService.Proxy - accessed authToken {0}", authToken);
                    proxy = new RestApiClient(restApiUrl, authServerUri, secret);
                }
                return proxy;
            }
        }
        public static void CreateEvent(EventTypes eventType, string desc, int deviceId)
        {           
            Event e = new Event { EventType = (int)eventType, CreatedAt = DateTime.Now, EventValue = desc, DeviceId = deviceId };
            proxy.PostEvent(e);            
        }
        //public static void PutDevice(Device d)
        //{
        //    ILog log = LogManager.GetLogger("Device");
        //    try
        //    {
        //        IRestResponse response = proxy.PutDevice(d);
        //        log.DebugFormat("DataService.PutDevice() {0} {1}", response.ResponseStatus.ToString(), response.Content);         
        //    }
        //    catch (Exception ex)
        //    {
        //        log.ErrorFormat(ex.Message);
        //    }
        //}
    }
}
