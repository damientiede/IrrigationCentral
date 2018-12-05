using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Analog
    {
        public int Id;
        public string Name;
        public string Description;
        public HardwareTypes HardwareType;
        public string Address;
        public double Multiplier;
        public double RawValue;
        public string Units;
        public double Value;
        public int DeviceId;
        public DateTime? CreatedAt;
        public DateTime? UpdatedAt;
    }
}
