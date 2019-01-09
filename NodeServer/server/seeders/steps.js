const Step = require('../models').Step;
const Program = require('../models').Program;
const Solenoid = require('../models').Solenoid;

module.exports = {
    seed() {
        Step.count()
	    .then(s => { 
	        if (s ==0) {
                console.log('About to create step records');

                Program.findAll().then(p => {
                    if (p.length > 0) {
                        var program = p[0];
                    
                        Solenoid.findAll().then(s => {
                            if (s.length > 2) {
                                var step1 = Step.create({
                                    Sequence: 1,
                                    Duration: 60,
                                    SolenoidId: s[0].id,
                                    SolenoidName: s[0].Name,
                                    RequiresPump: true,
                                    IrrigationActionId: null,
                                    ProgramId: program.id });

                                var step2 = Step.create({
                                    Sequence: 3,
                                    Duration: 60,
                                    SolenoidId: s[1].id,
                                    SolenoidName: s[1].Name,
                                    RequiresPump: true,
                                    IrrigationActionId: null,
                                    PropgramId: program.id });

                                var step3 = Step.create({
                                    Sequence: 2,
                                    Duration: 60,
                                    SolenoidId: s[2].id,
                                    SolenoidName: s[2].Name,
                                    RequiresPump: true,
                                    IrrigationActionId: null,
                                    PropgramId: program.id });

                                console.log('Created 3 step records');
                            }                    
                        });
                    }
                });
            }
        });
        if (typeof callback === "function")
        {
            callback(steps);
        }
    }
}
