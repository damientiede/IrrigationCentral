using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using log4net;

namespace DeviceController.IO.Solenoids
{
    public class BEM106EthernetSolenoid:ISolenoid
    {
        ILog log;
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public bool State { get; set; }

        public BEM106EthernetSolenoid(int id, string name, string address)
        {            
            log = LogManager.GetLogger("Device");
            Name = name;
            Address = address;
            Id = id;
        }
        protected void Send(string value)
        {
            string response = String.Empty;
            string url = string.Format("{0}={1}", Address, value);
            log.DebugFormat("Send() : {0}", url);
            using (WebClient client = new WebClient())
            {
                response = client.DownloadString(url);
            }
            log.Debug(response);
        }
        public void On()
        {
            if (!State)
            {
                Send("1");
                State = true;
                log.DebugFormat("Solenoid: {0} On", Name);
            }
        }
        public void Off()
        {
            if (State)
            {
                Send("0");
                State = false;
                log.DebugFormat("Solenoid: {0} Off", Name);
            }
        }
    }
}
