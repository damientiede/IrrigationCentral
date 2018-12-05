using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.IO.Solenoids;
using DeviceController.IO.Analogs;
using DeviceController.IO.Alarms;
using DeviceController.IO.Spis;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;
using log4net;

namespace DeviceController.Services
{
    
    public class HardwareService
    {
        ILog log;       
        GpioConnection gpio;
        IGpioConnectionDriver gpioDriver;

        public List<ISolenoid> Solenoids;
        public List<IAlarm> Alarms;
        public List<ISpi> Spis;
        public List<IAnalog> Analogs;

        public ISolenoid PumpSolenoid;

        public HardwareService()
        {
            //initialize logging
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");

            //initialize hardware
            gpio = new GpioConnection();
            gpioDriver = new MemoryGpioConnectionDriver();

            Solenoids = new List<ISolenoid>();
            Alarms = new List<IAlarm>();
            Analogs = new List<IAnalog>();
            Spis = new List<ISpi>();
        }
        public void Close()
        {
            gpio.Close();
        }
        public ISpi CreateSpi(Spi s)
        {
            log.DebugFormat("HardwareService.CreateSpi()");
            ConnectorPin spiClock = GetGPIOPin(string.Format("P1Pin{0}", s.Clock));
            ConnectorPin spiCs = GetGPIOPin(string.Format("P1Pin{0}", s.CS));
            ConnectorPin spiMISO = GetGPIOPin(string.Format("P1Pin{0}", s.MISO));
            ConnectorPin spiMOSI = GetGPIOPin(string.Format("P1Pin{0}", s.MOSI));
           
            SpiDevice spi = new SpiDevice(s.Id, s.Name, spiClock, spiCs, spiMISO, spiMOSI, gpioDriver);
            Spis.Add(spi);
            return spi;
        }
        public ISolenoid CreateSolenoid(Solenoid s)
        {
            log.DebugFormat("HardwareService.CreateSolenoid()");
            ISolenoid sol;
            switch (s.HardwareType)
            {
                case "GPIO":
                    log.DebugFormat("{0}", s.Address);
                    ConnectorPin pin = GetGPIOPin(s.Address);
                    log.DebugFormat("Got pin {0}", pin.ToString());
                    sol = new GPIOSolenoid(pin, s.Name, gpio);
                    break;
                case "Distributed":
                    //return new DistributedSolenoid(s.Name, s.Address);
                    sol = new BEM106EthernetSolenoid(s.Name, s.Address);
                    break;
                case "SPI":
                    sol = new SPISolenoid(s.Name, s.Address);
                    break;
                default:
                    throw new Exception("Unknown Solenoid type");                    
            }
            Solenoids.Add(sol);
            return sol;
        }
        public IAlarm CreateAlarm(Alarm a)
        {
            log.DebugFormat("HardwareService.CreateAlarm() Address:{0}", a.Address);
            IAlarm alarm;
            switch (a.HardwareType)
            {
                case HardwareTypes.GPIO:
                    ConnectorPin pin = GetGPIOPin(a.Address);
                    alarm = new GPIOAlarm(pin, a.Name, gpio);
                    break;
                case HardwareTypes.Distributed:
                    alarm = new DistributedAlarm(a.Id, a.Name, a.Address);
                    break;
                case HardwareTypes.SPI:
                    return new SPIAlarm(a.Id, a.Name, a.Address);
                    break;
                default:
                    throw new Exception("Unknown Alarm type");
            }
            Alarms.Add(alarm);
            return alarm;
        }
        public IAnalog CreateAnalog(Analog a)
        {
            log.DebugFormat("HardwareService.CreateAnalog() {0}", a.Name);
            //Address property will be SPI:CHANNEL, eg 0:1
            //The following code parses out the address to get SPI and CHANNEL
            string[] parts = a.Address.Split(':');
            int spiId = Convert.ToInt32(parts[0]);
            string channel = parts[1];
            if (spiId > Spis.Count - 1)
            {
                throw new Exception(string.Format("Configuration error: unknown SPI Id {0}", spiId));
            }

            ConnectorPin spiClock = GetGPIOPin(string.Format("P1Pin{0}", 23));
            ConnectorPin spiCs = GetGPIOPin(string.Format("P1Pin{0}", 24));
            ConnectorPin spiMISO = GetGPIOPin(string.Format("P1Pin{0}", 21));
            ConnectorPin spiMOSI = GetGPIOPin(string.Format("P1Pin{0}", 19));
            SpiDevice spi = new SpiDevice(spiClock, spiCs, spiMISO, spiMOSI, gpioDriver);
          
            if (spi == null)
            {
                throw new Exception(string.Format("Configuration error: unknown SPI Id {0}", spiId));
            }
            //log.DebugFormat("CreateAnalog(): SPI:{0} Channel:{1}", spiId, channel);
            //log.DebugFormat("Spi {0}", Spis[0].Data.Name);
            log.DebugFormat("Analog name {0}", a.Name);

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
                    throw new Exception(string.Format("Configuration error: unknown analog input channel {0}", channel));
            }


            //ElectricPotential referenceVoltage = ElectricPotential.FromVolts(3.3);
            //var driver = new MemoryGpioConnectionDriver(); //GpioConnectionSettings.DefaultDriver;

            //Mcp3008SpiConnection _spi = new Mcp3008SpiConnection(
            //    driver.Out(GetGPIOPin("P1Pin23")),
            //    driver.Out(GetGPIOPin("P1Pin24")),
            //    driver.In(GetGPIOPin("P1Pin21")),
            //    driver.Out(GetGPIOPin("P1Pin19")));
            //IInputAnalogPin inputPin = spi.Connection.In(Mcp3008Channel.Channel0);

            //var sample = referenceVoltage * (double)pin.Read().Relative;
            //log.DebugFormat("CreateAnalog() sample: {0} mV", sample.Millivolts);

            SPIAnalog ana = new SPIAnalog(pin, a.Name, a.Multiplier, a.Units);
            ana.Sample();
            log.DebugFormat("CreateAnalog() sample: {0} mV", ana.Value);
            //ana.Value;

            return ana;
        }
        public void ReadAnalogs()
        {
            foreach (IAnalog analog in Analogs)
            {
                analog.Sample();
                //analog.Data.RawValue = analog.Hardware.RawValue;
                //analog.Data.Value = analog.Hardware.Value;
                //dataServer.PutAnalog(analog.Data);
                //log.InfoFormat("Analog {0} Raw:{1} Value:{2}", analog.Data.Name, analog.Hardware.RawValue, analog.Hardware.Value);
            }
        }
        public void SolenoidsOff()
        {
            log.Debug("SolenoidsOff()");
            foreach (ISolenoid s in Solenoids)
            {
                s.Off();
            }
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
