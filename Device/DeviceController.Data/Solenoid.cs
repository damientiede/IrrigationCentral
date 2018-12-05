using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public enum HardwareTypes { GPIO, Distributed, SPI};
    public class Solenoid
    {
        public int Id;
        public string Name;
        public string Description;
        public string HardwareType;
        public string Address;
        public int Value;
        public bool RequiresPump;
        public int DeviceId;
        public DateTime? CreatedAt;
        public DateTime? UpdatedAt;
    }
}
