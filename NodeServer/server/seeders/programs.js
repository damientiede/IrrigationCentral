const Program = require('../models').Program;

module.exports = {
    seed(steps, callback) {
       Program
	    .count()
	    .then(s => { 
	        if (s ==0) {

                var program1 = Program.create({
                    Name:'Spring program 1',
                    Start: new Date(),
                    Enabled: true,
                    DeviceId: 1 });
               
                var program2 = Program.create({
                    Name:'Spring program 2',
                    Start: new Date(),
                    Enabled: true,
                    DeviceId: 1 });

                var program3 = Program.create({
                    Name:'Spring program 3',
                    Start: new Date(),
                    Enabled: true,
                    DeviceId: 1 });

                console.log('Created 3 program records');	   		

            }
        });
        if (typeof callback === "function")
        {
            callback(steps);
        }
    }
}
