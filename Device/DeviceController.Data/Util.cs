using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DeviceController.Data
{
    public static class Util
    {
        public static DateTime UtcToLocal(DateTime utc)
        {
            DateTime dtUtc = DateTime.SpecifyKind(DateTime.Parse(utc.ToString()), DateTimeKind.Utc);
            return dtUtc.ToLocalTime();
        }
    }
}
