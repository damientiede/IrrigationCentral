using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using Newtonsoft.Json;
using log4net;

namespace DeviceController.Data
{
    public class DataServerWebClient
    {
        ILog log;        
        string baseAddress;
        public DataServerWebClient(string uri)
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");
            baseAddress = uri;
        }        
        protected string Get(string Uri)
        {
            string response = String.Empty;
            using (WebClient client = new WebClient())
            {
                response = client.DownloadString(string.Format("{0}/{1}",baseAddress,Uri));
            }
            return response;
        }
        protected string Post(string Uri, string json)
        {
            string response = String.Empty;
            using (WebClient client = new WebClient())
            {
                client.Headers[HttpRequestHeader.ContentType] = "application/json";
                response = client.UploadString(string.Format("{0}/{1}", baseAddress, Uri), "POST", json);
            }
            return response;
        }
        protected string Put(string Uri, string json)
        {
            string response = String.Empty;
            using (WebClient client = new WebClient())
            {
                client.Headers[HttpRequestHeader.ContentType] = "application/json";
                response = client.UploadString(string.Format("{0}/{1}", baseAddress, Uri), "PUT", json);
            }
            return response;
        }
        public List<Event> GetEvents(int deviceId)
        {            
            string response = Get(string.Format("devices/{0}/events", deviceId));
            List<Event> events = JsonConvert.DeserializeObject<List<Event>>(response);
            return events;
        }
        public List<Schedule> GetSchedules(int deviceId)
        {            
            string response = Get(string.Format("devices/{0}/schedules", deviceId));
            List<Schedule> schedules = JsonConvert.DeserializeObject<List<Schedule>>(response);           
            return schedules;
        }
        public Device Register(string macAddress)
        {
            string response = Get(string.Format("devices/{0}/register", macAddress));
            Device device = JsonConvert.DeserializeObject<Device>(response);
            return device;
        }
        public void PostEvent(Event e)
        {
            string data = JsonConvert.SerializeObject(e);
            string response = Post("events", data);           
        }
        public int PostIrrigationProgram(IrrigationProgram p)
        {
            string data = JsonConvert.SerializeObject(p);
            string response = Post("irrigationprograms", data);
            IrrigationProgram program = JsonConvert.DeserializeObject<IrrigationProgram>(response);
            return program.Id;
        }
        public void PutIrrigationProgram(IrrigationProgram p)
        {
            string data = JsonConvert.SerializeObject(p);
            string response = Put(string.Format("irrigationprograms/{0}", p.Id), data);            
        }
        public void PutCommand(Command c)
        {
            string data = JsonConvert.SerializeObject(c);
            string response = Put(string.Format("commands/{0}", c.Id), data);
        }
        public void PutSolenoid(Solenoid s)
        {
            string data = JsonConvert.SerializeObject(s);
            string response = Put(string.Format("solenoids/{0}", s.Id), data);
        }
        public void PutAnalog(Analog a)
        {
            string data = JsonConvert.SerializeObject(a);
            string response = Put(string.Format("analogs/{0}", a.Id), data);
        }
        public void PutDevice(Device d)
        {
            string data = JsonConvert.SerializeObject(d);
            string response = Put(string.Format("devices/{0}", d.Id), data);
        }
        public void PutStatus(Status s)
        {
            string data = JsonConvert.SerializeObject(s);
            string response = Put(string.Format("devices/{0}", s.Id), data);
        }
        public List<Command> GetCommands(int deviceId)
        {
            string Uri = string.Format("devices/{0}/pendingcommands", deviceId);
            string response = Get(Uri);
            List<Command> commands = JsonConvert.DeserializeObject<List<Command>>(response);
            return commands;
        }
        public List<CommandType> GetCommandTypes()
        {            
            string response = Get("commandtypes");
            List<CommandType> commandTypes = JsonConvert.DeserializeObject<List<CommandType>>(response);           
            return commandTypes;
        }
        public List<Solenoid> GetSolenoids(int deviceId)
        {
            string Uri = string.Format("devices/{0}/solenoids", deviceId);
            string response = Get(Uri);
            List<Solenoid> solenoids = JsonConvert.DeserializeObject<List<Solenoid>>(response);
            return solenoids;
        }
        public List<Alarm> GetAlarms(int deviceId)
        {
            string Uri = string.Format("devices/{0}/alarms", deviceId);
            string response = Get(Uri);
            List<Alarm> alarms = JsonConvert.DeserializeObject<List<Alarm>>(response);           
            return alarms;
        }
        public List<Spi> GetSpis(int deviceId)
        {
            string Uri = string.Format("devices/{0}/spis", deviceId);
            string response = Get(Uri);
            List<Spi> spis = JsonConvert.DeserializeObject<List<Spi>>(response);
            return spis;
        }
        public List<Analog> GetAnalogs(int deviceId)
        {
            string Uri = string.Format("devices/{0}/analogs", deviceId);
            string response = Get(Uri);
            List<Analog> analogs = JsonConvert.DeserializeObject<List<Analog>>(response);            
            return analogs;
        }
        public Device GetDevice(int deviceId)
        {
            string Uri = string.Format("devices/{0}", deviceId);
            string response = Get(Uri);
            Device device = JsonConvert.DeserializeObject<Device>(response);           
            return device;
        }
    }
}
