using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public interface IRestApi
    {
        List<Event> GetEvents(int deviceId);
        List<Schedule> GetSchedules(int deviceId);
        Device Register(string macAddress);
        void PostEvent(Event e);
        int PostIrrigationProgram(IrrigationProgram p);
        void PutIrrigationProgram(IrrigationProgram p);
        void PutCommand(Command c);
        void PutSolenoid(Solenoid s);
        void PutAnalog(Analog a);
        void PutDevice(Device d);
        void PutStatus(Status s);
        List<Command> GetCommands(int deviceId);
        List<CommandType> GetCommandTypes();
        List<Solenoid> GetSolenoids(int deviceId);
        List<Alarm> GetAlarms(int deviceId);
        List<Spi> GetSpis(int deviceId);
        List<Analog> GetAnalogs(int deviceId);
        Device GetDevice(int deviceId);
    }
}
