const Alarm = require('../models').Alarm;

module.exports = {
   create(req, res) {      
        return Alarm
            .create({            
                Name: req.body.Name,
                Description: req.body.Description,
                HardwareType: req.body.HardwareType,            
                Address: req.body.Address,
                DeviceId: parseInt(req.body.DeviceId),
                Value:0
            })
            .then(alarm => res.status(201).send(alarm))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Alarm
            .findById(req.params.id)
            .then(alarm => res.status(200).send(alarm))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Alarm
            .findAll()
            .then(alarms => res.status(200).send(alarms))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Alarm
            .update({        
                DeviceId: parseInt(req.body.DeviceId),
                Name: req.body.Name,
                Description: req.body.Description,
                HardwareType: req.body.HardwareType,            
                Address: req.body.Address,
                Value: req.body.Value
            }, {
	            where: { Id: req.body.id }
            })
            .then(alarm => res.status(200).send(alarm))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
        return Alarm
        .findAll({
            where: {DeviceId: req.params.deviceId}        
        })
        .then(alarms => res.status(200).send(alarms))
        .catch(error => res.status(400).send(error));  
    },
    delete (req, res) {
        return Alarm.destroy({
            where: {
             id:req.params.id
            }
        })
        .then(affectedRows => res.status(204))
        .catch(error => res.status(400).send(error));
    }
};
