using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Alarm
    {
        public int Id;
        public string Name;
        public string Description;
        public HardwareTypes HardwareType;
        public string Address;
        public int Value;
        public int DeviceId;
        public DateTime? CreatedAt;
        public DateTime? UpdatedAt;
    }
}
