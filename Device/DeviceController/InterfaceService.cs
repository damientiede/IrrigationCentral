using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.IO;
using DeviceController.IO.Solenoids;
using DeviceController.IO.Analogs;
using DeviceController.IO.Alarms;
using DeviceController.IO.Spis;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;
using UnitsNet;
using log4net;

namespace DeviceController
{
    public class InterfaceService
    {
        ILog log;
        //public IOFactory ioFactory;
        GpioConnection gpio;
        IGpioConnectionDriver gpioDriver;
        public Device device;
        protected DataServerWebClient dataServer;

        public List<SolenoidTuple> Solenoids;
        public List<AlarmTuple> Alarms;
        public List<AnalogTuple> Analogs;
        public List<SpiTuple> Spis;
        public List<Command> Commands;
        public List<CommandType> CommandTypes;
        public List<Schedule> Schedules;

        public ISolenoid PumpSolenoid;
        
        public InterfaceService(string url)
        {
            //initialize logging
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");

            //initialize hardware
            gpio = new GpioConnection();            
            gpioDriver = new MemoryGpioConnectionDriver(); //GpioConnectionSettings.DefaultDriver;

            log.DebugFormat("InterfaceManager.Ctor()");

            //initialize data server
            dataServer = new DataServerWebClient(url);

            //initialize hardware collections
            Spis = new List<SpiTuple>();
            Solenoids = new List<SolenoidTuple>();
            Alarms = new List<AlarmTuple>();
            Analogs = new List<AnalogTuple>();
            Commands = new List<Command>();
            CommandTypes = new List<CommandType>();
            Schedules = new List<Schedule>();            
        }
        public Device Register(string mac)
        {
            if (device == null)
            {
                device = dataServer.Register(mac);
            }
            return device;
        }
        public void Close()
        {
            gpio.Close();
        }
        public void LoadConfig()
        {
            try
            {
                //clear any existing pins
                gpio.Clear();

                //get device config            
                LoadSpis();
                LoadSolenoids();
                LoadAlarms();
                LoadAnalogs();
                LoadSchedules();
                CreateEvent(EventTypes.Application, "DeviceController configuration complete");
                log.InfoFormat("InterfaceManager.LoadConfig(): Configuration complete.");
            }
            catch (Exception ex)
            {
                log.ErrorFormat("LoadConfig(): {0}", ex.Message);
            }
        }
        protected void LoadSpis()
        {
            log.InfoFormat("LoadSpis()");
            Spis.Clear();
            List<Spi> spis = dataServer.GetSpis(device.Id);
            foreach (Spi s in spis)
            {                
                log.DebugFormat("LoadSpis(): Id:{0} name:{1} Clock:{2} CS:{3} MISO:{4} MOSI:{5} \r\n", s.Id, s.Name, s.Clock, s.CS, s.MISO, s.MOSI);
                Spis.Add(new SpiTuple { Data = s, Hardware = null });
                //log.Info(spiDevice.Report());
            }
        }
        protected void LoadSolenoids()
        {
            log.InfoFormat("LoadSolenoids()");
            Solenoids.Clear();
            List<Solenoid> solenoids = dataServer.GetSolenoids(device.Id);
            if (solenoids != null)
            {
                foreach (Solenoid s in solenoids)
                {
                    log.DebugFormat("{0}  {1} {2}", s.Id, s.Description, s.HardwareType.ToString());
                    ISolenoid sol = CreateSolenoid(s);                    
                    Solenoids.Add(new SolenoidTuple { Data = s, Hardware = sol });

                    if (s.Id == device.PumpSolenoid)
                    {
                        PumpSolenoid = sol;
                    }
                }
            }
            foreach (SolenoidTuple solenoid in Solenoids)
            {
                log.Info(solenoid.Report());
            }
            log.DebugFormat("{0} Solenoids configured", Solenoids.Count());
        }
        protected void LoadAlarms()
        {
            log.InfoFormat("LoadAlarms()");
            Alarms.Clear();
            List<Alarm> alarms = dataServer.GetAlarms(device.Id);
            foreach (Alarm a in alarms)
            {
                IAlarm alarm = CreateAlarm(a);
                log.InfoFormat("Registering StatusChanged on {0}", alarm.Name);
                alarm.StatusChanged += Alarm_StatusChanged;
                Alarms.Add(new AlarmTuple { Data = a, Hardware = alarm });
                //log.Info(alarm.Report());
            }
            log.DebugFormat("{0} Alarms configured", Alarms.Count());
        }
        private void Alarm_StatusChanged(object sender, AlarmStatusChangedEventArgs e)
        {
            IAlarm alarm = sender as IAlarm;
            string s = string.Format("Alarm '{0}' {1}", alarm.Name, e.Value ? "on" : "off");
            log.Debug(s);
            CreateEvent(EventTypes.IO, s);
        }
        protected void LoadAnalogs()
        {
            log.InfoFormat("LoadAnalogs()");
            Analogs.Clear();
            log.Debug("Debug 1");
            List<Analog> analogs = dataServer.GetAnalogs(device.Id);
            foreach (Analog a in analogs)
            {                                                
                IAnalog analog = CreateAnalog(a);
                log.InfoFormat("Registering ValueChanged on {0}", a.Name);
                analog.ValueChanged += Analog_ValueChanged;
                Analogs.Add(new AnalogTuple { Data = a, Hardware = analog });
                //log.Info(analog.Report());
            }
            log.DebugFormat("{0} Analogs configured", Analogs.Count());
        }

