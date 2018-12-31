const User = require('../models').User;
const Device = require('../models').Device;
const bcrypt = require('bcrypt');

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
                Device.findAll()
                    .then((devices) => {
                        for (let i =0; i < devices.count; i++) {                    
                            user1.addDevice(devices[i]);
                            user2.addDevice(devices[i]);
                        }
                        console.log('Created 2 userdevice records');
                    });  		
	        }
        });        
   }
};
