const Step = require('../models').Step;
const Solenoid = require('../models').Solenoid;

module.exports = {
    seed() {
        Step.count()
	    .then(s => { 
	        if (s ==0) {
                console.log('About to create step records');

                Solenoid.findAll().then(s => {
                    if (s.length > 2) {
                        var step1 = Step.create({
                            Sequence: 1,
                            Duration: 60,
                            SolenoidId: s[0].id,
                            SolenoidName: s[0].Name,
                            RequiresPump: true,
                            IrrigationActionId: null,
                            ProgramId: 1 });

                        var step2 = Step.create({
                            Sequence: 3,
                            Duration: 60,
                            SolenoidId: s[1].id,
                            SolenoidName: s[1].Name,
                            RequiresPump: true,
                            IrrigationActionId: null,
                            PropgramId: 1 });

                        var step1 = Step.create({
                            Sequence: 2,
                            Duration: 60,
                            SolenoidId: s[2].id,
                            SolenoidName: s[2].Name,
                            RequiresPump: true,
                            IrrigationActionId: null,
                            PropgramId: 1 });

                        console.log('Created 3 step records');
                    }                    
                })

            }
        });
        if (typeof callback === "function")
        {
            callback(steps);
        }
    }
}