        private void Analog_ValueChanged(object sender, AnalogValueChangedEventArgs e)
        {
            IAnalog analog = sender as IAnalog;
            foreach (AnalogTuple at in Analogs)
            {
                if (at.Hardware.Name == analog.Name)
                {
                    at.Data.RawValue = analog.RawValue;
                    at.Data.Value = analog.Value;                    
                    dataServer.PutAnalog(at.Data);
                }
            }
            string s = string.Format("Analog '{0}' {1} {2}", analog.Name, e.Value, analog.Units);
            log.Debug(s);
            CreateEvent(EventTypes.IO, s);
            //dataServer.PutAnalog(analog.Data);         
        }

        public void LoadSchedules()
        {
            log.InfoFormat("LoadSchedules()");
            Schedules.Clear();
            Schedules = dataServer.GetSchedules(device.Id);
            log.DebugFormat("{0} Schedules configured", Schedules.Count());
        }

        public void CreateEvent(EventTypes eventType, string desc)
        {
            try
            {
                Event e = new Event { EventType = (int)eventType, CreatedAt = DateTime.Now, EventValue = desc, DeviceId = device.Id };
                dataServer.PostEvent(e);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("CreateEvent(): {0}", ex.Message);
            }
        }
        public ISolenoid CreateSolenoid(Solenoid s)
        {
            log.DebugFormat("InterfaceService.CreateSolenoid()");
            switch (s.HardwareType)
            {
                case "GPIO":
                    log.DebugFormat("{0}", s.Address);
                    ConnectorPin pin = GetGPIOPin(s.Address);
                    log.DebugFormat("Got pin {0}", pin.ToString());
                    GPIOSolenoid sol = new GPIOSolenoid(pin, s.Name, gpio);
                    return sol;
                case "Distributed":
                    //return new DistributedSolenoid(s.Name, s.Address);
                    return new BEM106EthernetSolenoid(s.Name, s.Address);
                case "SPI":
                    return new SPISolenoid(s.Name, s.Address);
                default:
                    break;
            }
            throw new Exception("Unknown Solenoid type");
        }
        public IAlarm CreateAlarm(Alarm a)
        {
            log.DebugFormat("InterfaceService.CreateAlarm() Address:{0}", a.Address);
            switch (a.HardwareType)
            {
                case HardwareTypes.GPIO:
                    ConnectorPin pin = GetGPIOPin(a.Address);
                    return new GPIOAlarm(pin, a.Name, gpio);
                case HardwareTypes.Distributed:
                    return new DistributedAlarm(a, dataServer);
                case HardwareTypes.SPI:
                    return new SPIAlarm(a, dataServer);
                default:
                    break;
            }
            throw new Exception("Unknown Alarm type");
        }       

