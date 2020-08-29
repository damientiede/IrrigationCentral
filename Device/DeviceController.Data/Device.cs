using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public enum DeviceMode { Auto, Manual, Diagnostic }
    public enum DeviceState { Standby, Irrigating, Fault, Paused }
    public class Device
    {
        public int Id;
        public string Name;
        public string Description;
        public DeviceState State;
        public DeviceMode Mode;
        public string Status;
        public double Pressure;
        public double Flowrate;
        public int? ActiveProgramId;
        public int? IrrigationActionId;
        public IrrigationAction IrrigationAction;
        public string Inputs;
        public string Outputs;
        public string SoftwareVersion;        
        public string DeviceMAC;
        public int PumpSolenoidId;
        public DateTime CreatedAt;
        public DateTime UpdatedAt;       

        public Device()
        {           
        }
    }
}
