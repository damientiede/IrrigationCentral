using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net.NetworkInformation;
using DeviceController.IO;
using DeviceController.Data;
using DeviceController.Devices;
using System.Threading;
using log4net;


namespace DeviceController
{    
    public class IrrigationController
    {
        ILog log;
        bool bShutdown = false;
        private string dataServerUrl;

        List<DeviceSolenoid> Solenoids;
        List<DeviceAnalog> Analogs;
        List<DeviceAlarm> Alarms;        
        List<DeviceProgram> Programs;
        static DeviceSolenoid pumpSolenoid;
        
        DeviceProgram CurrentProgram;
        // Step CurrentStep;
        DeviceAction CurrentAction;

        public static DeviceSolenoid Pump
        {
            get { return pumpSolenoid; }
            set { pumpSolenoid = value; }
        }

        public static int DeviceId;

        //private int deviceId = -1;
        private string macAddress = String.Empty;
        Device device;       

        public IrrigationController()
        {
                      
            log = LogManager.GetLogger("Device");                         
            Init();            
        }
        
        protected void Init()
        {
            try
            {
                log.Info("=====================================================");
                log.InfoFormat("DeviceController.Init(): Initializing device...");
                //get device mac address
                macAddress =
                (
                    from nic in NetworkInterface.GetAllNetworkInterfaces()
                    where nic.OperationalStatus == OperationalStatus.Up
                    select nic.GetPhysicalAddress().ToString()
                ).FirstOrDefault();
                if (string.IsNullOrEmpty(macAddress))
                {
                    throw new Exception("Could not read device mac address");
                }

                //register with server
                while (device == null)
                {
                    try
                    {
                        log.DebugFormat("Registering device {0} with server...", macAddress);
                        // Register();
                        device = DataService.Proxy.Register(macAddress);
                        //device = new Device();
                        if (device == null)
                        {
                            Thread.Sleep(5000);
                        }
                    }
                    catch (Exception ex)
                    {
                        log.Error(ex.Message);
                        Thread.Sleep(5000);
                    }
                }

                DeviceId = device.Id;
                log.DebugFormat("DeviceController start, registered with deviceId:{0} pump solenoid:{1}", DeviceId,device.PumpSolenoidId);
                DataService.CreateEvent(EventTypes.Application, string.Format("DeviceController start, registered with deviceId:{0}", device.Id),device.Id);

                Solenoids = new List<DeviceSolenoid>();
                Analogs = new List<DeviceAnalog>();
                Alarms = new List<DeviceAlarm>();
                Programs = new List<DeviceProgram>();
                
                LoadConfig();

                // get current irrigation action                
                if (device.CurrentAction != null)
                {
                    IrrigationAction irrigationAction = DataService.Proxy.GetIrrigationAction((int)device.CurrentAction);
                    DeviceSolenoid solenoid = GetSolenoidById(irrigationAction.SolenoidId);
                    CurrentAction = new DeviceAction(irrigationAction, solenoid);           
                }               
            }
            catch (Exception ex)
            {
                GPIOService.Gpio.Close();
                log.ErrorFormat("Initialization failure: {0}", ex.Message);
                throw ex;
            }
        }
        public void LoadConfig()
        {
            log.Debug("LoadConfig()");
            //clear the existing interface
            GPIOService.CloseGpio();

            //reload the device config
            device = DataService.Proxy.GetDevice(device.Id);

            Solenoids.Clear();
            List<Solenoid> solenoids = DataService.Proxy.GetSolenoids(device.Id);
            foreach (Solenoid s in solenoids)
            {
                DeviceSolenoid sol = new DeviceSolenoid(s);
                Solenoids.Add(sol);
                log.DebugFormat("Solenoid Id:{0}",sol.Id);
                if (device.PumpSolenoidId == sol.Id)
                {
                    Pump = sol;
                    log.DebugFormat("Found pump solenoid {0}",Pump.Id);
                }
            }

            Analogs.Clear();
            List<Analog> analogs = DataService.Proxy.GetAnalogs(device.Id);
            foreach (Analog a in analogs)
            {                
                DeviceAnalog an = new DeviceAnalog(a);
                Analogs.Add(an);
            }

            Alarms.Clear();
            List<Alarm> alarms = DataService.Proxy.GetAlarms(device.Id);
            foreach (Alarm a in alarms)
            {
                DeviceAlarm al = new DeviceAlarm(a);
                Alarms.Add(al);
            }

            Programs.Clear();
            List<DeviceController.Data.Program> programs = DataService.Proxy.GetPrograms(DeviceId);
            foreach (DeviceController.Data.Program p in programs)
            {
                DeviceProgram program = new DeviceProgram(p, device.CurrentStep);
                Programs.Add(program);
                if (device.CurrentProgram == p.Id)
                {
                    CurrentProgram = program;
                }
            }                       
        }
        public void ReadAnalogs()
        {
            foreach (DeviceAnalog analog in Analogs)
            {
                analog.Sample();                
            }
        }
        public void Run()
        {
            while (!bShutdown)
            {
                if (device != null)
                {
                    try
                    {
                        //get commands
                        ProcessCommands();
                      
                        //read analogs
                        ReadAnalogs();
                        device.Pressure = Analogs[0].Sample();
                                               
                        RunPrograms();
                           
                        //update the server
                        ReportStatus();                        
                      
                    }
                    catch (Exception ex)
                    {
                        log.Error(ex.Message);
                    }

                    //powernap
                    Thread.Sleep(5000);
                }
            }

            GPIOService.Gpio.Close();
            log.InfoFormat("Device controller shutdown.");
        }        
        public void RunPrograms()
        {
            if (device.Mode != DeviceMode.Auto || CurrentAction != null)
            {
                //ignore scheduled programs if we are not in Auto mode or if there is a program running
                return;
            }

            if (CurrentProgram == null)
            {
                foreach (DeviceProgram p in Programs)
                {
                    if (p.Enabled)
                    {
                        if (p.StartDate < DateTime.Now)
                        {
                            foreach 
                        }
                    }
                }


            //check scheduled programs
            foreach (DeviceController.Data.Program p in Programs)
            {
                //if (CurrentAction != null)
                //{
                //    //prevents reinitializing the ActiveSchedule
                //    if (CurrentAction.ActiveSchedule != null)
                //    {
                //        if (s.Id == CurrentAction.ActiveSchedule.Id)
                //        {
                //            continue;
                //        }
                //    }
                //}

                if (p.Enabled)
                {
                    log.DebugFormat("Schedule {0}", s.Name);

                    //see if schedule has come into active window
                    int dayOfWeek = (int)DateTime.Now.DayOfWeek;
                    log.DebugFormat("DOW: {0} Today:{1}", s.Days, dayOfWeek);
                    if (s.Days.Contains(dayOfWeek.ToString()))
                    {
                        DateTime start = s.StartDate;//.ToUniversalTime();                                                    
                        DateTime finish = start.AddMinutes(s.Duration);
                        DateTime now = DateTime.Now;
                        log.DebugFormat("Now: {2} Start: {0} Finish: {1}", start.ToString(), finish.ToString(), now.ToString());
                        if (now < start) { log.Debug("< start"); }
                        if (now <= finish) { log.Debug(" <= finish"); }
                        if ((now > start) && (now <= finish))
                        {
                            log.DebugFormat("Schedule window active: {0}", s.Name);
                            //abort existing program
                            if (CurrentAction != null)
                            {
                                AbortAction();
                            }

                            //new active schedule                            
                            CurrentAction = new DeviceAction(s.Name, GetSolenoidById(s.SolenoidId), s.Duration);
                            CurrentAction.DeviceActionCompleted += OnProgramCompleted;
                            CurrentAction.ActiveSchedule = s;

                            DataService.CreateEvent(EventTypes.IrrigationStart, string.Format("Scheduled program '{0}' started", CurrentAction.Name), device.Id);
                            log.InfoFormat("Scheduled program '{0}' started", CurrentAction.Name);
                            device.State = DeviceState.Irrigating;
                            break;
                        }
                    }
                }
            }                    
        }
        public  void ProcessCommands()
        {
            log.Debug("ProcessCommands()");
            //get commands
            try
            {
                List<Command> commands =  DataService.Proxy.GetCommands(device.Id);
                log.DebugFormat("Retrieved {0} commands", commands.Count());
                foreach (Command cmd in commands)
                {
                    log.DebugFormat("Command {0}", cmd.CommandType);
                    switch (cmd.CommandType)
                    {
                        //shutdown
                        case "Shutdown":
                            Shutdown();
                            ActionCommand(cmd);
                            break;
                        
                        //Switch to Auto
                        case "Auto":
                            if (device.Mode != DeviceMode.Auto)
                            {
                                log.Info("Switching to Auto mode");
                                DataService.CreateEvent(EventTypes.Application, "Switching to Auto mode", device.Id);
                                device.Mode = DeviceMode.Auto;
                            }
                            ActionCommand(cmd);
                            break;

                        //Switch to Manual
                        case "Manual":
                            try
                            {
                                log.Info("Switching to Manual mode");
                                DataService.CreateEvent(EventTypes.Application, "Switching to Manual mode", device.Id);
                                device.Mode = DeviceMode.Manual;

                                if (!string.IsNullOrEmpty(cmd.Params))
                                {
                                    //includes instructions to run irrigation manually
                                    string[] parts = cmd.Params.Split(',');
                                    int solenoidId = Int32.Parse(parts[0]);
                                    int duration = Int32.Parse(parts[1]);

                                    //abort the active program if it exists
                                    if (CurrentAction != null)
                                    {
                                        AbortAction();
                                    }                                    

                                    //create the new program
                                    CurrentAction = new DeviceAction("Manual program", 
                                        GetSolenoidById(solenoidId),
                                         duration);

                                    CurrentAction.DeviceActionCompleted += OnProgramCompleted;
                                    DataService.CreateEvent(EventTypes.IrrigationStart,
                                        string.Format("Manual irrigation program: {0} for {1} minutes", CurrentAction.Solenoid.Id, CurrentAction.Duration),
                                        DeviceId);                                                                       

                                    device.State = DeviceState.Irrigating;
                                    device.Status = string.Format("Irrigating '{0}' for {1} minutes", CurrentAction.Solenoid.Name, CurrentAction.Duration);
                                    log.Info(device.Status);

                                }
                            }
                            catch (Exception ex)
                            {
                                log.ErrorFormat(ex.Message);
                                log.ErrorFormat("Manual command failed, invalid parameters");
                                //interfaceService.CreateEvent(EventTypes.Fault, "Manual command failed, invalid parameters");
                                device.Mode = DeviceMode.Manual;
                                device.State = DeviceState.Standby;                                
                            }
                            ActionCommand(cmd);
                            break;

                        //Off - turn off all solenoids
                        case "Stop":
                        case "Off":

                            SolenoidsOff();
                            device.State = DeviceState.Standby;
                            device.Mode = DeviceMode.Manual;

                            //interfaceService.CreateEvent(EventTypes.Application, "Switching all solenoids off");
                            AbortAction();

                            ActionCommand(cmd);
                            break;
                        
                        //Get schedules
                        case "LoadSchedules":
                            log.Info("LoadSchedules");
                            //interfaceService.LoadSchedules();
                            ActionCommand(cmd);
                            break;

                        //load configuration
                        case "LoadConfig":
                            log.Info("LoadConfig");
                            LoadConfig();
                            ActionCommand(cmd);
                            break;
                    }
                }
                ReportStatus();

            }
            catch (Exception ex)
            {
                log.ErrorFormat("ProcessCommands(): {0}", ex.Message);
            }

        }

        private void OnProgramCompleted(object sender, EventArgs e)
        {
            log.DebugFormat("Program {0} completed", CurrentAction.Name);
            
            DataService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} completed", CurrentAction.Name),device.Id);
            CurrentAction = null;            
            device.State = DeviceState.Standby;
            ReportStatus();
        }

