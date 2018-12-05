const Analog = require('../models').Analog;

module.exports = {
    seed() {
        Analog
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Analog.create({
                    Name:'Pump pressure',
                    Description:'Pressure in the head works',
                    HardwareType:'SPI',
                    Address:'0:0',	
                    Multiplier: 1.23,
                    RawValue: 0.0,
                    Units:'kPa',
                    DeviceId:1,		        
                    Value:0.0});

/*                 Analog.create({
                    Name:'Pump pressure',
                    Description:'Pressure in the head works',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.100/k2',	
                    Multiplier: 1.23,
                    RawValue: 0.0,
                    Units:'kPa',
                    DeviceId:1,		        
                    Value:0.0});
 */
                console.log('Created 1 analog record');	   		
	        }
	    })
    }
};
