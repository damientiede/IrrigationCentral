using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Analogs
{
    public interface IAnalog
    {        
        int Id { get; set; }
        string Name { get; set; }
        double Sample();
        double RawValue { get; set; }
        double Value { get; set; }
        double Multiplier { get; set; }
        string Units { get; set; }
        string Address { get; set; }                   
        event AnalogValueChangedEventHandler ValueChanged;

    }
}
