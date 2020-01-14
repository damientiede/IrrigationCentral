using System;
using System.Linq;
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
        ILog log = LogManager.GetLogger("Device");

        DeviceController.Data.Program program;
        int currentStep = 0;
        List<Step> pendingSteps;
        //List<Step> completedSteps;
        public int Id
        {
            get { return program.Id; }
        }
        public string Name
        {
            get { return program.Name; }
        }
        public DateTime StartDate
        {
            get { return program.Start; }
        }
        public DateTime? FinishedDate
        {
            get { return program.Finished; }
        }
        public bool Enabled
        {
            get { return program.Enabled; }
        }
        public DateTime Updated
        {
            get { return program.UpdatedAt; }
        }
        public int TimeRemaining
        {
            get
            {
                int total = 0;
                foreach (Step step in pendingSteps)
                {
                    total += step.Duration;
                }
                return total;
            }
        }
        public List<Step> PendingSteps
        {
            get { return pendingSteps; }
        }
        public Step CurrentStep
        {
            get
            {
                if (program.CurrentStep == null)
                {
                    return null;
                }
                else
                {                    
                    foreach (Step step in pendingSteps)
                    {                        
                        if (step.Sequence == program.CurrentStep)
                        {                                                       
                            return step;
                        }
                    }
                    return null;
                }
            }
        }
        public Step NextStep
        {
            get
            {                
                return pendingSteps[0];                
            }
        }
        public DeviceProgram(DeviceController.Data.Program p)
        {
            program = p;
            pendingSteps = new List<Step>();

            foreach (Step s in p.Steps)
            {
                if (s.IrrigationAction != null)
                {
                    if (s.IrrigationAction.Finished == null)
                    {
                        pendingSteps.Add(s);                       
                    }                    
                }
                pendingSteps.Add(s);                
            }                 
            log.DebugFormat("DeviceProgram.Create() - {0} steps", pendingSteps.Count);  
        }
        public bool Completed()
        {
            return program.Finished != null;
        }
        public void CompleteStep()
        {
            Step s = CurrentStep;
            pendingSteps.Remove(s);
            program.CurrentStep = null;
            if (pendingSteps.Count == 0)
            {
                program.Finished = DateTime.Now;                
            }
            log.DebugFormat("DeviceProgram.CompleteStep() {0} steps remaining", pendingSteps.Count);
            DataService.Proxy.PutProgram(program);
        }
        public IrrigationAction StartNextStep()
        {
            IrrigationAction irrigationAction = null;
            if (FinishedDate != null)  
            {
                log.DebugFormat("Looks like this program is already finished");
                return null;
            }
            if (pendingSteps.Count == 0)
            {
                log.DebugFormat("No steps pending for this program");
                return null;
            }
            Step currentStep = CurrentStep;
            log.DebugFormat("CurrentStep is {0}", program.CurrentStep);
            if (currentStep != null)
            {
                if (currentStep.IrrigationAction == null)
                {
                    return CreateIrrigationAction(currentStep);
                }
                else
                {
                    if (currentStep.IrrigationAction.Finished == null)
                    {
                        return currentStep.IrrigationAction;
                    }
                    else
                    {
                        program.CurrentStep = null;
                    }                    
                }
            }
            //find the next step in the sequence
            log.Debug("DeviceProgram.StartNextStep()");
            var orderedSteps = pendingSteps.AsQueryable<Step>().OrderBy(s => s.Sequence);
            foreach (Step step in orderedSteps)
            {                
                if (step.IrrigationAction == null)
                {
                    // Start new irrigation action
                    log.DebugFormat("DeviceProgram.StartNextStep() {0}", step.Sequence);
                    return CreateIrrigationAction(step);
                }
                else
                {
                    //resume existing step
                    if (step.IrrigationAction.Finished == null)
                    {                        
                        program.CurrentStep = step.Sequence;
                        DataService.Proxy.PutProgram(program);
                        return step.IrrigationAction;                        
                    }                    
                }
            }
            //could not find a pending step - program must be finished
            program.Finished = DateTime.Now;
            program.CurrentStep = null;
            pendingSteps.Clear();
            DataService.Proxy.PutProgram(program);
            return null;
        }
        protected IrrigationAction CreateIrrigationAction(Step step)
        {
            log.Debug("DeviceProgram.CreateIrrigationAction()");
            IrrigationAction irrigationAction = new IrrigationAction()
            {
                Name = step.SolenoidName,
                SolenoidName = step.SolenoidName,
                SolenoidId = step.SolenoidId,
                Start = DateTime.Now, //.ToUniversalTime(),
                Duration = step.Duration,
                RequiresPump = step.RequiresPump,
                DeviceId = program.DeviceId
            };
            int id = DataService.Proxy.PostIrrigationAction(irrigationAction);
            irrigationAction.Id = id;
            step.IrrigationActionId = id;
            DataService.Proxy.PutStep(step);
            program.CurrentStep = step.Sequence;
            DataService.Proxy.PutProgram(program);
            return irrigationAction;
        }
    }
}
