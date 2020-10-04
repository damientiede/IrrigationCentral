using System;
using System.Timers;
using DeviceController.Data;
using log4net;

namespace DeviceController.Devices
{
    public class DeviceAction
    {
        ILog log = LogManager.GetLogger("Device");
        IrrigationAction irrigationAction;
        DateTime utcStart;
        DateTime localStart;
        DeviceSolenoid solenoid;
        Timer timer;
        bool bStopPumpOnCompletion = true;

        public int Id
        {
            get { return irrigationAction.Id; }
        }
        public string Name
        {
            get { return irrigationAction.Name; }
            set { irrigationAction.Name = value; }
        }
        public DateTime Start
        {
            get { return irrigationAction.Start; }
        }
        public DateTime? Finished
        {
            get { return irrigationAction.Finished;}
            set { irrigationAction.Finished = value;}
        }
        public DateTime? Paused
        {
            get { return irrigationAction.Paused; }
            //set { irrigationAction.Finished = value; }
        }
        public int Progress
        {
            get { return getProgress(); }
        }
        public int Duration
        {
            get { return irrigationAction.Duration; }
        }
        public bool IsPaused
        {
            get { return (irrigationAction.Paused != null); }
        }
        public double PauseSecondsElapsed
        {
            get
            {
                if (irrigationAction.Paused != null)
                {
                    return 0;
                }
                TimeSpan elapsed = DateTime.Now - (DateTime)irrigationAction.Paused;
                return elapsed.TotalSeconds;
            }
        }
        public DeviceSolenoid Solenoid
        {
            get { return solenoid; }
        }
        public int DeviceId
        {
            get { return irrigationAction.DeviceId; }
        }
        public IrrigationAction ActiveIrrigationAction
        {
            get { return irrigationAction; }
        }
        public bool StopPumpOnCompletion
        {
            get { return bStopPumpOnCompletion; }
            set { bStopPumpOnCompletion = value; }
        }
        
        public delegate void DeviceActionCompletedEventHandler(object sender, EventArgs e);
        public event DeviceActionCompletedEventHandler DeviceActionCompleted;

