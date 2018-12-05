using System;
using DeviceController.IO;
using DeviceController.IO.Analogs;
using DeviceController.Data;
using log4net;

namespace DeviceController.Devices
{
    public class DeviceAnalog
    {
        ILog log = LogManager.GetLogger("Device");
        Analog dataAnalog;
        IAnalog hardwareAnalog;
        public DeviceAnalog(Analog a)
        {
            log.DebugFormat("DeviceAnalog()");
            dataAnalog = a;
            hardwareAnalog = new SPIAnalog(a.Id, a.Name, a.Multiplier, a.Units, a.Address);
            log.DebugFormat("DeviceAnalog() {0}", a.Name);              
        }
        public double Sample()
        {            
            double val = hardwareAnalog.Sample();
            dataAnalog.Value = hardwareAnalog.Value;
            dataAnalog.RawValue = hardwareAnalog.RawValue;
            DataService.Proxy.PutAnalog(dataAnalog);
            return val;
        }        

    }
}
