const Solenoid = require('../models').Solenoid;
const Utils = require('../utils');

module.exports = {
   create(req, res) {      
        return Solenoid
            .create({            
                Name: req.body.Name,
                Description: req.body.Description,
                HardwareType: req.body.HardwareType,            
                Address: req.body.Address,
                RequiresPump: req.body.RequiresPump,
                Value:0,
                DeviceId: req.body.DeviceId
            })
            .then(solenoid => res.status(201).send(solenoid))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Solenoid
            .findById(req.params.id)
            .then(solenoid => res.status(200).send(solenoid))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Solenoid
            .findAll()
            .then(solenoids => res.status(200).send(solenoids))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Solenoid.update({        
            DeviceId: parseInt(req.body.DeviceId),
            Name: req.body.Name,
            Description: req.body.Description,
            HardwareType: req.body.HardwareType,
            RequiresPump: req.body.RequiresPump,
            Address: req.body.Address,
            Value: parseInt(req.body.Value)
        }, {
	        where: { Id: req.params.id }
        })
        .then(solenoid => res.status(200).send(solenoid))
        .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {       
        return Solenoid
        .findAll({
            where: {DeviceId: req.params.deviceId}        
        })
        .then(solenoids => res.status(200).send(solenoids))
        .catch(error => res.status(400).send(error));  
   },
   delete (req, res) {
       return Solenoid.destroy({
           where: { Id: req.params.id }
       })
       .then(affectedRows => res.status(204))
       .catch(error => res.status(400).send(error));
   }
};
