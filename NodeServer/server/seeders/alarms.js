const Alarm = require('../models').Alarm;

module.exports = {
    seed() {
        Alarm
	    .count()
	    .then(s => { 
	        if (s ==0) {
                Alarm.create({
                    Name:'Station1',
                    Description:'Test alarm 1',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.100/k2',	
                    DeviceId:1,		        
                    Value:0});
                Alarm.create({
                    Name:'Station2',                    
                    Description:'Test alarm 2',
                    HardwareType:'GPIO',
                    Address:'P1Pin28',	
                    DeviceId:1,		        
                    Value:0});
                Alarm.create({
                    Name:'Station3',
                    Description:'Test alarm 3',
                    HardwareType:'SPI',
                    Address:'1',	
                    DeviceId:1,		        
                    Value:0});
                Alarm.create({
                    Name:'Station4',
                    Description:'Test alarm 4',
                    HardwareType:'GPIO',
                    Address:'P1Pin21',
                    DeviceId:1,			        
                    Value:0});
                console.log('Created 4 alarms records');	   		
	        }
	    })
    }
};
