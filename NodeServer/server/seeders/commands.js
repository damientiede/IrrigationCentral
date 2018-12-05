const Command = require('../models').Command;

module.exports = {
   seed() {
      Command
	.count()
	.then(c => { 
	   if (c ==0) {
	      Command.create(
              { CommandType:3,
                Params:'1,360',
                Issued: new Date()
               });
              console.log('Created 1 command');	   		
	   }
	})
   }
};

