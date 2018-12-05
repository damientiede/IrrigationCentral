using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Services;
using DeviceController.IO.Solenoids;
using DeviceController.Data;
using log4net;

namespace DeviceController
{
    public class IrrigationProgram
    {
        ILog log;
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Start { get; set; }
        public int Duration { get; set; }
        public int SolenoidId { get; set; }
        public bool RequiresPump { get; set; }

        public ISolenoid HardwareSolenoid;
        public Solenoid DataSolenoid;

        public ISolenoid HardwarePumpSolenoid;
        public Solenoid DataPumpSolenoid;

        HardwareService hardwareService;
        DataService dataService;

        public IrrigationProgram()
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");
        }
        public IrrigationProgram(int id, string name, DateTime start, int duration, int solenoidId, HardwareService hw, DataService data)
        {
            Id = id;
            Name = name;
            Start = start;
            Duration = duration;
            SolenoidId = solenoidId;

            hardwareService = hw;
            dataService = data;
            DataSolenoid = dataService.Solenoids.AsQueryable<Solenoid>().Where(s => s.Id == solenoidId).First<Solenoid>();
            HardwareSolenoid = hardwareService.Solenoids.AsQueryable<ISolenoid>().Where(s => s.Id == solenoidId).First<ISolenoid>();

            HardwarePumpSolenoid = hardwareService.PumpSolenoid;
            DataPumpSolenoid = dataService.Solenoids
            RequiresPump = DataSolenoid.RequiresPump;
            

            Data.IrrigationProgram program = new Data.IrrigationProgram()
            {                
                Name = Name,
                Start = Start,
                Duration = Duration,
                DeviceId = data.device.Id,
                SolenoidName = DataSolenoid.Name,
                SolenoidId = DataSolenoid.Id,
                RequiresPump = DataSolenoid.RequiresPump
            };
            dataService.dataServer.PutIrrigationProgram(program);

            //start irrigating
            HardwareSolenoid.On();
            DataSolenoid.Value = 1;
            dataService.dataServer.PutSolenoid(DataSolenoid);

            if (RequiresPump)
            {
                hardwareService.PumpSolenoid.On();

            }

            //report to the server
            DataSolenoid.Value = 1;
            dataService.dataServer.PutSolenoid(DataSolenoid);


        }
    }
}
