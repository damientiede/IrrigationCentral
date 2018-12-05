using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Script.Serialization;
using System.Threading.Tasks;
using ModernHttpClient;
using log4net;

namespace DeviceController.Data
{     
    public class DataServer
    {
        public string Uri;
        public int DeviceId;
        static HttpClient client;
        public DataServer(string uri)
        {
            Uri = uri;
            client = new HttpClient();                        
            client.BaseAddress = new Uri(uri);
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public async Task<List<Event>> GetEvents(int deviceId)
        {
            List<Event> events = new List<Event>();
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/events", deviceId));
            if (response.IsSuccessStatusCode)
            {
                events = await response.Content.ReadAsAsync<List<Event>>();
            }
            return events;
        }
        public async Task<List<Schedule>> GetSchedules(int deviceId)
        {
            List<Schedule> schedules = new List<Schedule>();
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/schedules", deviceId));
            if (response.IsSuccessStatusCode)
            {
                schedules = await response.Content.ReadAsAsync<List<Schedule>>();
            }
            return schedules;
        }
        public async Task<Device> Register(string macAddress)
        {            
            Device d = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/register", macAddress));
            if (response.IsSuccessStatusCode)
            {
                d = await response.Content.ReadAsAsync<Device>();
            }
            return d;
        }
        public async Task<Uri> PostEvent(Event e)
        {             
            HttpResponseMessage response = await client.PostAsJsonAsync("events", e);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }
        public async Task<int> PostIrrigationProgram(IrrigationProgram p)
        {
            IrrigationProgram program = null;
            HttpResponseMessage response = await client.PostAsJsonAsync("irrigationprograms", p);
            if (response.IsSuccessStatusCode)
            {
                program = await response.Content.ReadAsAsync<IrrigationProgram>();
            }            
            return program.Id;
        }
        public async Task<Uri> PutIrrigationProgram(IrrigationProgram p)
        {
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("irrigationprograms/{0}",p.Id), p);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }
        public async Task PutCommand(Command c)
        {            
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("commands/{0}", c.Id), c);
            //Console.WriteLine("PutCommand response: {0}", response.StatusCode.ToString());
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return;// response.Headers.Location;
        }

        public async Task PutSolenoid(Solenoid s)
        {
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("solenoids/{0}",s.Id),s);
            //Console.WriteLine("PutCommand response: {0}", response.StatusCode.ToString());
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return;// response.Headers.Location;
        }
        public async Task PutDevice(Device d)
        {
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("devices/{0}", d.Id), d);
            //Console.WriteLine("PutCommand response: {0}", response.StatusCode.ToString());
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return;// response.Headers.Location;
        }        
        public async Task<List<Command>> GetCommands(int deviceId)
        {                     
            List<Command> commands = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/pendingcommands", deviceId));
            if (response.IsSuccessStatusCode)
            {
                commands = await response.Content.ReadAsAsync<List<Command>>();
            }
            return commands;
        }
        public async Task<List<CommandType>> GetCommandTypes()
        {
            List<CommandType> commandTypes = null;
            HttpResponseMessage response = await client.GetAsync("commandtypes");
            if (response.IsSuccessStatusCode)
            {
                commandTypes = await response.Content.ReadAsAsync<List<CommandType>>();
            }
            return commandTypes;
        }
        public async Task<List<Solenoid>> GetSolenoids(int deviceId)
        {
            List<Solenoid> solenoids = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/solenoids", deviceId));
            if (response.IsSuccessStatusCode)
            {
                solenoids = await response.Content.ReadAsAsync<List<Solenoid>>();
            }
            return solenoids;
        }
        public async Task<List<Alarm>> GetAlarms(int deviceId)
        {
            List<Alarm> alarms = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/alarms", deviceId));
            if (response.IsSuccessStatusCode)
            {
                alarms = await response.Content.ReadAsAsync<List<Alarm>>();
            }
            return alarms;
        }
        public async Task<List<Spi>> GetSpis(int deviceId)
        {
            List<Spi> spis = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/spis", deviceId));
            if (response.IsSuccessStatusCode)
            {
                spis = await response.Content.ReadAsAsync<List<Spi>>();
            }
            return spis;
        }
        public async Task<List<Analog>> GetAnalogs(int deviceId)
        {
            List<Analog> analogs = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/analogs", deviceId));
            if (response.IsSuccessStatusCode)
            {
                analogs = await response.Content.ReadAsAsync<List<Analog>>();
            }
            return analogs;
        }
        public async Task<Device> GetDevice(int deviceId)
        {
            Device d = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}", deviceId));
            if (response.IsSuccessStatusCode)
            {
                d = await response.Content.ReadAsAsync<Device>();
            }
            return d;
        }
    }
}
