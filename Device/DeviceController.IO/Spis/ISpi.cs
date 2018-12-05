using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DeviceController.Data;
using Raspberry.IO;
using Raspberry.IO.GeneralPurpose;
using Raspberry.IO.Components.Converters.Mcp3008;

namespace DeviceController.IO.Spis
{
    public interface ISpi
    {
        int Id { get; }        
        string Name { get; set; }
        ConnectorPin Clock { get; set; }
        ConnectorPin CS { get; set; }
        ConnectorPin MISO { get; set; }
        ConnectorPin MOSI { get; set; }              
    }
}
