const CommandType = require('../models').CommandType;

module.exports = {
   seed() {
      CommandType
	.count()
	.then(c => { 
	   if (c ==0) {
	      CommandType.create({Title:'Shutdown',Description:'Quits the irrigation controller application'});
              CommandType.create({Title:'Auto',Description:'Changes to auto mode'});
              CommandType.create({Title:'Manual',Description:'Changes to manual mode'});
              CommandType.create({Title:'Off',Description:'Powers off all solenoids and stops all programs'});
              CommandType.create({Title:'GetSchedules',Description:'Instructs the controller to refresh the schedule cache'});
              CommandType.create({Title:'LoadConfig',Description:'Instructs the controller to reload its configuration'});
              console.log('Created 6 command types');	   		
	   }
	})
   }
};
