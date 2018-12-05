using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;

namespace DeviceController.IO.Solenoids
{
    public interface ISolenoid
    {
        int Id { get; }
        string Name { get; }
        //string Description { get; }
        void On();
        void Off();
        bool State { get; set; }
        //bool RequiresPump { get; }
        string Address { get; }
        //string Report();
        //Solenoid solenoid { get; }
    }
}
