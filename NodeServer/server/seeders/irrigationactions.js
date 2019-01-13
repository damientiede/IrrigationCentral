const IrrigationAction = require('../models').IrrigationAction;

module.exports = {
   seed() {
    IrrigationAction
	.count()
	.then(c => { 
	   if (c ==0) {
        IrrigationAction.create(
              { 
                Name: 'Test irrigationaction',
                Start: new Date(),
                Duration: 65,
                SolenoidId: 1,
                SolenoidName: 'test solenoid 1',
                RequiresPump: true,
                DeviceId: 1
               });
              console.log('Created 1 IrrigationAction');	   		
	   }
	})
   }
};

