const IrrigationProgram = require('../models').IrrigationProgram;
const Utils = require('../utils');
const moment = require('moment');
const sequelize = require('sequelize');

module.exports = {
   create(req, res) {      
        return IrrigationProgram
            .create({            
                Name: req.body.Name,
                Start: req.body.Start,
                Duration: req.body.Duration,
                SolenoidId: parseInt(req.body.SolenoidId),
                SolenoidName: req.body.SolenoidName,
                RequiresPump: req.body.RequiresPump,
                DeviceId: req.body.DeviceId
            })
            .then(irrigationProgram => res.status(201).send(irrigationProgram))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return IrrigationProgram
            .findById(req.params.id)
            .then(irrigationProgram => res.status(200).send(irrigationProgram))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return IrrigationProgram
            .findAll()
            .then(irrigationPrograms => res.status(200).send(irrigationPrograms))
            .catch(error => res.status(400).send(error));
   }, 
   update(req, res) {       
        return IrrigationProgram
            .update({                    
                Finished: req.body.Finished,                                  
            }, {
                where: { Id: req.params.id }
            })
            .then(irrigationProgram => res.status(200).send(irrigationProgram))
            .catch(error => res.status(400).send(error));
   },  
   listByDevice(req, res) {       
        return IrrigationProgram
            .findAll({
                where: {DeviceId: req.params.deviceId}        
            })
            .then(irrigationPrograms => res.status(200).send(irrigationPrograms))
            .catch(error => res.status(400).send(error));  
   },
   activeByDevice(req, res) {
       console.log(moment());
       return IrrigationProgram
            .findOne({
                where: {
                    DeviceId: req.params.deviceId
                },
                order: [
                    ['CreatedAt','DESC']
                ],
                limit: 1               
            })
            .then(irrigationPrograms => res.status(200).send(irrigationPrograms))
            .catch(error => res.status(400).send(error));
   }
};