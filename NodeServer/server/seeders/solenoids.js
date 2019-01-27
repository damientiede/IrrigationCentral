const Solenoid = require('../models').Solenoid;

module.exports = {
    seed(programs, steps, callback) {
       Solenoid
	    .count()
	    .then(s => { 
	        if (s ==0) {
                // Aylesbury Walnuts solenoids
                Solenoid.create({
                    Name:'Pump',
                    Description:'Pump solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k01',
                    RequiresPump:false,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 1',
                    Description:'Block 1 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k02',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 2',
                    Description:'Block 2 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k03',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 3',
                    Description:'Block 3 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k04',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 4',
                    Description:'Block 4 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k05',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 5',
                    Description:'Block 5 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k06',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 6',
                    Description:'Block 6 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k06',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 7',
                    Description:'Block 7 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k08',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 8',
                    Description:'Block 8 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k01',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 9',
                    Description:'Block 9 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k02',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 10',
                    Description:'Block 10 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k03',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 11',
                    Description:'Block 11 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k04',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 12',
                    Description:'Block 12 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k05',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 13',
                    Description:'Block 13 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k06',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 14',
                    Description:'Block 14 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k07',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                /* Solenoid.create({
                    Name:'Pump',
                    Description:'Breadboard test LED',
                    HardwareType:'GPIO',
                    Address:'P1Pin36',
                    RequiresPump:true,
                    DeviceId:1,			        
                    Value:0});
                Solenoid.create({
                    Name:'Station 1',
                    Description:'Station1 solenoid',
                    HardwareType:'GPIO',
                    Address:'P1Pin32',
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
                Solenoid.create({
                    Name:'Pooh corner',
                    Description:'Test solenoid 5',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.152/k01',
                    RequiresPump:true,	
                    DeviceId:1,		        
                    Value:0}); */
                // Aylesbury Walnuts solenoids
                Solenoid.create({
                    Name:'Pump',
                    Description:'Pump solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k01',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 1',
                    Description:'Block 1 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k02',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 2',
                    Description:'Block 2 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k03',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 3',
                    Description:'Block 3 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k04',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 4',
                    Description:'Block 4 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k05',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 5',
                    Description:'Block 5 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k06',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 6',
                    Description:'Block 6 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k06',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 7',
                    Description:'Block 7 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k08',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 8',
                    Description:'Block 8 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k01',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 9',
                    Description:'Block 9 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k02',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 10',
                    Description:'Block 10 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k03',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 11',
                    Description:'Block 11 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.150/k04',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 12',
                    Description:'Block 12 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k05',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 13',
                    Description:'Block 13 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k06',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                Solenoid.create({
                    Name:'Block 14',
                    Description:'Block 14 solenoid',
                    HardwareType:'Distributed',
                    Address:'http://192.168.1.151/k07',
                    RequiresPump:true,
                    DeviceId:2,			        
                    Value:0});
                console.log('Created 14 solenoid records for Aylesbury Walnuts');	   		
	        }
        });
        if (typeof callback === "function")
        {
            callback(programs, steps);
        }
    }
};
