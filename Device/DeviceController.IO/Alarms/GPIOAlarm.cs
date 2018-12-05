using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raspberry.IO.GeneralPurpose;
using DeviceController.Data;
using log4net;

namespace DeviceController.IO.Alarms
{
    public class GPIOAlarm : IAlarm
    {        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public bool State { get; set; }       
        public event AlarmStatusChangedEventHandler StatusChanged;                     
        private ConnectorPin pin;
        private PinConfiguration pinConfig;        
        public GPIOAlarm(int id, string name, string address)
        {
            Id = id;
            Name = name;
            Address = address;
            pin = GPIOService.GetGPIOPin(Address);          
            pinConfig = pin.Input().Name(Name).OnStatusChanged(b =>
            {
                State = b ? true : false;
                //Console.WriteLine("Alarm {0} {1}", Name, b ? "on" : "off");
                AlarmStatusChangedEventArgs e = new AlarmStatusChangedEventArgs();
                e.Value = b;
                OnStatusChanged(e);
            });
            Id = id;
            GPIOService.Gpio.Add(pinConfig);                      
        }

        protected virtual void OnStatusChanged(AlarmStatusChangedEventArgs e)
        {
            //AlarmStatusChangedEventHandler handler = StatusChanged;
            if (StatusChanged != null)
            {
                StatusChanged(this, e);
            }
        }        
    }
}
