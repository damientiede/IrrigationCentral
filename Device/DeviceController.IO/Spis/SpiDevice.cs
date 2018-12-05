using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;

namespace DeviceController.IO.Spis
{    
    public class SpiDevice:ISpi
    {        
        public int Id { get; set; }
        public string Name { get; set; }
        public ConnectorPin Clock { get; set; }
        public ConnectorPin CS { get; set; }
        public ConnectorPin MISO { get; set; }
        public ConnectorPin MOSI { get; set; }        
        public Mcp3008SpiConnection Connection {  get { return this.spiConnection; } }
        private Mcp3008SpiConnection spiConnection;
        private IGpioConnectionDriver spiDriver;

        public SpiDevice(
            int id,
            string name,
            ConnectorPin clock,
            ConnectorPin cs,
            ConnectorPin miso,
            ConnectorPin mosi)            
        {
            Id = id;
            Name = name;
            Clock = clock;
            CS = cs;
            MISO = miso;
            MOSI = mosi;
            spiDriver = GPIOService.GpioDriver;
                 
            spiConnection = new Mcp3008SpiConnection(
                spiDriver.Out(Clock),
                spiDriver.Out(CS),
                spiDriver.In(MISO),
                spiDriver.Out(MOSI));

        }
        public IInputAnalogPin GetChannel(Mcp3008Channel ch)
        { 
            return spiConnection.In(ch);
        }
        //public string Report()
        //{
        //    return string.Format("SpiDevice Id:{0} Name:{1} Clock:{2} CS:{3} MISO:{4} MOSI:{5}",
        //        spi.Id, spi.Name, spi.Clock, spi.CS, spi.MISO, spi.MOSI);
        //}
    }    
}
