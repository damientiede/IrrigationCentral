using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Alarms
{
    public delegate void AlarmStatusChangedEventHandler(object sender, AlarmStatusChangedEventArgs e);
    public class AlarmStatusChangedEventArgs:EventArgs
    {
        public bool Value;
    }
}
