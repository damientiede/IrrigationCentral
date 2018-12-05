using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;

namespace DeviceController.IO.Alarms
{
    public interface IAlarm
    {        
        int Id { get; set; }
        string Name { get; set; }  
        string Address { get; set; }         
        bool State { get; set; }             
        event AlarmStatusChangedEventHandler StatusChanged;        
    }
}
