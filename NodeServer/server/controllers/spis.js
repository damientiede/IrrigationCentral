const Spi = require('../models').Spi;

module.exports = {
   create(req, res) {      
        return Spi
            .create({   
                Name: req.body.Name,                         
                Description: req.body.Description,                
                Clock: parseInt(req.body.Clock),            
                CS: parseInt(req.body.CS),            
                MISO: parseInt(req.body.MISO),            
                MOSI: parseInt(req.body.MOSI), 
                DeviceId: parseInt(req.body.DeviceId)
            })
            .then(spi => res.status(201).send(spi))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Spi
            .findById(req.params.id)
            .then(spi => res.status(200).send(spi))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Spi
            .findAll({ 
                where: { DeviceId: parseInt(req.params.deviceId) }
	        })
            .then(spis => res.status(200).send(spis))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Spi
            .update({                        
                Name: req.body.Name,
                Clock: parseInt(req.body.Clock),            
                CS: parseInt(req.body.CS),            
                MISO: parseInt(req.body.MISO),            
                MOSI: parseInt(req.body.MOSI)           
            }, {
	            where: { Id: req.body.id }
            })
            .then(spi => res.status(200).send(spi))
            .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {    
        return Spi
        .findAll({
            where: {DeviceId: req.params.deviceId}        
        })
        .then(spis => res.status(200).send(spis))
        .catch(error => res.status(400).send(error));  
        }
};
