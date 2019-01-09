const Program = require('../models').Program;
const Step = require('../models').Step;

module.exports = {
   create(req, res) {   
       console.log(req.body);   
        return Program
            .create({            
                Name: req.body.Name,
                Start: new Date(req.body.Start),
                Duration: parseInt(req.body.Duration),  
                Enabled: req.body.Enabled,
                DeviceId: parseInt(req.body.DeviceId)
            })
            .then(program => res.status(201).send(program))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Program
            .find({
                where: { id: req.params.id},
                //include: [{model: Step}] })
                include: [{model: Step, as: 'Steps'}] 
            })
            .then(program => res.status(200).send(program))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Program
            .findAll({
                include: [{model: Step, as: 'Steps'}] 
                //include: [{model: Step}]
            })
            .then(programs => res.status(200).send(programs))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Program
            .update({        
                Name: req.body.Name,
                Start: new Date(req.body.Start),
                Duration: parseInt(req.body.Duration), 
                Enabled:req.body.Enabled,
                DeviceId: parseInt(req.body.DeviceId)
            }, {
	            where: { id: parseInt(req.body.id) }
            })
            .then(program => res.status(200).send(program))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
        return Program
            .findAll({
                include: [{model: Step, as: 'Steps'}],
                where: {DeviceId: req.params.deviceId}        
            })
            .then(programs => res.status(200).send(programs))
            .catch(error => res.status(400).send(error));  
    },
    delete (req, res) {
        return Program
            .destroy({
                where: { Id: req.params.id }
            })
            .then(affectedRows => res.status(204))
            .catch(error => res.status(400).send(error));
    }
};