        public DeviceAction(IrrigationAction action, DeviceSolenoid sol)
        {
            solenoid = sol;
            irrigationAction = action;
            bStopPumpOnCompletion = irrigationAction.RequiresPump;

            if (this.irrigationAction.Id == 0)
            {
                this.irrigationAction.Id = DataService.Proxy.PostIrrigationAction(this.irrigationAction);
            }                        
                     
            if (!Completed)
            {                
                solenoid.On();
                if (solenoid.RequiresPump)
                {
                    if (IrrigationController.Pump != null)
                    {
                        IrrigationController.Pump.On();                        
                    }
                    else
                    {
                        log.Debug("Device.Pump is NULL!");
                    }
                }                
            }
            InitTimer();
        }
        //public DeviceAction(string name, int duration, DeviceSolenoid sol)
        //{
        //    log.Debug("DeviceAction()");
        //    solenoid = sol;
        //    this.irrigationAction = new IrrigationAction()
        //    {
        //        Name = name,
        //        Start = DateTime.Now,
        //        Duration = duration,
        //        DeviceId = IrrigationController.DeviceId,
        //        SolenoidId = solenoid.Id,
        //        SolenoidName = solenoid.Name
        //    };
        //    this.irrigationAction.Id = DataService.Proxy.PostIrrigationAction(this.irrigationAction);
        //    solenoid.On();
        //    if (solenoid.RequiresPump)
        //    {
        //        if (IrrigationController.Pump != null)
        //        {
        //            IrrigationController.Pump.On();
        //        }
        //        else
        //        {
        //            log.Debug("Device.Pump is NULL!");
        //        }                
        //    }
        //    InitTimer();
        //}
        protected void InitTimer()
        {
            log.DebugFormat("Starting timer for {0}",Name);
            timer = new Timer(1000);
            timer.Elapsed += Timer_Elapsed;
            timer.Enabled = true;
        }
        protected int getProgress()
        {
            DateTime dtFinish = irrigationAction.Start.AddMinutes(irrigationAction.Duration);
            int duration = irrigationAction.Duration;
            if (irrigationAction.Paused != null)
            {
                TimeSpan tsElapsedSincePaused = DateTime.Now - (DateTime)irrigationAction.Paused;
                //log.DebugFormat("Paused: {1} ElapsedSincePaused: {0} secs", tsElapsedSincePaused.TotalSeconds, irrigationAction.Paused.ToString());
                dtFinish = dtFinish.Add(tsElapsedSincePaused);
                duration += (int)tsElapsedSincePaused.TotalSeconds;
            }
            //return irrigationAction.Start.AddMinutes(irrigationAction.Duration) - DateTime.Now;
            TimeSpan tsRemaining = dtFinish - DateTime.Now;
            //log.DebugFormat("Finish: {0} Remaining: {1}", dtFinish.ToString(), tsRemaining.TotalSeconds);

            return (int)(tsRemaining.TotalMinutes/duration)*100;
        }
        private void Timer_Elapsed(object sender, ElapsedEventArgs e)
        {
            //log.DebugFormat("{0} Timer_Elapsed()", this.Name);
            if (Completed)
            {
                Stop();                             
                if (DeviceActionCompleted != null)
                {
                    log.Debug("Calling ProgramCompleted");
                    //EventArgs ea = new EventArgs();                    
                    DeviceActionCompleted(this, null);
                }                
            }
            else
            {
                timer.Interval = 1000;
            }            
        }
        public void Pause()
        {
            log.DebugFormat("Pause() Action:{0} StopPumpOnCompletion:{1}", Name, bStopPumpOnCompletion);
            timer.Enabled = false;
            //timer.Dispose();
            solenoid.Off();
            if (solenoid.RequiresPump && bStopPumpOnCompletion)
            {
                IrrigationController.Pump.Off();
            }
            irrigationAction.Paused = DateTime.Now;
            DataService.Proxy.PutIrrigationAction(irrigationAction);
        }
        public void Resume()
        {
            log.DebugFormat("Resume() Action:{0} StopPumpOnCompletion:{1}", Name, bStopPumpOnCompletion);
            timer.Enabled = true;
            //timer.Dispose();
            solenoid.On();
            if (solenoid.RequiresPump && bStopPumpOnCompletion)
            {
                IrrigationController.Pump.On();
            }
            //add the elapsed time that the device was paused to the action duration
            TimeSpan elapsed = DateTime.Now - (DateTime)irrigationAction.Paused;

            irrigationAction.Duration += (int)(elapsed.TotalMinutes);
            //irrigationAction.Start = irrigationAction.Start.AddSeconds(elapsed.TotalSeconds);
            irrigationAction.Paused = null;
            DataService.Proxy.PutIrrigationAction(irrigationAction);
        }
        public void Stop()
        {
            log.DebugFormat("Stop() Action:{0} StopPumpOnCompletion:{1}", Name, bStopPumpOnCompletion);
            timer.Enabled = false;
            timer.Dispose();
            solenoid.Off();
            if (solenoid.RequiresPump && bStopPumpOnCompletion)
            {
                IrrigationController.Pump.Off();
            }
            irrigationAction.Finished = DateTime.Now;
            DataService.Proxy.PutIrrigationAction(irrigationAction);
            //DataService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} stopped", Name),irrigationAction.DeviceId);
        }
        public bool Completed
        {
            get
            {
                //log.DebugFormat("Completed() {0} Start:{1) ProjectedFinish:{2} Now:{3}", 
                //    irrigationAction.Name,
                //    irrigationAction.Start.ToString(), 
                //    irrigationAction.Start.AddMinutes(irrigationAction.Duration).ToString(),
                //    DateTime.Now.ToString());
                if (irrigationAction.Paused != null)
                {
                    return false;
                }
                return irrigationAction.Start.AddMinutes(irrigationAction.Duration) < DateTime.Now;
            }
        }
        public TimeSpan Remaining
        {
            get
            {
                DateTime dtFinish = irrigationAction.Start.AddMinutes(irrigationAction.Duration);
                if (irrigationAction.Paused != null)
                {
                    TimeSpan tsElapsedSincePaused = DateTime.Now - (DateTime)irrigationAction.Paused;
                    //log.DebugFormat("Paused: {1} ElapsedSincePaused: {0} secs", tsElapsedSincePaused.TotalSeconds, irrigationAction.Paused.ToString());
                    dtFinish = dtFinish.Add(tsElapsedSincePaused);
                    //irrigationAction.Duration += (int)tsElapsedSincePaused.TotalSeconds;
                }
                //return irrigationAction.Start.AddMinutes(irrigationAction.Duration) - DateTime.Now;
                TimeSpan tsRemaining = dtFinish - DateTime.Now;
                //log.DebugFormat("Finish: {0} Remaining: {1}", dtFinish.ToString(), tsRemaining.TotalSeconds);
                if (tsRemaining.TotalSeconds < 0)
                {
                    return new TimeSpan(0);
                }
                return tsRemaining;
            }
        }
    }
}
