const Device = require('../models').Device;
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
                where: {Id: req.params.id}
                //include: [{all:true}]
             })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Device
            .findAll()
            .then(devices => res.status(200).send(devices))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
       //console.log(req);
        return Device
            .update({        
                Name: req.body.Name,
                Description: req.body.Description,
                Mode: Utils.parseDeviceMode(req.body.Mode),
                State: Utils.parseDeviceState(req.body.State),
                Status: req.body.Status,
                Pressure: req.body.Pressure,
                ScheduleId: parseInt(req.body.ScheduleId),
                Inputs: req.body.Inputs,
                Outputs: req.body.Outputs,                
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
                defaults:{
                    Name:'DeviceName',
                    Description:'Device description',
                    Mode:'Manual',
                    State:'Standby',
                    Status:'Created',
                    SoftwareVersion:'0.0.0.1'
                    //deviceMAC: req.params.mac
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
