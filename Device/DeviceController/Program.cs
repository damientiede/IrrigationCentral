using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace DeviceController
{
    class Program
    {
        static void Main(string[] args)
        {
            log4net.Config.XmlConfigurator.Configure();
            string server = "http://192.168.1.51:8000/api";  //Damos Test server
            if (ConfigurationManager.AppSettings["server"] != null)
            {
                server = ConfigurationManager.AppSettings["server"].ToString();
            }           
            DeviceController d = new DeviceController();            
            d.Run();
        }
    }
}
