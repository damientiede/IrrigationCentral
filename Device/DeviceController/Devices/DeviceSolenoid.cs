using System;
using DeviceController.IO;
using DeviceController.IO.Solenoids;
using DeviceController.Data;
using Raspberry.IO.GeneralPurpose;
using log4net;

namespace DeviceController.Devices
{
    public class DeviceSolenoid
    {
        ILog log = LogManager.GetLogger("Device");
        Solenoid dataSolenoid;
        ISolenoid hardwareSolenoid;
        public int Id
        {
            get { return dataSolenoid.Id; }
        }
        public string Name
        {
            get { return dataSolenoid.Name; }
        }
        public bool RequiresPump
        {
            get { return dataSolenoid.RequiresPump; }
        }
        public DeviceSolenoid(Solenoid s)
        {                     
            dataSolenoid = s;
            log.DebugFormat("DeviceSolenoid() {0}", s.Name);
            switch (s.HardwareType)
            {
                case "GPIO":
                    log.DebugFormat("{0}", s.Address);                    
                    hardwareSolenoid = new GPIOSolenoid(dataSolenoid.Id, dataSolenoid.Name, dataSolenoid.Address);
                    break;
                case "Distributed":
                    //return new DistributedSolenoid(s.Name, s.Address);
                    hardwareSolenoid = new BEM106EthernetSolenoid(dataSolenoid.Id, dataSolenoid.Name, dataSolenoid.Address);
                    break;
                case "SPI":
                    hardwareSolenoid = new SPISolenoid(dataSolenoid.Id, dataSolenoid.Name, dataSolenoid.Address);
                    break;
                default:
                    throw new Exception("Unknown Solenoid type");
            }                             
        }
        public void On()
        {
            hardwareSolenoid.On();
            dataSolenoid.Value = 1;
            DataService.Proxy.PutSolenoid(dataSolenoid);
            DataService.CreateEvent(EventTypes.IO, string.Format("Solenoid {0} On",dataSolenoid.Name), dataSolenoid.DeviceId);
        }
        public void Off()
        {
            hardwareSolenoid.Off();
            dataSolenoid.Value = 0;
            DataService.Proxy.PutSolenoid(dataSolenoid);
            DataService.CreateEvent(EventTypes.IO, string.Format("Solenoid {0} Off", dataSolenoid.Name), dataSolenoid.DeviceId);
        }
    }
}
