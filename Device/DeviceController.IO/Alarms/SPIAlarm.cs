using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.IO.Alarms
{
    public class SPIAlarm : IAlarm
    {
        public int Id { get; set; }
        public string Name { get; set; }        
        public string Address { get; set; }
        bool state;       
        public event AlarmStatusChangedEventHandler StatusChanged;
        public bool State
        {
            get { return state; }
            set
            {
                if (value != state)
                {
                    state = value;
                    AlarmStatusChangedEventArgs e = new AlarmStatusChangedEventArgs();
                    e.Value = state;
                    OnStatusChanged(e);                               
                }
            }
        }
        public SPIAlarm(int id, string name, string address)
        {
            Id = id;
            Name = name;
            Address = address;
        }
        protected virtual void OnStatusChanged(AlarmStatusChangedEventArgs e)
        {            
            if (StatusChanged != null)
            {
                StatusChanged(this, e);
            }
        }
        //public string Report()
        //{
        //    return string.Format("DistributedAlarm Id:{0} Name:{1} Address:{2} State:{3}", Id, Name, Address, State);
        //}
    }
}
