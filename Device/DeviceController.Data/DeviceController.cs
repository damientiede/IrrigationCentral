using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;


namespace DeviceController.Data
{
    public class DeviceController:Device
    {
        List<Solenoid> Solenoids;
        List<Alarm> Alarms;
        List<Analog> Analogs;
        List<Spi> Spis;
        List<Command> Commands;
        List<Schedule> Schedules;

        public DeviceController()
        {
            List<Solenoid> Solenoids = new List<Solenoid>();
            List<Alarm> Alarms = new List<Alarm>();
            List<Analog> Analogs = new List<Analog>();
            List<Spi> Spis = new List<Spi>();
            List<Command> Commands = new List<Command>();
            List<Schedule> Schedules = new List<Schedule>();
        }
    }
}
