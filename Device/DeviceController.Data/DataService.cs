using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using DeviceController.Data.Authentication;
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
                    log.DebugFormat("Initializing Rest Api proxy...");
                    //string serverUri = ConfigurationManager.AppSettings["server"].ToString();
                    //proxy = new DataServerWebClient(serverUri);

                    string authServerUri = ConfigurationManager.AppSettings["AuthServerUri"].ToString();
                    string restApiUrl = ConfigurationManager.AppSettings["RestApiUri"].ToString();
                    AuthClientSecret secret = new AuthClientSecret()
                    {
                        client_id = ConfigurationManager.AppSettings["AuthClientId"].ToString(),
                        client_secret = ConfigurationManager.AppSettings["AuthClientSecret"].ToString(),
                        audience = restApiUrl,
                        grant_type = "client_credentials"
                    };
                    string authToken = AuthTokenProvider.GetAuthToken(authServerUri, secret);
                    log.InfoFormat("DataService.Proxy - accessed authToken {0}", authToken);
                    proxy = new RestApiClient(restApiUrl, authToken);
                }
                return proxy;
            }
        }
        public static void CreateEvent(EventTypes eventType, string desc, int deviceId)
        {           
            Event e = new Event { EventType = (int)eventType, CreatedAt = DateTime.Now, EventValue = desc, DeviceId = deviceId };
            proxy.PostEvent(e);            
        }
    }
}
