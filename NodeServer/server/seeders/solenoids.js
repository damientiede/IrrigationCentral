const Solenoid = require('../models').Solenoid;

module.exports = {
    seed(programs, steps, callback) {
       Solenoid
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Solenoid.create({
                    Name:'Station1',
                    Description:'Test solenoid 1',
                    HardwareType:'GPIO',
                    Address:'P1Pin32',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Station2',
                    Description:'Test solenoid 2',
                    HardwareType:'GPIO',
                    Address:'P1Pin36',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Station3',
                    Description:'Test solenoid 3',
                    HardwareType:'GPIO',
                    Address:'P1Pin38',
                    RequiresPump:false,	
                    DeviceId:1,		        
                    Value:0});
                Solenoid.create({
                    Name:'Station4',
                    Description:'Test solenoid 4',
                    HardwareType:'GPIO',
                    Address:'P1Pin40',
                    RequiresPump:false,	
                    DeviceId:1,		        
                    Value:0});
                console.log('Created 4 solenoid records');	   		
	        }
        });
        if (typeof callback === "function")
        {
            callback(programs, steps);
        }
    }
};