        public DeviceSolenoid GetSolenoidById(int id)
        {
            return Solenoids.AsQueryable<DeviceSolenoid>().Where(s => s.Id == id).First<DeviceSolenoid>();
        }
        
        public void SolenoidsOff()
        {
            log.Debug("SolenoidsOff()");
            foreach (DeviceSolenoid s in Solenoids)
            {
                s.Off();
            }
        }
        public void AbortAction()
        {
            log.Debug("AbortAction()");
            //abort the active program if it exists
            if (CurrentAction != null)
            {
                CurrentAction.Stop();                
                log.DebugFormat("Action {0} aborted", CurrentAction.Name);
                DataService.CreateEvent(EventTypes.Application, string.Format("Action {0} aborted", CurrentAction.Name), device.Id);
                device.State = DeviceState.Standby;
                CurrentAction = null;
                ReportStatus();
            }
        }
        private string getTimeRemaining()
        {
            string timeRemaining = string.Empty;
            if (CurrentAction.Remaining.TotalSeconds < 60)
            {
                timeRemaining = string.Format("{0} seconds", Math.Floor(CurrentAction.Remaining.TotalSeconds));
            }
            if (CurrentAction.Remaining.TotalSeconds > 120)
            {
                timeRemaining = string.Format("{0} minutes", CurrentAction.Remaining.Minutes);
            }
            if (CurrentAction.Remaining.TotalSeconds < 120 && CurrentAction.Remaining.TotalSeconds > 60)
            {
                timeRemaining = "1 minute"; // string.Format("{0} minute", CurrentAction.Remaining.Minutes);
            }
            return timeRemaining;
        }
        public  void ReportStatus()
        {                 
            if (device.Mode == DeviceMode.Auto)
            {
                if (CurrentAction != null)// && ActiveSolenoid != null)
                {                    
                    device.Status = string.Format("Irrigating '{0}' from schedule '{1}'. {2} remaining."
                        , CurrentAction.Solenoid.Name, CurrentAction.Name, getTimeRemaining());
                }
                else
                {
                    log.Debug("ReportStatus() Auto mode.");
                    device.Status = "Standby. Waiting for next scheduled program to start.";
                }
            }

            if (device.Mode == DeviceMode.Manual)
            {
                if (CurrentAction != null)// && ActiveSolenoid !=null)
                {
                    device.Status = string.Format("Irrigating '{0}' - {1} remaining."
                        , CurrentAction.Solenoid.Name, getTimeRemaining());
                }
                else
                {
                    device.Status = "Standing by in manual mode.";
                }
            }

            try
            {
                DataService.Proxy.PutDevice(device);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("ReportStatus(): {0}", ex.Message);
            }
        }
               
        public  void ActionCommand(Command cmd)
        {
            cmd.Actioned = DateTime.Now;
            DataService.Proxy.PutCommand(cmd);
        }
        public void Shutdown()
        {
            log.Info("DeviceController application shutdown");
            DataService.CreateEvent(EventTypes.Application, "DeviceController application shutdown",device.Id);
            bShutdown = true;
        }
        
    }
}
