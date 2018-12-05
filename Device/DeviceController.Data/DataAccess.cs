using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.Http;
using System.Net.Http.Headers;

namespace DeviceController.Data
{
    public static class DataAccess
    {
        //static ILog log;
        static HttpClient client = new HttpClient(null);

        public static void InitClient()
        {            
            client.BaseAddress = new Uri("http://192.168.1.51:8000/api/");
            //client.BaseAddress = new Uri("http://www.creepytree.co.nz/IrrigationController/api/api.php/");            
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            Console.WriteLine("Success Calling InitClient");
        }
        public static async Task<Uri> PutStatus(Status status)
        {
            InitClient();

            HttpResponseMessage response = await client.PostAsJsonAsync("StatusUpdate", status);
            response.EnsureSuccessStatusCode();
            Console.WriteLine("Success Calling StatusUpdate");
            // return URI of the created resource.
            return response.Headers.Location;
        }      
        public static async Task<List<Event>> GetEvents(int deviceId)
        {
            InitClient();
            List<Event> events = new List<Event>();
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/events", deviceId));
            if (response.IsSuccessStatusCode)
            {
                events = await response.Content.ReadAsAsync<List<Event>>();
            }
            return events;
        }
        public static async Task<List<Schedule>> GetSchedules(int deviceId)
        {
            InitClient();
            List<Schedule> schedules = new List<Schedule>();
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/schedules", deviceId));
            if (response.IsSuccessStatusCode)
            {
                schedules = await response.Content.ReadAsAsync<List<Schedule>>();
            }
            return schedules;
        }
        public static async Task<Device> Register(string macAddress)
        {
            InitClient();
            Device d = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/register", macAddress));
            if (response.IsSuccessStatusCode)
            {
                d = await response.Content.ReadAsAsync<Device>();
            }
            return d;
        }
        public static async Task<Uri> PostEvent(Event e)
        {
            InitClient();
            HttpResponseMessage response = await client.PostAsJsonAsync("events", e);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }
        public static async Task<int> PostIrrigationProgram(IrrigationProgram p)
        {
            InitClient();
            IrrigationProgram program = null;
            HttpResponseMessage response = await client.PostAsJsonAsync("irrigationprograms", p);
            if (response.IsSuccessStatusCode)
            {
                program = await response.Content.ReadAsAsync<IrrigationProgram>();
            }
            return program.Id;
        }
        public static async Task<Uri> PutIrrigationProgram(IrrigationProgram p)
        {
            InitClient();
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("irrigationprograms/{0}", p.Id), p);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }
        public static async Task PutCommand(Command c)
        {
            InitClient();
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("commands/{0}", c.Id), c);
            //Console.WriteLine("PutCommand response: {0}", response.StatusCode.ToString());
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return;// response.Headers.Location;
        }

        public static async Task PutSolenoid(Solenoid s)
        {
            InitClient();
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("solenoids/{0}", s.Id), s);
            //Console.WriteLine("PutCommand response: {0}", response.StatusCode.ToString());
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return;// response.Headers.Location;
        }
        public static async Task PutDevice(Device d)
        {
            InitClient();
            HttpResponseMessage response = await client.PutAsJsonAsync(string.Format("devices/{0}", d.Id), d);
            //Console.WriteLine("PutCommand response: {0}", response.StatusCode.ToString());
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return;// response.Headers.Location;
        }
        public static async Task<List<Command>> GetCommands(int deviceId)
        {
            InitClient();
            List<Command> commands = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/pendingcommands", deviceId));
            if (response.IsSuccessStatusCode)
            {
                commands = await response.Content.ReadAsAsync<List<Command>>();
            }
            return commands;
        }
        public static async Task<List<CommandType>> GetCommandTypes()
        {
            InitClient();
            List<CommandType> commandTypes = null;
            HttpResponseMessage response = await client.GetAsync("commandtypes");
            if (response.IsSuccessStatusCode)
            {
                commandTypes = await response.Content.ReadAsAsync<List<CommandType>>();
            }
            return commandTypes;
        }
        public static async Task<List<Solenoid>> GetSolenoids(int deviceId)
        {
            InitClient();
            List<Solenoid> solenoids = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/solenoids", deviceId));
            if (response.IsSuccessStatusCode)
            {
                solenoids = await response.Content.ReadAsAsync<List<Solenoid>>();
            }
            return solenoids;
        }
        public static async Task<List<Alarm>> GetAlarms(int deviceId)
        {
            InitClient();
            List<Alarm> alarms = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/alarms", deviceId));
            if (response.IsSuccessStatusCode)
            {
                alarms = await response.Content.ReadAsAsync<List<Alarm>>();
            }
            return alarms;
        }
        public static async Task<List<Spi>> GetSpis(int deviceId)
        {
            InitClient();
            List<Spi> spis = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/spis", deviceId));
            if (response.IsSuccessStatusCode)
            {
                spis = await response.Content.ReadAsAsync<List<Spi>>();
            }
            return spis;
        }
        public static async Task<List<Analog>> GetAnalogs(int deviceId)
        {
            InitClient();
            List<Analog> analogs = null;
            HttpResponseMessage response = await client.GetAsync(string.Format("devices/{0}/analogs", deviceId));
            if (response.IsSuccessStatusCode)
            {
                analogs = await response.Content.ReadAsAsync<List<Analog>>();
            }
            return analogs;
        }
        public static async Task<Device> GetDevice(int deviceId)
        {
            InitClient();
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