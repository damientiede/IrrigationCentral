using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Analogs
{
    public delegate void AnalogValueChangedEventHandler(object sender, AnalogValueChangedEventArgs e);
    public class AnalogValueChangedEventArgs : EventArgs
    {
        public decimal Value;
    }    
}
