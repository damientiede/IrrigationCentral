using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Step
    {
        public int Id;
        public int Sequence;
        public int Duration;
        public int SolenoidId;
        public string SolenoidName;
        public bool RequiresPump;
        public int IrrigationActionId;
        public DateTime CreatedAt;
        public DateTime UpdatedAt;
    }
}
