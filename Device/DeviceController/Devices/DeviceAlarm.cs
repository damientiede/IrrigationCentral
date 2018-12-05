using System;
using DeviceController.IO;
using DeviceController.IO.Alarms;
using DeviceController.Data;
using log4net;

namespace DeviceController.Devices
{
    public class DeviceAlarm
    {
        ILog log = LogManager.GetLogger("Device");
        Alarm dataAlarm;
        IAlarm hardwareAlarm;
        public bool State
        {
            get
            {
                return hardwareAlarm.State;
            }
        }
        public DeviceAlarm(Alarm a)
        {
            log.DebugFormat("DeviceAnalog() {0}",a.Name);
            dataAlarm = a;
            
            switch (a.HardwareType)
            {
                case HardwareTypes.GPIO:
                    hardwareAlarm = new GPIOAlarm(a.Id, a.Name, a.Address);
                    break;
                case HardwareTypes.Distributed:
                    hardwareAlarm = new DistributedAlarm(a.Id, a.Name, a.Address);
                    break;
                case HardwareTypes.SPI:                    
                    hardwareAlarm = new SPIAlarm(a.Id, a.Name, a.Address);
                    break;
                default:
                    throw new Exception("Unknown Alarm type");
            }
            hardwareAlarm.StatusChanged += HardwareAlarm_StatusChanged;                                            
        }

        private void HardwareAlarm_StatusChanged(object sender, AlarmStatusChangedEventArgs e)
        {
            string s = string.Format("Alarm '{0}' {1}", hardwareAlarm.Name, e.Value ? "on" : "off");
            log.Debug(s);
            DataService.CreateEvent(EventTypes.IO, s, 1);
        }
    }
}
