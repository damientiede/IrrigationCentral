const Account = require('../models').Account;

module.exports = {
   seed() {
    Account
	    .count()
	    .then(a => { 
	        if (a ==0) {
                Account.create({
                    Name:'Test account 1',
                    Address: '123 Test Street, Testville'
	            });
                console.log('Created 1 device record');	   		
	        }
	    })
   }
};
