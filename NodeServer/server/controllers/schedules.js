const Schedule = require('../models').Schedule;

module.exports = {
   create(req, res) {   
       console.log(req.body);   
        return Schedule
            .create({            
                Name: req.body.Name,
                StartDate: new Date(req.body.StartDate),
                StartHours: req.body.StartHours,
                StartMins: req.body.StartMins,
                Duration: parseInt(req.body.Duration),  
                Days: req.body.Days,          
                Repeat: req.body.Repeat,                
                Enabled: req.body.Enabled,
                SolenoidId: parseInt(req.body.SolenoidId),
                DeviceId: parseInt(req.body.DeviceId)
            })
            .then(schedule => res.status(201).send(schedule))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Schedule
            .findById(req.params.id)
            .then(schedule => res.status(200).send(schedule))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Schedule
            .findAll()
            .then(schedules => res.status(200).send(schedules))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Schedule
            .update({        
                Name: req.body.Name,
                StartDate: new Date(req.body.StartDate),
                StartHours: parseInt(req.body.StartHours),
                StartMins: parseInt(req.body.StartMins),
                Duration: parseInt(req.body.Duration), 
                Days: req.body.Days,              
                Repeat: req.body.Repeat,
                Interval: parseInt(req.body.Interval),
                Enabled:req.body.Enabled,
                SolenoidId: parseInt(req.body.SolenoidId),
                DeviceId: parseInt(req.body.DeviceId)
            }, {
	            where: { Id: parseInt(req.body.id) }
            })
            .then(schedule => res.status(200).send(schedule))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
    return Schedule
    .findAll({
        where: {DeviceId: req.params.deviceId}        
    })
    .then(schedules => res.status(200).send(schedules))
    .catch(error => res.status(400).send(error));  
    },
    delete (req, res) {
        return Schedule.destroy({
            where: { Id: req.params.id }
        })
        .then(affectedRows => res.status(204))
        .catch(error => res.status(400).send(error));
    }
};
