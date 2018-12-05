using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.IO.Spis;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;
using UnitsNet;
using log4net;

namespace DeviceController.IO.Analogs
{
    public class SPIAnalog : IAnalog
    {
        ILog log = LogManager.GetLogger("Device");
        public int Id { get; set; }      
        public string Name { get; set; }
        public double RawValue { get; set; }
        public double Value { get; set; } 
        public double Multiplier { get; set; }
        public string Units { get; set; }
        public string Address { get; set; }       
        public double Threshold { get; set; }      
        public event AnalogValueChangedEventHandler ValueChanged;

        private IInputAnalogPin spiInput;
        private ElectricPotential sample = ElectricPotential.FromVolts(0);
        private ElectricPotential prevSample = ElectricPotential.FromVolts(0);
        private ElectricPotential referenceVoltage = ElectricPotential.FromVolts(3.3);
        
        public SPIAnalog(int id, string name, double multiplier, string units, string address)
        {
            Id = id;
            Name = name;
            Multiplier = multiplier;
            Units = units;
            Address = address;
            Threshold = 100.0;
            log.DebugFormat("SPIAnalog() {0}", Name);

            //Address property will be SPI:CHANNEL, eg 0:1
            //The following code parses out the address to get SPI and CHANNEL
            string[] parts = Address.Split(':');
            int spiId = Convert.ToInt32(parts[0]);
            string channel = parts[1];         

            ConnectorPin spiClock = GPIOService.GetGPIOPin(string.Format("P1Pin{0}", 23));
            ConnectorPin spiCs = GPIOService.GetGPIOPin(string.Format("P1Pin{0}", 24));
            ConnectorPin spiMISO = GPIOService.GetGPIOPin(string.Format("P1Pin{0}", 21));
            ConnectorPin spiMOSI = GPIOService.GetGPIOPin(string.Format("P1Pin{0}", 19));
            SpiDevice spi = new SpiDevice(1,"Redundant",spiClock, spiCs, spiMISO, spiMOSI);

            if (spi == null)
            {
                throw new Exception(string.Format("Configuration error: unknown SPI Id {0}", spiId));
            }                        
            
            switch (channel)
            {
                case "0":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel0);
                    break;
                case "1":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel1);
                    break;
                case "2":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel2);
                    break;
                case "3":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel3);
                    break;
                case "4":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel4);
                    break;
                case "5":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel5);
                    break;
                case "6":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel6);
                    break;
                case "7":
                    spiInput = spi.Connection.In(Mcp3008Channel.Channel7);
                    break;
                default:
                    throw new Exception(string.Format("Configuration error: unknown analog input channel {0}", channel));
            }           
        }
        
        public double Sample()
        {
            //log.DebugFormat("SPIAnalog.Sample() rawValue:{0} mV prevSample:{0} mV",RawValue, prevSample.Millivolts);
            Read();

            RawValue = sample.Millivolts;
            Value = RawValue * Multiplier;

            //log.DebugFormat("SPIAnalog.Sample() rawValue:{0} mV prevSample:{0} mV", RawValue, prevSample.Millivolts);

            //check to see if new reading exceeds threshold
            double delta = Math.Abs(sample.Millivolts - prevSample.Millivolts);
            if (delta > Threshold)
            {
                AnalogValueChangedEventArgs e = new AnalogValueChangedEventArgs();
                e.Value = (decimal)Value;
                OnValueChanged(e);
            }
            
            return Value;
        }
        protected void Read()
        {
            //read data from SPI channel
            prevSample = sample;
            sample = referenceVoltage * (double)spiInput.Read().Relative;
        }
        protected virtual void OnValueChanged(AnalogValueChangedEventArgs e)
        {            
            if (ValueChanged != null)
            {
                ValueChanged(this, e);
            }
        }

        //int Pressure = Convert.ToInt32(v.Millivolts * Multiplier);
        //double diff = Math.Abs(v.Millivolts - volts.Millivolts);
        //if (diff > 250)
        //{
        //    volts = ElectricPotential.FromMillivolts(v.Millivolts);
        //    Console.WriteLine("Pressure: {0}", Pressure);
        //    //CreateEvent(EventType.IOEvent, string.Format("Pressure change {0}", Pressure));
        //    //bUpdateStatus = true;
        //}
        //if ((diff > 150) && !bUpdateStatus)
        //{
        //    volts = ElectricPotential.FromMillivolts(v.Millivolts);
        //    Console.WriteLine("Pressure: {0}", Pressure);
        //    CreateEvent(EventType.IOEvent, string.Format("Pressure change {0}", Pressure));
        //    bUpdateStatus = true;
        //}
    }

}
