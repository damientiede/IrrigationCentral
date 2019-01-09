using System;
using System.Collections;
using System.Collections.Generic;
using DeviceController.IO;
using DeviceController.IO.Solenoids;
using DeviceController.Data;
using log4net;

namespace DeviceController.Devices
{
    public class DeviceProgram
    {
        DeviceController.Data.Program program;
        int currentStep = 0;
        List<Step> deviceSteps;
        public string Name
        {
            get { return program.Name; }
        }
        public DateTime StartDate
        {
            get { return program.Start; }
        }
        public bool Enabled
        {
            get { return program.Enabled; }
        }
        public List<Step> Steps
        {
            get { return deviceSteps; }
        }
        public Step CurrentStep
        {
            get
            {
                if (currentStep == null)
                {
                    return null;
                }
                else
                {
                    return deviceSteps[currentStep];
                }
            }
        }
        public DeviceProgram(DeviceController.Data.Program p, int? currentStep)
        {
            program = p;
            deviceSteps = new List<Step>();
            for (int i = 0; i < p.Steps.Length; i++)
            {
                foreach (Step s in p.Steps)
                {
                    if (s.Sequence == i)
                    {
                        deviceSteps.Add(s);
                    }                    
                }
            }     
            if (currentStep != null)
            {
                this.currentStep = (int)currentStep;
            }    
        }
        public void Start()
        {
            if (CurrentStep == null)
            {
                foreach (Step step in Steps)
                {
                    if (step.IrrigationActionId == null)
                    {
                        // Start new irrigation action
                        // set current step
                    }
                }
                
            }            
        }
    }
}
