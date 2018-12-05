using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raspberry.IO.GeneralPurpose;
using log4net;

namespace DeviceController.IO.Solenoids
{
    public class GPIOSolenoid : ISolenoid
    {
        ILog log;
        public int Id { get; set; }
        public string Name { get; set; }
        //public string Description { get; }
        public string Address { get; }
        public bool State { get; set; }        
        
        private ConnectorPin pin;
        private PinConfiguration pinConfig;       
                        
        public GPIOSolenoid(int id, string name, string address)
        {            
            log = LogManager.GetLogger("Device");
            Id = id;
            Name = name;
            Address = address;

            pin = GPIOService.GetGPIOPin(Address);
            
            pinConfig = pin.Output().Name(name);
            GPIOService.Gpio.Add(pinConfig);
        }
        public void On()
        {
            if (!State)
            {
                GPIOService.Gpio.Toggle(pinConfig);
                State = true;
                log.DebugFormat("Solenoid: {0} On", Name);                
            }            
        }
        public void Off()
        {
            if (State)
            {
                GPIOService.Gpio.Toggle(pinConfig);
                State = false;
                log.DebugFormat("Solenoid: {0} Off", Name);                
            }            
        }        
    }
}
