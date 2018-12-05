using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class IrrigationProgram
    {
        public int Id;
        public string Name;
        public DateTime Start;
        public DateTime Finished;
        public int Duration;
        public int DeviceId;
        public int SolenoidId;
        public string SolenoidName;        
        public bool RequiresPump;        
    }
}
