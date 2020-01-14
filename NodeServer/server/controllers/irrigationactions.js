const IrrigationAction = require('../models').IrrigationAction;
const Utils = require('../utils');
const moment = require('moment');
const sequelize = require('sequelize');

module.exports = {
   create(req, res) {      
        return IrrigationAction
            .create({            
                Name: req.body.Name,
                Start: req.body.Start,
                Duration: req.body.Duration,
                SolenoidId: parseInt(req.body.SolenoidId),
                SolenoidName: req.body.SolenoidName,
                RequiresPump: req.body.RequiresPump,
                DeviceId: req.body.DeviceId
            })
            .then(irrigationAction => res.status(201).send(irrigationAction))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return IrrigationAction
            .findById(req.params.id)
            .then(irrigationAction => res.status(200).send(irrigationAction))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return IrrigationAction
            .findAll()
            .then(irrigationActions => res.status(200).send(irrigationActions))
            .catch(error => res.status(400).send(error));
   }, 
   update(req, res) {       
        return IrrigationAction
            .update({                    
                Finished: req.body.Finished, 
                Paused: req.body.Paused                                 
            }, {
                where: { Id: req.params.id }
            })
            .then(irrigationAction => res.status(200).send(irrigationAction))
            .catch(error => res.status(400).send(error));
   },  
   listByDevice(req, res) {       
        return IrrigationAction
            .findAll({
                where: {DeviceId: req.params.deviceId}        
            })
            .then(irrigationActions => res.status(200).send(irrigationActions))
            .catch(error => res.status(400).send(error));  
   },
   activeByDevice(req, res) {
       console.log(moment());
       return IrrigationAction
            .findOne({
                where: {
                    DeviceId: req.params.deviceId
                },
                order: [
                    ['CreatedAt','DESC']
                ],
                limit: 1               
            })
            .then(irrigationActions => res.status(200).send(irrigationActions))
            .catch(error => res.status(400).send(error));
   }
};