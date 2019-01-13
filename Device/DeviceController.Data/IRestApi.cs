using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;

namespace DeviceController.Data
{
    public interface IRestApi
    {
        List<Event> GetEvents(int deviceId);
        List<Schedule> GetSchedules(int deviceId);
        Device Register(string macAddress);
        void PostEvent(Event e);        
        Program GetProgram(int Id);
        void PutProgram(Program p);
        Step GetStep(int id);
        void PutStep(Step s);
        IrrigationAction GetIrrigationAction(int id);
        int PostIrrigationAction(IrrigationAction p);
        void PutIrrigationAction(IrrigationAction p);
        void PutCommand(Command c);
        void PutSolenoid(Solenoid s);
        void PutAnalog(Analog a);
        void PutDeviceStatus(Device d);
        void PutDeviceConfig(Device d);
        void PutStatus(Status s);
        List<Command> GetCommands(int deviceId);
        List<CommandType> GetCommandTypes();
        List<Solenoid> GetSolenoids(int deviceId);
        List<Alarm> GetAlarms(int deviceId);
        List<Spi> GetSpis(int deviceId);
        List<Analog> GetAnalogs(int deviceId);
        List<Program> GetPrograms(int deviceid);
        Device GetDevice(int deviceId);
    }
}
