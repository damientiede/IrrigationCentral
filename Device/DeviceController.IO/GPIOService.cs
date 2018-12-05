using System;

using Raspberry.IO.GeneralPurpose;

namespace DeviceController.IO
{
    public class GPIOService
    {
        private static GpioConnection gpio;
        private static IGpioConnectionDriver gpioDriver;
        private GPIOService() { }
        public static GpioConnection Gpio
        {
            get {
                if (gpio == null)
                {
                    gpio = new GpioConnection();
                }
                return gpio;
                    
            }
        }    
        public static IGpioConnectionDriver GpioDriver
        {
            get
            {
                if (gpioDriver == null)
                {
                    gpioDriver = gpioDriver = new MemoryGpioConnectionDriver();
                }
                return gpioDriver;
            }
        }
        public static void CloseGpio()
        {
            if (gpio != null)
            {
                gpio.Close();
                gpio = null;
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
