using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using DeviceController.Data;
using log4net;

namespace DeviceController.Services
{
    public class DataService
    {
        ILog log;
        private static DataServerWebClient dataServer;

        public Device device;

        public List<Spi> Spis;
        public List<Solenoid> Solenoids;
        public List<Alarm> Alarms;
        public List<Analog> Analogs;
        public List<Schedule> Schedules;

        public Solenoid PumpSolenoid;

        public static DataServerWebClient Proxy
        {
            get
            {
                if (dataServer == null)
                {
                    string serverUri = ConfigurationManager.AppSettings["server"].ToString();
                    dataServer = new DataServerWebClient(serverUri);
                }
                return dataServer;
            }
        }
        public DataService(string url)
        {
            //initialize data server
            dataServer = new DataServerWebClient(url);

            //Spis = new List<Spi>();
            //Solenoids = new List<Solenoid>();
            //Alarms = new List<Alarm>();
            //Analogs = new List<Analog>();
            //Schedules = new List<Schedule>();
        }
        public Device Register(string mac)
        {
            if (device == null)
            {
                device = dataServer.Register(mac);
            }
            return device;
        }
        public void LoadConfig()
        {
            try
            {          
                if (Spis != null) { Spis.Clear(); }      
                Spis = dataServer.GetSpis(device.Id);

                if (Solenoids != null) { Solenoids.Clear(); }
                Solenoids = dataServer.GetSolenoids(device.Id);

                PumpSolenoid = Solenoids.AsQueryable<Solenoid>().Where(s => s.Id == device.PumpSolenoid).First<Solenoid>();

                if (Alarms != null) { Alarms.Clear(); }
                Alarms = dataServer.GetAlarms(device.Id);

                if (Analogs != null) { Analogs.Clear(); }
                Analogs = dataServer.GetAnalogs(device.Id);

                if (Schedules != null) { Schedules.Clear(); }
                Schedules = dataServer.GetSchedules(device.Id);

                CreateEvent(EventTypes.Application, "DeviceController configuration complete");
                log.InfoFormat("InterfaceManager.LoadConfig(): Configuration complete.");
            }
            catch (Exception ex)
            {
                log.ErrorFormat("LoadConfig(): {0}", ex.Message);
            }
        }
        public void CreateEvent(EventTypes eventType, string desc)
        {
            try
            {
                Event e = new Event { EventType = (int)eventType, CreatedAt = DateTime.Now, EventValue = desc, DeviceId = device.Id };
                dataServer.PostEvent(e);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("CreateEvent(): {0}", ex.Message);
            }
        }
        public void SolenoidsOff()
        {
            log.Debug("SolenoidsOff()");
            foreach (Solenoid s in Solenoids)
            {
                s.Value = 0;
                dataServer.PutSolenoid(s);                
            }
        }
        //public Analog GetAnalogById(int id)
        //{
        //    foreach (Analog a in Analogs)
        //    {

        //    }
        //}
    }
}
