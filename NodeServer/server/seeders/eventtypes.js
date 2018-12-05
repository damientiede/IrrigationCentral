const EventType = require('../models').EventType;

module.exports = {
   seed() {
      EventType
	.count()
	.then(c => { 
	   if (c ==0) {
	      EventType.create({Name:'Application',});
              EventType.create({Name:'Fault'});
              EventType.create({Name:'IO'});
              EventType.create({Name:'Irrigation start',Description:'Irrigation start event'});
              EventType.create({Name:'Irrigation stop',Description:'Irrigation stop event'});
              console.log('Created 5 event types');	   		
	   }
	})
   }
};