        public IAnalog CreateAnalog(Analog a)
        {
            log.DebugFormat("InterfaceService.CreateAnalog() {0}", a.Name);
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

            Spis[spiId].Hardware = spi;

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
        public void SolenoidsOff()
        {
            log.Debug("SolenoidsOff()");
            foreach (SolenoidTuple s in Solenoids)
            {
                s.Hardware.Off();
                s.Data.Value = 0;
                dataServer.PutSolenoid(s.Data);
            }
        }
        public void SwitchSolenoid(int solenoidId, bool value)
        {            
            foreach (SolenoidTuple s in Solenoids)
            {
                if (s.Data.Id == solenoidId)
                {
                    if (value)
                    {
                        s.Hardware.On();
                        s.Data.Value = 1;
                        dataServer.PutSolenoid(s.Data);
                        //ActiveSolenoid = s;
                        if (s.Data.RequiresPump)
                        {
                            if (PumpSolenoid != null) {
                                PumpSolenoid.On();

                            }
                        }
                    }
                    else
                    {
                        s.Hardware.Off();
                        s.Data.Value = 0;
                        dataServer.PutSolenoid(s.Data);
                    }
                }
                //else
                //{
                //    s.Hardware.Off();
                //    s.Data.Value = 0;
                //    dataServer.PutSolenoid(s.Data);
                //}
            }
        }
        public void PutDevice(Device d)
        {
            dataServer.PutDevice(d);
        }
        public void PutCommand(Command c)
        {
            dataServer.PutCommand(c);
        }
        public ActiveIrrigationProgram CreateIrrigationProgram(string name, int duration, int solenoidId)
        {
            log.DebugFormat("InterfaceService.CreateIrrigationProgram() Name:{0} SolenoidId:{1}", name, solenoidId);
            SolenoidTuple st = null;
            foreach (SolenoidTuple s in Solenoids)
            {
                if (s.Data.Id == solenoidId)
                {
                    st = s;
                    break;
                }
            }            
            if (st == null)
            {
                throw new Exception(string.Format("Unknown solenoidId '{0}'", solenoidId));
            }
            ActiveIrrigationProgram activeProgram = new ActiveIrrigationProgram(name, duration, solenoidId, st.Data.Name, device.Id);
            try
            {
                activeProgram.Id = dataServer.PostIrrigationProgram(activeProgram);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("CreateIrrigationProgram(): {0}", ex.Message);
            }
            return activeProgram;
        }
        public void UpdateIrrigationProgram(IrrigationProgram p)
        {
            try
            {
                dataServer.PutIrrigationProgram(p);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("UpdateIrrigationProgram(): {0}", ex.Message);
            }
        }
        public List<Command> GetCommands()
        {
            List<Command> commands = dataServer.GetCommands(device.Id);
            return commands;
        }
        public void ReadAnalogs()
        {

            foreach (AnalogTuple analog in Analogs)                
            {
                analog.Hardware.Sample();
                analog.Data.RawValue = analog.Hardware.RawValue;
                analog.Data.Value = analog.Hardware.Value;
                dataServer.PutAnalog(analog.Data);
                //log.InfoFormat("Analog {0} Raw:{1} Value:{2}", analog.Data.Name, analog.Hardware.RawValue, analog.Hardware.Value);
            }
        }
        public ISolenoid GetSolenoidById(int solenoidId)
        {
            foreach (SolenoidTuple solenoid in Solenoids)
            {
                if (solenoid.Data.Id == solenoidId)
                {
                    return solenoid.Hardware;
                }
            }
            return null;
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
        public class SolenoidTuple
        {
            public Solenoid Data;
            public ISolenoid Hardware;
            public string Report()
            {
                return string.Format("Solenoid Id:{0} Name:{1} Type:{2} Description:{3} Address:{4} State:{5}",
                    Data.Id, Data.Name, Data.HardwareType, Data.Description, Data.Address, Hardware.State);
            }
        }
        public class AlarmTuple
        {
            public Alarm Data;
            public IAlarm Hardware;
        }
        public class AnalogTuple
        {
            public Analog Data;
            public IAnalog Hardware;
        }
        public class SpiTuple
        {
            public Spi Data;
            public SpiDevice Hardware;
        }
    }
}
