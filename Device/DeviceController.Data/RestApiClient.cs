using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RestSharp;
using Newtonsoft;
using DeviceController.Data.Authentication;
using log4net;
using Newtonsoft.Json;

namespace DeviceController.Data
{
    public class RestApiClient : IRestApi
    {
        ILog log;
        string apiRoot;
        RestClient client;

        string authToken;
        string authServerUri;
        AuthClientSecret authSecret;

        public RestApiClient(string baseuri, string authUrl, AuthClientSecret secret)
        {
            log4net.Config.XmlConfigurator.Configure();
            log = LogManager.GetLogger("Device");
            client = new RestClient(baseuri);
            apiRoot = "/api/";
            authServerUri = authUrl;
            authSecret = secret;
            fetchAuthToken();
        }
        private void fetchAuthToken()
        {
            authToken = AuthTokenProvider.GetAuthToken(authServerUri, authSecret);
            log.InfoFormat("RestApiClient.fetchAuthToken() - accessed authToken {0}", authToken);
        }
        private IRestResponse execute(RestRequest request)
        {
            IRestResponse response = null; 
            try
            {
                response = client.Execute(request);                              
                if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
                {
                    //auth token may have expired - try renewing
                    fetchAuthToken();
                    // retry
                    response = client.Execute(request);
                }
                if (!response.IsSuccessful)
                {
                    log.WarnFormat("RestApiClient unsuccessful response from API : {0}, {1}", response.StatusCode.ToString(), response.Content);
                }
            }
            catch(Exception ex)
            {
                log.DebugFormat(ex.Message);
            }
            return response;
        }
        protected RestRequest GetAuthenticatedRequest(string resource)
        {
            RestRequest request = new RestRequest(apiRoot + resource);
            request.AddHeader("authorization", string.Format("Bearer {0}", authToken));
            return request;
        }
        protected string Get(string resource)
        {
            RestRequest request = GetAuthenticatedRequest(resource);
            IRestResponse response = execute(request);
            return response.Content;
        }
        protected string Post(string resource, string json)
        {
            RestRequest request = GetAuthenticatedRequest(resource);
            request.Method = Method.POST;
            request.AddHeader("content-type", "application/json");
            request.AddParameter("", json, ParameterType.RequestBody);

            IRestResponse response = execute(request);
            return response.Content;
        }
        protected IRestResponse Put(string resource, string json)
        {
            RestRequest request = GetAuthenticatedRequest(resource);
            request.Method = Method.PUT;
            request.AddHeader("content-type", "application/json");
            request.AddParameter("", json, ParameterType.RequestBody);            
            IRestResponse response = execute(request);
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
        public int PostIrrigationAction(IrrigationAction p)
        {
            string data = JsonConvert.SerializeObject(p);
            string response = Post("irrigationactions", data);
            IrrigationAction program = JsonConvert.DeserializeObject<IrrigationAction>(response);
            return program.Id;
        }
        public void PutIrrigationAction(IrrigationAction p)
        {
            string data = JsonConvert.SerializeObject(p);
            IRestResponse response = Put(string.Format("irrigationactions/{0}", p.Id), data);
        }
        public void PutCommand(Command c)
        {
            string data = JsonConvert.SerializeObject(c);
            IRestResponse response = Put(string.Format("commands/{0}", c.Id), data);
        }
        public void PutSolenoid(Solenoid s)
        {
            string data = JsonConvert.SerializeObject(s);
            IRestResponse response = Put(string.Format("solenoids/{0}", s.Id), data);
        }
        public void PutAnalog(Analog a)
        {
            string data = JsonConvert.SerializeObject(a);
            IRestResponse response = Put(string.Format("analogs/{0}", a.Id), data);
        }
        public void PutDevice(Device d)
        {
            string data = JsonConvert.SerializeObject(d);
            IRestResponse response = Put(string.Format("devices/{0}/status", d.Id), data);
        }
        public void PutStatus(Status s)
        {
            string data = JsonConvert.SerializeObject(s);
            IRestResponse response = Put(string.Format("devices/{0}", s.Id), data);
        }
        public List<Command> GetCommands(int deviceId)
        {
            string Uri = string.Format("devices/{0}/pendingcommands", deviceId);
            string response = Get(Uri);
            log.Debug(response);
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
