using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class ActiveIrrigationProgram:IrrigationProgram
    {        
        public ActiveIrrigationProgram(string name, int duration, int solenoidId, string solenoidName, int deviceId)
        {
            Name = name;        
            SolenoidId = solenoidId;
            SolenoidName = solenoidName;            
            Duration = duration;
            Start = DateTime.Now;            
            DeviceId = deviceId;
        }        
        public bool Completed
        {
            get
            {
                return (Start.AddMinutes(Duration) < DateTime.Now);              
            }
        }
        public int MinsRemaining
        {
            get
            {
                return (Start.AddMinutes(Duration) - DateTime.Now).Minutes;
            }
        }
    }
}
