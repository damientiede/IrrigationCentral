using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Utils
{
    public static class UI
    {
        private static string GetTimeRemaining(TimeSpan span)
        {
            string timeRemaining = string.Empty;
            if (span.TotalSeconds < 60)
            {
                timeRemaining = string.Format("{0} seconds", Math.Floor(span.TotalSeconds));
            }
            if (span.TotalSeconds > 120)
            {
                timeRemaining = string.Format("{0} minutes", span.Minutes);
            }
            if (span.TotalMinutes > 120)
            {
                timeRemaining = string.Format("{0} hrs {1} mins", span.Hours, span.Minutes);
            }
            if (span.TotalSeconds < 120 && span.TotalSeconds > 60)
            {
                timeRemaining = "1 minute"; // string.Format("{0} minute", CurrentAction.Remaining.Minutes);
            }
            return timeRemaining;
        }
        //public void ReportStatus()
        //{
        //    string status = "Dunno what my status is yet";
        //    DeviceState state = DeviceState.Standby;
        //    try
        //    {
        //        if (CurrentAction != null)
        //        {
        //            if (CurrentAction.Finished == null)
        //            {
        //                state = DeviceState.Irrigating;
        //                status = string.Format("Irrigating '{0}' - {1} remaining."
        //                        , CurrentAction.Solenoid.Name, getTimeRemaining());
        //            }
        //            else
        //            {
        //                state = DeviceState.Standby;
        //                status = string.Format("Standing by. Irrigation action {0} finished.", CurrentAction.Name);
        //            }
        //            if (CurrentProgram != null)
        //            {
        //                if (CurrentProgram.CurrentStep != null)
        //                {
        //                    state = DeviceState.Irrigating;
        //                    status = string.Format("'{0}', step {1}. Irrigating '{2}', {3} remaining.",
        //                    CurrentProgram.Name, CurrentProgram.CurrentStep.Sequence, CurrentAction.Name, getTimeRemaining());
        //                }
        //                else
        //                {
        //                    state = DeviceState.Standby;
        //                    status = string.Format("Program '{0}' active, but no active steps.", CurrentProgram.Name);
        //                }
        //            }
        //        }
        //        else
        //        {
        //            if (device.Mode == DeviceMode.Manual)
        //            {
        //                status = "Standing by in manual mode.";
        //                state = DeviceState.Standby;
        //            }
        //            if (device.Mode == DeviceMode.Auto)
        //            {
        //                status = "Standing by. Waiting for next scheduled program to start.";
        //                state = DeviceState.Standby;
        //            }
        //        }
        //        device.Status = status;
        //        device.State = state;
        //        //log.DebugFormat("Device Status: {0} State: {1}", status, state.ToString());
        //        DataService.Proxy.PutDeviceStatus(device);
        //    }
        //    catch (Exception ex)
        //    {
        //        log.ErrorFormat("ReportStatus(): {0}", ex.Message);
        //    }
        //}
    }
}
