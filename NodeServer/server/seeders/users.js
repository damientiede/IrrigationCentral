const User = require('../models').User;
const Device = require('../models').Device;

module.exports = {
    seed() {
        User.count().then(u => { 
	        if (u ==0) {
                const user1 = User.create({            
                        FirstName: 'Damien',
                        LastName: 'Tiede',
                        Email: 'damien@tiede.co.nz',  
                        Mobile: '64279201482',                                 
                        IsAdmin: true     
                });
                
                const user2 = User.create({            
                    FirstName: 'Damo',
                    LastName: 'Tiede',
                    Email: 'damien.tiede@gmail.com',  
                    Mobile: '64279201482',     
                    IsAdmin: false                                                   
                });
                console.log('Created 2 user records');	 

                //add device relations
                Device.count().then(d => {
                    console.log('there are '+d+' devices');
                });

                Device.findAll()
                    .then(devices => {
                        var device1 = devices[0];
                        console.log('Found: '+device1.Name);

                        for (let i =0; i < devices.count; i++) {   
                            devices[i].addUser(user1);
                            devices[i].addUser(user2);

                            //user1.addDevice(devices[i]);
                            //user2.addDevice(devices[i]);
                        }
                        console.log('Created '+devices.length+' userdevice records');
                    });  		
	        }
        });        
   }
};
