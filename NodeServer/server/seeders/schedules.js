const Schedule = require('../models').Schedule;

module.exports = {
    seed() {
        Schedule
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Schedule.create({
                    Name:'Evening Shelter',
                    Description:'Run the shelter belts at night',
                    StartDate: new Date(2017,11,3,0),
                    StartHours:22,
                    StartMins:0,
                    Duration:10,	
                    Days:'1,2,3,4',
                    Repeat:1,                    
                    Enabled:1,
                    DeviceId:1,
                    SolenoidId:1     
                    });
                Schedule.create({
                    Name:'Block 1',
                    Description:'Irrigate block 1 for 3 hours',
                    StartDate: new Date(2017,11,3,8,15),
                    StartHours:22,
                    StartMins:15,
                    Duration:10,                    
                    Days:'5,6,7',	
                    Repeat:1,                    
                    Enabled:1,
                    DeviceId:1,
                    SolenoidId:2      
                    });

                console.log('Created 2 schedules');	   		
	        }
	    })
    }
};
