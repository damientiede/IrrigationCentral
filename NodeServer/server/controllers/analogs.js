const Analog = require('../models').Analog;

module.exports = {
   create(req, res) {      
        return Analog
            .create({            
                Name: req.body.Name,
                Description: req.body.Description,
                HardwareType: req.body.HardwareType,            
                Address: req.body.Address,
                Multiplier: parseFloat(req.body.Multiplier),
                RawValue: 0,
                Units: req.body.Units,
                DeviceId: parseInt(req.body.DeviceId),
                Value:0
            })
            .then(analog => res.status(201).send(analog))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Analog
            .findById(req.params.id)
            .then(analog => res.status(200).send(analog))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Analog
            .findAll()
            .then(analog => res.status(200).send(analog))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Analog
            .update({        
                Name: req.body.Name,
                Description: req.body.Description,
                HardwareType: req.body.HardwareType,            
                Address: req.body.Address,
                Multiplier: parseFloat(req.body.Multiplier),
                RawValue: parseInt(req.body.RawValue),
                Units: req.body.Units,
                DeviceId: parseInt(req.body.DeviceId),
                Value:parseFloat(req.body.Value)
            }, {
	            where: { Id: req.body.id }
            })
            .then(analog => res.status(200).send(analog))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
        return Analog
        .findAll({
            where: {DeviceId: req.params.deviceId}        
        })
        .then(analogs => res.status(200).send(analogs))
        .catch(error => res.status(400).send(error));  
        }
};
