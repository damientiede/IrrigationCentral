const User = require('../models').User;
const bcrypt = require('bcrypt');

module.exports = {
   seed() {
    User
	    .count()
	    .then(u => { 
	        if (u ==0) {
                // create new user
                const salt = bcrypt.genSaltSync();
                const encryptedPassword = bcrypt.hashSync('irr-Habaner073', salt);   
                console.log(encryptedPassword);
                return User
                    .create({            
                        FirstName: 'Damien',
                        LastName: 'Tiede',
                        Email: 'damien@tiede.co.nz',  
                        Mobile: '64279201482',                                 
                        Password: encryptedPassword,
                        Salt: salt       
                    });
                
                console.log('Created 1 user record');	   		
	        }
	    })
   }
};
