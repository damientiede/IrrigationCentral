const Device = require('../models').Device;
const IrrigationAction = require('../models').IrrigationAction;
// const Program = require('../models').Program;
const Utils = require('../utils');

module.exports = {
   create(req, res) {      
        return Device
            .create({            
                Name: req.body.FirstName,
                Description: req.body.Description,
                Mode:'Manual',
                State:'Standby',
                Status:'Created',               
                PumpSolenoidId:req.body.PumpSolenoidId,
                SoftwareVersion:req.body.SoftwareVersion,
                DeviceMAC:req.body.DeviceMAC
            })
            .then(device => res.status(201).send(device))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Device
            .find({
                where: {Id: req.params.id},
                include: [{model: IrrigationAction, as: 'IrrigationAction'}]
             })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Device
            .findAll({
                include: [{model: IrrigationAction, as: 'IrrigationAction'}]
            })
            .then(devices => res.status(200).send(devices))
            .catch(error => res.status(400).send(error));
   },
   updateStatus(req, res) {
        //console.log(req);
        return Device
            .update({        
                Mode: Utils.parseDeviceMode(req.body.Mode),
                State: Utils.parseDeviceState(req.body.State),
                Status: req.body.Status,
                Pressure: req.body.Pressure,
                Flowrate: req.body.Flowrate,
                ActiveProgramId: req.body.ActiveProgramId,                
                IrrigationActionId: req.body.IrrigationActionId,
                Inputs: req.body.Inputs,
                Outputs: req.body.Outputs,                
                UpdatedAt:new Date()            
            }, {
	            where: { Id: req.params.id }
            })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));
   },
   updateConfig(req, res) {
    //console.log(req);
     return Device
         .update({        
             Name: req.body.Name,
             Description: req.body.Description,
             PumpSolenoidId:req.body.PumpSolenoidId,
             SoftwareVersion:req.body.SoftwareVersion,
             UpdatedAt:new Date()            
         }, {
             where: { Id: req.params.id }
         })
         .then(device => res.status(200).send(device))
         .catch(error => res.status(400).send(error));
   },
   register(req, res) {
        return Device
            .findOrCreate({
                where:{DeviceMAC:req.params.DeviceMAC},
                // include: [{model: IrrigationAction, as: 'IrrigationAction'}],
                defaults:{
                    Name:'DeviceName',
                    Description:'Device description',
                    Mode:'Manual',
                    State:'Standby',
                    Status:'Created',
                    Pressure: 0,
                    Flowrate: 0,                    
                    SoftwareVersion:'0.0.0.1',
                    DeviceMAC: req.params.DeviceMAC
                }
            })
            .spread((device,created) => {
                if (created) {
                    console.log("New device successfully registered");
                }
                res.status(201).send(device);
            })
            .catch(error => {
                console.log('DeviceController.Register(): '+ error);
                res.status(400).send(error);
            });
   }
};
