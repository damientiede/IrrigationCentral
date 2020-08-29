using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Diagnostics;
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
        //private string dataServerUrl;

        List<DeviceSolenoid> Solenoids;
        List<DeviceAnalog> Analogs;
        List<DeviceAlarm> Alarms;        
        List<DeviceProgram> Programs;
        static DeviceSolenoid pumpSolenoid;
        
        DeviceProgram CurrentProgram;        
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
                log.InfoFormat("DeviceController by Damien Tiede v{0}",GetVersion());
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

                //update the software version number
                string version = GetVersion();
                if (device.SoftwareVersion != version)
                {
                    device.SoftwareVersion = version;
                    DataService.Proxy.PutDeviceConfig(device);
                }

                Solenoids = new List<DeviceSolenoid>();
                Analogs = new List<DeviceAnalog>();
                Alarms = new List<DeviceAlarm>();
                Programs = new List<DeviceProgram>();
                
                LoadConfig();
                LoadPrograms();

                // get current irrigation action   
                log.Debug("Device recover state");             
                if (device.IrrigationAction != null)
                {               
                    if (device.IrrigationAction.Finished == null)
                    {                       
                        log.DebugFormat("IrrigationAction id:{0} Start:{1} Duration:{2} ProjectedFinish:{3} Now:{4}",
                            device.IrrigationAction.Id,
                            Util.UtcToLocal(device.IrrigationAction.Start),
                            device.IrrigationAction.Duration,
                            Util.UtcToLocal(device.IrrigationAction.Start).AddMinutes(device.IrrigationAction.Duration),
                            DateTime.Now);

                        if (Util.UtcToLocal(device.IrrigationAction.Start).AddMinutes(device.IrrigationAction.Duration) > DateTime.Now)
                        {
                            log.DebugFormat("Resuming existing irrigation action id:{0} - {1}", device.IrrigationAction.Id, device.IrrigationAction.Name);
                            DeviceSolenoid solenoid = GetSolenoidById(device.IrrigationAction.SolenoidId);
                            //adjust Start time from Utc
                            //device.IrrigationAction.Start = Util.UtcToLocal(device.IrrigationAction.Start);
                            CurrentAction = new DeviceAction(device.IrrigationAction, solenoid);
                            CurrentAction.DeviceActionCompleted += OnDeviceActionCompleted;
                            //log.Debug("debug1");
                        }
                        else
                        {
                            
                            log.DebugFormat("Closing existing irrigation action id:{0} - {1}", device.IrrigationAction.Id, device.IrrigationAction.Name);
                            device.IrrigationAction.Finished = DateTime.Now;
                            DataService.Proxy.PutIrrigationAction(device.IrrigationAction);
                            device.IrrigationAction = null;
                            device.IrrigationActionId = null;
                            CurrentAction = null;
                        }
                        
                    }
                    else
                    {
                        log.DebugFormat("Clearing existing completed irrigation action id:{0} - {1}", device.IrrigationAction.Id, device.IrrigationAction.Name);
                        device.IrrigationAction = null;
                        device.IrrigationActionId = null;
                        CurrentAction = null;
                        DataService.Proxy.PutDeviceStatus(device);                        
                    }
                    //log.Debug("debug2");
                    if (device.ActiveProgramId != null)
                    {
                        Data.Program p = DataService.Proxy.GetProgram((int)device.ActiveProgramId);
                        //p.Start = Util.UtcToLocal(p.Start);
                        if (p != null)
                        {
                            CurrentProgram = new DeviceProgram(p);
                        }
                        else
                        {
                            //Program must have been deleted
                            device.ActiveProgramId = null;
                        }
                    }
                    //log.Debug("debug3");
                }
            }
            catch (Exception ex)
            {
                GPIOService.Gpio.Close();
                log.ErrorFormat("Initialization failure: {0}", ex.Message);
                throw ex;
            }
        }
        public string GetVersion()
        {
            Assembly assembly = Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            return fvi.FileVersion;
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
        }
        public void DeleteProgram(string id)
        {
            log.DebugFormat("DeleteProgram() : {0}", id);
            try
            {
                if (String.IsNullOrEmpty(id))
                {
                    log.Warn("DeleteProgram() : id is null");
                    return;
                }
                int programId = Convert.ToInt32(id);
                log.DebugFormat("programId: {0}", programId);
                DeviceProgram programToBeDeleted = Programs.AsQueryable<DeviceProgram>().Where(p => p.Id == programId).First();
                if (programToBeDeleted != null)
                {
                    if (CurrentProgram != null)
                    {
                        if (CurrentProgram.Id == programId)
                        {
                            log.DebugFormat("Aborting active program {0}", programToBeDeleted.Name);
                            AbortAction();
                            device.ActiveProgramId = null;
                            CurrentProgram = null;
                        }
                    }
                    Programs.Remove(programToBeDeleted);
                    log.DebugFormat("Removed old program {0} Start:{1}", programToBeDeleted.Name, programToBeDeleted.StartDate);
                }               
            }
            catch (Exception ex)
            {
                log.ErrorFormat("LoadProgram(): {0}", ex.Message);
            }
        }
        public void LoadProgram(string id)
        {
            log.DebugFormat("LoadProgram() : {0}", id);
            try
            {
                if (String.IsNullOrEmpty(id))
                {
                    log.Warn("LoadProgram() : id is null");
                    return;
                }
                int programId = Convert.ToInt32(id);
                log.DebugFormat("programId: {0}", programId);
                var query = Programs.AsQueryable<DeviceProgram>().Where(p => p.Id == programId);
                if (query.Count() > 0)
                {
                    DeviceProgram oldProgram = query.First<DeviceProgram>();
                    if (oldProgram != null)
                    {
                        if (CurrentProgram != null)
                        {
                            if (CurrentProgram.Id == programId)
                            {
                                log.DebugFormat("Aborting active program {0}", oldProgram.Name);
                                AbortAction();
                                device.ActiveProgramId = null;
                                CurrentProgram = null;
                            }
                        }
                        Programs.Remove(oldProgram);
                        log.DebugFormat("Removed old program {0} Start:{1}", oldProgram.Name, oldProgram.StartDate);
                    }
                }
                DeviceController.Data.Program newProgram = DataService.Proxy.GetProgram(programId);
                //newProgram.Start = Util.UtcToLocal(newProgram.Start);
                Programs.Add(new DeviceProgram(newProgram));
                log.DebugFormat("Added new program {0} Start:{1}", newProgram.Name, newProgram.Start);
            }
            catch (Exception ex)
            {
                log.ErrorFormat("LoadProgram(): {0}",ex.Message);
            }
            
        }
        public void LoadPrograms()
        {
            log.Debug("LoadPrograms()");            
            List<DeviceController.Data.Program> programs = DataService.Proxy.GetPrograms(DeviceId);
            foreach (DeviceController.Data.Program p in programs)
            {
                DeviceProgram program = new DeviceProgram(p);
                log.DebugFormat("Program '{0}' Starts: {1}", program.Name, program.StartDate);
                Programs.Add(program);                   
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
                        ProcessCommands();
                      
                        ReadAnalogs();
                        if (Analogs.Count > 0)
                        {
                            device.Pressure = Analogs[0].Sample();
                        }
                        
                                               
                        RunPrograms();

                        if (CurrentAction != null)
                        {
                            if (CurrentAction.Finished != null)
                            {
                                device.IrrigationActionId = null;
                                device.IrrigationAction = null;
                                CurrentAction = null;
                                device.State = DeviceState.Standby;
                            }                            
                        }

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
        public void StartProgramStep()
        {
            log.Debug("StartProgramStep()");
            if (CurrentProgram != null)
            {
                if (!CurrentProgram.Completed())
                {                                        
                    if (CurrentProgram.CurrentStep != null)
                    {                        
                        if (CurrentAction == null)
                        {
                            log.DebugFormat("Resuming existing program step {0} for program {1}",
                                CurrentProgram.CurrentStep.Sequence, CurrentProgram.Name);
                            IrrigationAction action = CurrentProgram.StartNextStep();
                            if (action == null)
                            {
                                log.Debug("Should never reach this code");
                                return;
                            }
                            DeviceSolenoid solenoid = GetSolenoidById(action.SolenoidId);
                            CurrentAction = new DeviceAction(action, solenoid);
                            CurrentAction.DeviceActionCompleted += OnDeviceActionCompleted;
                            
                            if (CurrentProgram.NextStep != null)
                            {
                                CurrentAction.StopPumpOnCompletion = (!CurrentProgram.NextStep.RequiresPump);
                                log.DebugFormat("{0} StopPumpOnCompletion = {1}", CurrentAction.Name, CurrentAction.StopPumpOnCompletion);
                            }

                            device.IrrigationActionId = action.Id;
                            DataService.CreateEvent(EventTypes.IrrigationStart,
                                string.Format("Irrigation program '{0}' resuming step {1}, '{2}' for {3} minutes",
                                    CurrentProgram.Name, CurrentProgram.CurrentStep.Sequence,
                                    CurrentProgram.CurrentStep.SolenoidName, CurrentProgram.CurrentStep.Duration),
                                DeviceId);                            
                        }
                    }
                    else
                    {                                              
                        //start next program step
                        IrrigationAction action = CurrentProgram.StartNextStep();
                        log.DebugFormat("Starting step {0}", CurrentProgram.CurrentStep.Sequence);
                        DeviceSolenoid solenoid = GetSolenoidById(action.SolenoidId);
                        CurrentAction = new DeviceAction(action, solenoid);
                        CurrentAction.DeviceActionCompleted += OnDeviceActionCompleted;
                        device.IrrigationActionId = action.Id;
                        DataService.CreateEvent(EventTypes.IrrigationStart,
                            string.Format("Irrigation program '{0}' starting step {1}, '{2}' for {3} minutes",
                                CurrentProgram.Name, CurrentProgram.CurrentStep.Sequence,
                                CurrentProgram.CurrentStep.SolenoidName, CurrentProgram.CurrentStep.Duration),
                            DeviceId);                        
                    }
                }
                else
                {
                    log.DebugFormat("Program '{0}' completed", CurrentProgram.Name);
                    device.ActiveProgramId = null;
                    CurrentProgram = null;
                }
                               
            }
        }
        public void StartManualIrrigationAction(int solenoidId, int duration)
        {
            log.Debug("StartManualIrrigationAction()");
            DeviceSolenoid sol = GetSolenoidById(solenoidId);
            IrrigationAction action = new IrrigationAction()
            {
                Name = string.Format("{0}", sol.Name),
                Start = DateTime.Now,
                Duration = duration,
                SolenoidId = solenoidId,
                SolenoidName = sol.Name,
                RequiresPump = sol.RequiresPump
            };
            CurrentAction = new DeviceAction(action, sol);
            log.DebugFormat("New DeviceAction {0} Id:{1} Start:{2} Duration:{3}", CurrentAction.Name, CurrentAction.Id, CurrentAction.Start, CurrentAction.Duration);
            CurrentAction.DeviceActionCompleted += OnDeviceActionCompleted;

            device.IrrigationActionId = CurrentAction.Id;
            device.Mode = DeviceMode.Manual;
            device.State = DeviceState.Irrigating;
            DataService.CreateEvent(EventTypes.IrrigationStart,
                    string.Format("Manual irrigation action: {0} for {1} minutes", CurrentAction.Solenoid.Name, CurrentAction.Duration),
                DeviceId);            
        }
        private void OnDeviceActionCompleted(object sender, EventArgs e)
        {
            log.DebugFormat("Irrigation Action '{0}' completed", CurrentAction.Name);

            DataService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} completed", CurrentAction.Name), device.Id);
            if (CurrentProgram != null)
            {
                CurrentProgram.CompleteStep();
                if (!CurrentProgram.Completed())
                {
                    StartProgramStep();
                    return;
                }
            }
            CurrentProgram = null;
            CurrentAction = null;
            device.ActiveProgramId = null;
            device.IrrigationActionId = null;
            device.IrrigationAction = null;
            device.State = DeviceState.Standby;
                      
            ReportStatus();
        }
        public void RunPrograms()
        {
            if (device.Mode != DeviceMode.Auto || CurrentAction != null)
            {
                //ignore scheduled programs if we are not in Auto mode or if there is an irrigation action running
                return;
            }

            if (CurrentProgram == null)
            {
                //find next program
                foreach (DeviceProgram p in Programs)
                {
                    log.DebugFormat("Looking for next program. Could it be '{0}' ?", p.Name);
                    if (p.Enabled && p.FinishedDate == null && p.PendingSteps.Count > 0)
                    {
                        log.DebugFormat("'{0}' StartDate: {1}, Now: {2} ",p.Name, p.StartDate, DateTime.Now);
                        if ((p.StartDate < DateTime.Now))// && 
                            //(p.StartDate.AddMinutes(p.TimeRemaining) > DateTime.Now))
                        {
                            log.DebugFormat("Found new program {0}", p.Name);
                            CurrentProgram = p;
                            device.ActiveProgramId = CurrentProgram.Id;
                            StartProgramStep();
                            return;
                        }
                    }
                }                
            }
            else
            {
                // no IrrigationAction in progress, start one now
                StartProgramStep();
            }
        }        
        public void ProcessCommands()
        {
            //log.Debug("ProcessCommands()");
            //get commands
            try
            {
                List<Command> commands =  DataService.Proxy.GetCommands(device.Id);                
                //log.DebugFormat("Retrieved {0} commands", commands.Count());
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
                                    StartManualIrrigationAction(solenoidId, duration);                                    
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

                            AbortAction();

                            ActionCommand(cmd);
                            break;
                        case "Pause":
                            if (CurrentAction != null)
                            {
                                if (!CurrentAction.IsPaused)
                                {
                                    CurrentAction.Pause();
                                    DataService.CreateEvent(EventTypes.IrrigationStop, "Paused", device.Id);
                                }
                            }
                            ActionCommand(cmd);
                            break;
                        case "Resume":
                            if (CurrentAction != null)
                            {
                                if (CurrentAction.IsPaused)
                                {
                                    CurrentAction.Resume();
                                    DataService.CreateEvent(EventTypes.IrrigationStart, "Resume", device.Id);
                                }
                            }
                            ActionCommand(cmd);
                            break;
                        case "LoadPrograms":
                            LoadPrograms();                                                 
                            ActionCommand(cmd);
                            break;

                        case "LoadProgram":
                            LoadProgram(cmd.Params);
                            ActionCommand(cmd);
                            break;

                        case "DeleteProgram":
                            DeleteProgram(cmd.Params);
                            ActionCommand(cmd);
                            break;

                        //load configuration
                        case "LoadConfig":
                            log.Info("LoadConfig");
                            LoadConfig();
                            log.Debug("About to action the command");
                            ActionCommand(cmd);
                            break;
                    }
                }               
            }
            catch (Exception ex)
            {
                log.ErrorFormat("ProcessCommands(): {0}", ex.Message);
            }
            //ReportStatus();
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
            if (CurrentAction != null)
            {
                CurrentAction.Stop();                
                log.DebugFormat("Action {0} aborted", CurrentAction.Name);
                DataService.CreateEvent(EventTypes.Application, string.Format("Action {0} aborted", CurrentAction.Name), device.Id);
                device.State = DeviceState.Standby;
                CurrentAction = null;
                CurrentProgram = null;
                device.IrrigationActionId = null;
                device.ActiveProgramId = null;
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
                timeRemaining = string.Format("{0} minutes", (int)CurrentAction.Remaining.TotalMinutes);
            }
            if (CurrentAction.Remaining.TotalMinutes > 120)
            {
                timeRemaining = string.Format("{0} hrs {1} mins", CurrentAction.Remaining.Hours, CurrentAction.Remaining.Minutes);
            }
            if (CurrentAction.Remaining.TotalSeconds < 120 && CurrentAction.Remaining.TotalSeconds > 60)
            {
                timeRemaining = "1 minute"; // string.Format("{0} minute", CurrentAction.Remaining.Minutes);
            }
            return timeRemaining;
        }
        public void ReportStatus()
        {
            string status = "Dunno what my status is yet";
            DeviceState state = DeviceState.Standby;
            if (device.Mode == DeviceMode.Manual)
            {
                status = "Standing by in manual mode.";
                state = DeviceState.Standby;
            }
            if (device.Mode == DeviceMode.Auto)
            {
                status = "Standing by. Waiting for next scheduled program to start.";
                state = DeviceState.Standby;
            }
            try
            {
                if (CurrentAction != null)
                {
                    //log.DebugFormat("CurrentAction: {0} Start:{1} Paused:{2} Finished:{3}", CurrentAction.Name, CurrentAction.Start, CurrentAction.Paused, CurrentAction.Finished);
                    //log.DebugFormat("CurrentAction.Finished is null {0}", CurrentAction.Finished == null);
                    if (CurrentAction.IsPaused)
                    {
                        state = DeviceState.Paused;
                        status = string.Format("Paused '{0}' - {1} remaining."
                                , CurrentAction.Solenoid.Name, getTimeRemaining());
                    }
                    else if (CurrentAction.Finished == null)
                    {
                        state = DeviceState.Irrigating;
                        status = string.Format("Irrigating '{0}' - {1} remaining."
                                , CurrentAction.Solenoid.Name, getTimeRemaining());
                    }
                    else
                    {
                        state = DeviceState.Standby;
                        status = string.Format("Standing by. Irrigation action {0} finished.", CurrentAction.Name);
                    }
                } 

                if (CurrentProgram != null)
                {
                    if (CurrentProgram.CurrentStep != null)
                    {
                        if (CurrentAction.IsPaused)
                        {
                            state = DeviceState.Paused;
                            status = string.Format("'{0}', step {1}. Paused '{2}', {3} remaining.",
                            CurrentProgram.Name, CurrentProgram.CurrentStep.Sequence, CurrentAction.Name, getTimeRemaining());
                        }
                        else
                        {
                            state = DeviceState.Irrigating;
                            status = string.Format("'{0}', step {1}. Irrigating '{2}', {3} remaining.",
                            CurrentProgram.Name, CurrentProgram.CurrentStep.Sequence, CurrentAction.Name, getTimeRemaining());
                        }
                    }
                    else
                    {
                        state = DeviceState.Standby;
                        status = string.Format("Program '{0}' active, but no active steps.", CurrentProgram.Name);
                    }
                }                
                      
                device.Status = status;
                device.State = state;
                log.DebugFormat("Device Status: {0} State: {1}", status, state.ToString());
                DataService.Proxy.PutDeviceStatus(device);
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
