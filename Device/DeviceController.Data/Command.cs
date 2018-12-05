using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Command
    {
        public int Id;
        public string CommandType;
        public string Params;
        public int DeviceId;
        public DateTime? Issued;
        public DateTime? Actioned;
        public DateTime? CreatedAt;
        public DateTime? UpdatedAt;

    }
}
