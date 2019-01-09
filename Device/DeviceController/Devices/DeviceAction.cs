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
        DeviceSolenoid solenoid;
        Schedule schedule;
        Timer timer;
        public string Name
        {
            get { return irrigationAction.Name; }
            set { irrigationAction.Name = value; }
        }
        public DateTime Start
        {
            get { return irrigationAction.Start; }
        }
        public DateTime Finished
        {
            get { return irrigationAction.Finished;}
            set { irrigationAction.Finished = value;}
        }
        public int Duration
        {
            get { return irrigationAction.Duration; }
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
        public Schedule ActiveSchedule
        {
            get { return schedule; }
            set { schedule = value; }
        }
        public delegate void DeviceActionCompletedEventHandler(object sender, EventArgs e);
        public event DeviceActionCompletedEventHandler DeviceActionCompleted;

        public DeviceAction(IrrigationAction action, DeviceSolenoid sol)
        {
            solenoid = sol;
            irrigationAction = action;
            if (!Completed)
            {
                if (!solenoid.IsOn())
                {
                    solenoid.On();
                    if (solenoid.RequiresPump)
                    {
                        if (IrrigationController.Pump != null)
                        {
                            if (!IrrigationController.Pump.IsOn())
                            {
                                IrrigationController.Pump.On();
                            }
                        }
                        else
                        {
                            log.Debug("Device.Pump is NULL!");
                        }
                    }
                }
            }
            InitTimer();
        }
        public DeviceAction(string name, int duration, DeviceSolenoid sol)
        {
            log.Debug("DeviceAction()");
            solenoid = sol;
            this.irrigationAction = new IrrigationAction()
            {
                Name = name,
                Start = DateTime.Now,
                Duration = duration,
                DeviceId = IrrigationController.DeviceId,
                SolenoidId = solenoid.Id,
                SolenoidName = solenoid.Name
            };
            this.irrigationAction.Id = DataService.Proxy.PostIrrigationAction(this.irrigationAction);
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
            InitTimer();
        }
        protected void InitTimer()
        {
            log.Debug("Starting timer");
            timer = new Timer(1000);
            timer.Elapsed += Timer_Elapsed;
            timer.Enabled = true;
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

        public void Stop()
        {
            log.Debug("Stop()");
            timer.Enabled = false;
            timer.Dispose();
            solenoid.Off();
            if (solenoid.RequiresPump)
            {
                IrrigationController.Pump.Off();
            }
            irrigationAction.Finished = DateTime.Now;
            DataService.Proxy.PutIrrigationAction(irrigationAction);
            DataService.CreateEvent(EventTypes.IrrigationStop, string.Format("{0} stopped", Name),irrigationAction.DeviceId);
        }
        public bool Completed
        {
            get
            {
                return (irrigationAction.Start.AddMinutes(irrigationAction.Duration) < DateTime.Now);
            }
        }
        public TimeSpan Remaining
        {
            get
            {
                return (irrigationAction.Start.AddMinutes(irrigationAction.Duration) - DateTime.Now);
            }
        }
    }
}
