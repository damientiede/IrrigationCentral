using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace DeviceController.Data
{
    public class DataService
    {
        private static DataServerWebClient proxy;

        public static DataServerWebClient Proxy
        {
            get
            {
                if (proxy == null)
                {
                    string serverUri = ConfigurationManager.AppSettings["server"].ToString();
                    proxy = new DataServerWebClient(serverUri);
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
