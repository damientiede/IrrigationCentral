const Device = require('../models').Device;

module.exports = {    
   seed(spis, analogs, solenoids, alarms, users, programs, steps, callback) {
      Device
	    .count()
	    .then(d => { 
	        if (d == 0) {
              Device.create({
                    Name:'SeedDevice1',
                    Description:'Seeded for testing - Gamma',
                    State:'Standby',
                    Mode:'Manual',
                    Status:'Seeded',
                    ScheduleId: 0,
                    Pressure:0.0,
                    Flowrate:0.0,
                    PumpSolenoidId:0,
                    SoftwareVersion:'0.0.1',
                    DeviceMAC:'B827EB1C9BA9'
                });
              Device.create({
                Name:'Aylesbury Walnuts',
                Description:'Orchard Irrigation Controller - Echo',
                State:'Standby',
                Mode:'Manual',
                Status:'Seeded',
                ScheduleId: 0,
                Pressure:0.0,
                Flowrate:0.0,
                PumpSolenoidId:0,
                SoftwareVersion:'0.0.1',
                DeviceMAC:'B827EBB3F8D1'
	          });
          console.log('Created 2 device records');	   		
	    }
    }); 

    if (typeof callback === "function")
    {
        console.log('About to call callback');
        callback(spis, analogs, solenoids, alarms, users, programs, steps);
    }
   }
};
