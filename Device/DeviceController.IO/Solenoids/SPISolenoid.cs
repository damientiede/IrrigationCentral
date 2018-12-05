using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;
using log4net;

namespace DeviceController.IO.Solenoids
{
    public class SPISolenoid: ISolenoid
    {
        ILog log;
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public bool State { get; set; }

        public SPISolenoid(int id, string name, string address)
        {            
            log = LogManager.GetLogger("Device");
            Id = id;
            Name = name;
            Address = address;

        }
        public void On()
        {
            if (!State)
            {
                //gpio.Toggle(pinConfig);
                State = true;
                log.DebugFormat("Solenoid: {0} On", Name);
            }
        }
        public void Off()
        {
            if (State)
            {
                //gpio.Toggle(pinConfig);
                State = false;
                log.DebugFormat("Solenoid: {0} Off", Name);
            }
        }
    }
}
