using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.IO.Solenoids;
using DeviceController.IO.Alarms;
using DeviceController.IO.Analogs;
using DeviceController.IO.Spis;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;
using log4net;

namespace DeviceController.IO
{
    public class IOFactory
    {
        ILog log;
        private DataServerWebClient dataServer;
        private GpioConnection gpio;
        private IGpioConnectionDriver driver;

        public IOFactory(DataServerWebClient d, GpioConnection g)
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");
            dataServer = d;
            gpio = g;
            driver = GpioConnectionSettings.DefaultDriver;
        }
        public ISolenoid CreateSolenoid(Solenoid s)
        {
            switch(s.HardwareType)
            {
                case "GPIO":
                    GPIOSolenoid sol = new GPIOSolenoid(s, dataServer, gpio);
                    return sol;                    
                case "Distributed":
                    return new DistributedSolenoid(s, dataServer);                    
                case "SPI":
                    return new SPISolenoid(s, dataServer);                  
                default:
                    break;
            }
            throw new Exception("Unknown Solenoid type");
        }
        public IAlarm CreateAlarm(Alarm a)
        {
            switch (a.HardwareType)
            {
                case HardwareTypes.GPIO:
                    return new GPIOAlarm(a, dataServer, gpio);
                case HardwareTypes.Distributed:
                    return new DistributedAlarm(a, dataServer);
                case HardwareTypes.SPI:
                    return new SPIAlarm(a, dataServer);
                default:
                    break;
            }
            throw new Exception("Unknown Alarm type");
        }
        public ISpi CreateSpi(Spi s)
        {
            return new SpiDevice(s, driver);
        }

        public IAnalog CreateAnalog(Analog a, List<SpiDevice> spis)
        {
            log.DebugFormat("CreateAnalog(): Analog address: {0}", a.Address);
            
            string[] parts = a.Address.Split(':');
            string spiId = parts[0];
            string channel = parts[1];
            SpiDevice spi = null;
            switch(spiId)
            {
                case "SPI0":
                    spi = spis[0];
                    break;
                case "SPI1":
                    spi = spis[1];
                    break;               
            }
            if (spi == null)
            {
                throw new Exception(string.Format("Configuration error: unknown SPI Id {0}", spiId));
            }
            log.DebugFormat("IOFactory.CreateAnalog(): {0} {1}", spiId, channel);
            IInputAnalogPin pin;
            switch (channel)
            {
                case "0":
                    pin = spi.Connection.In(Mcp3008Channel.Channel0);
                    break;
                case "1":
                    pin = spi.Connection.In(Mcp3008Channel.Channel1);
                    break;
                case "2":
                    pin = spi.Connection.In(Mcp3008Channel.Channel2);
                    break;
                case "3":
                    pin = spi.Connection.In(Mcp3008Channel.Channel3);
                    break;
                case "4":
                    pin = spi.Connection.In(Mcp3008Channel.Channel4);
                    break;
                case "5":
                    pin = spi.Connection.In(Mcp3008Channel.Channel5);
                    break;
                case "6":
                    pin = spi.Connection.In(Mcp3008Channel.Channel6);
                    break;
                case "7":
                    pin = spi.Connection.In(Mcp3008Channel.Channel7);
                    break;
                default:
                    throw new Exception(string.Format("Configuration error: unknown analog input channel {0}",channel));
            }            
            return new SPIAnalog(a, pin);
        }
        public static ConnectorPin GetGPIOPin(string _pin)
        {            
            switch (_pin)
            {
                case "P1Pin03":
                    return ConnectorPin.P1Pin03;                    
                case "P1Pin05":
                    return ConnectorPin.P1Pin05;                    
                case "P1Pin07":
                    return ConnectorPin.P1Pin07;                    
                case "P1Pin08":
                    return ConnectorPin.P1Pin08;                    
                case "P1Pin10":
                    return ConnectorPin.P1Pin10;                    
                case "P1Pin11":
                    return ConnectorPin.P1Pin11;                    
                case "P1Pin12":
                    return ConnectorPin.P1Pin12;                    
                case "P1Pin13":
                    return ConnectorPin.P1Pin13;                   
                case "P1Pin15":
                    return ConnectorPin.P1Pin15;                    
                case "P1Pin16":
                    return ConnectorPin.P1Pin16;                    
                case "P1Pin18":
                    return ConnectorPin.P1Pin18;                    
                case "P1Pin19":
                    return ConnectorPin.P1Pin19;                    
                case "P1Pin21":
                    return ConnectorPin.P1Pin21;                    
                case "P1Pin22":
                    return ConnectorPin.P1Pin22;                    
                case "P1Pin23":
                    return ConnectorPin.P1Pin23;                    
                case "P1Pin24":
                    return ConnectorPin.P1Pin24;                    
                case "P1Pin26":
                    return ConnectorPin.P1Pin26;                    
                case "P1Pin27":
                    return ConnectorPin.P1Pin27;                    
                case "P1Pin28":
                    return ConnectorPin.P1Pin28;                    
                case "P1Pin29":
                    return ConnectorPin.P1Pin29;                    
                case "P1Pin3":
                    return ConnectorPin.P1Pin3;                    
                case "P1Pin31":
                    return ConnectorPin.P1Pin31;                    
                case "P1Pin32":
                    return ConnectorPin.P1Pin32;                    
                case "P1Pin33":
                    return ConnectorPin.P1Pin33;                    
                case "P1Pin35":
                    return ConnectorPin.P1Pin35;                    
                case "P1Pin36":
                    return ConnectorPin.P1Pin36;                    
                case "P1Pin37":
                    return ConnectorPin.P1Pin37;                    
                case "P1Pin38":
                    return ConnectorPin.P1Pin38;                    
                case "P1Pin40":
                    return ConnectorPin.P1Pin40;                    
                case "P1Pin5":
                    return ConnectorPin.P1Pin5;                    
                case "P1Pin7":
                    return ConnectorPin.P1Pin7;                    
                case "P1Pin8":
                    return ConnectorPin.P1Pin8;                   
                default:
                    throw new Exception(string.Format("Invalid GPIO pin configuration '{0}'", _pin));
            }           
        }
    }
}
