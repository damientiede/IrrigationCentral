using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public class Status
    {
        public int Id;
        public string State;
        public string Mode;
        public string Station;
        public DateTime Start;
        public int Duration;
        public int ScheduleId;
        public string Inputs;
        public string Outputs;
        public DateTime CreatedAt;
        public DateTime UpdatedAt;
    }
}
