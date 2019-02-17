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

                const user3 = User.create({            
                    FirstName: 'Maria',
                    LastName: 'Tiede',
                    Email: 'maria.tiede76@gmail.com',  
                    Mobile: '64212170993',     
                    IsAdmin: false                                                   
                });

                const user4 = User.create({            
                    FirstName: 'Anna',
                    LastName: 'Brenmuhl',
                    Email: 'annabrenmuhl@hotmail.com',  
                    Mobile: '6421961948',     
                    IsAdmin: false                                                   
                });

                const user5 = User.create({            
                    FirstName: 'Frank',
                    LastName: 'Brenmuhl',
                    Email: 'frank@brenmuhl.com',  
                    Mobile: '64272244009',     
                    IsAdmin: false                                                   
                });

                const user6 = User.create({            
                    FirstName: 'Margaret',
                    LastName: 'Brenmuhl',
                    Email: 'margaret@brenmuhl.com',  
                    Mobile: '64272795520',     
                    IsAdmin: false                                                   
                });
                console.log('Created 6 user records');	                 
            }        
        });
    }
}
