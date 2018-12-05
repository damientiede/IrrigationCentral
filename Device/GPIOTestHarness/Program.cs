using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;
using UnitsNet;
using log4net;

namespace GPIOTestHarness
{
    class Program
    {
        const ConnectorPin adcClock = ConnectorPin.P1Pin23;
        const ConnectorPin adcMiso = ConnectorPin.P1Pin21;
        const ConnectorPin adcMosi = ConnectorPin.P1Pin19;
        const ConnectorPin adcCs = ConnectorPin.P1Pin24;

        static void Main(string[] args)
        {
            log4net.Config.XmlConfigurator.Configure();
            ILog log = LogManager.GetLogger("GPIO");
            log.Debug("Start");

            PinConfiguration output = ConnectorPin.P1Pin36.Output().Name("Output1");
            PinConfiguration[] outputs = new PinConfiguration[]
            {
                output
            };

            GpioConnection gpio = new GpioConnection(outputs);
            //gpio.Open();

            ElectricPotential referenceVoltage = ElectricPotential.FromVolts(3.3);

            var driver = new MemoryGpioConnectionDriver(); //GpioConnectionSettings.DefaultDriver;

            Mcp3008SpiConnection spi = new Mcp3008SpiConnection(
                driver.Out(adcClock),
                driver.Out(adcCs),
                driver.In(adcMiso),
                driver.Out(adcMosi));

            IInputAnalogPin inputPin = spi.In(Mcp3008Channel.Channel0);

            gpio.Open();
            ElectricPotential volts = ElectricPotential.FromVolts(0);

            while (!Console.KeyAvailable)
            {
                var v = referenceVoltage * (double)inputPin.Read().Relative;
                Console.WriteLine("{0} mV", v.Millivolts);
                if ((Math.Abs(v.Millivolts - volts.Millivolts) > 100))
                {
                    volts = ElectricPotential.FromMillivolts(v.Millivolts);
                    Console.WriteLine("Voltage ch0: {0}", volts.Millivolts.ToString());
                }
                gpio.Toggle("Output1");
                Thread.Sleep(2000);
            }
            gpio.Close();

            //bool bShutdown = false;
            //while(!bShutdown)
            //{

            //    gpio.Toggle(output);
            //    log.Debug("Toggle output");

            //    Thread.Sleep(5000);

            //}
        }
    }
}
