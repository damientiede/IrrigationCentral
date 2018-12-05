using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Spi
    {
        public int Id;
        public string Name;
        public int Clock;
        public int CS;
        public int MISO;
        public int MOSI;        
        public int DeviceId;
        public DateTime? CreatedAt;
        public DateTime? UpdatedAt;
    }
}
