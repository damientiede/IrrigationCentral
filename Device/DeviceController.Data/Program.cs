using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Program
    {        
        public int Id;
        public string Name;
        public DateTime Start;
        public bool Enabled;
        public int DeviceId;
        public Step[] Steps;
        public DateTime CreatedAt;
        public DateTime UpdatedAt;
    }

}
