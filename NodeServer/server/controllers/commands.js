const Command = require('../models').Command;

module.exports = {
   create(req, res) {      
      return Command
         .create({
            CommandType: req.body.CommandType,
            Params: req.body.Params,
	      Issued: req.body.Issued,
            Actioned: null,
            DeviceId: parseInt(req.body.DeviceId)
         })
         .then(command => res.status(201).send(command))
         .catch(error => res.status(400).send(error));
   },
   list(req, res) {
      return Command
      .findAll({ limit: 100 })         
      .then(commands => res.status(200).send(commands))
      .catch(error => res.status(400).send(error));
   },
   listByDevice(req, res) {
      return Command
         .findAll({ 
            where: { 
                  DeviceId: parseInt(req.params.deviceId)                  
            },
            limit:100
          })         
         .then(commands => res.status(200).send(commands))
         .catch(error => res.status(400).send(error));
   },
   pending(req, res) {
      return Command
         .findAll({ 
            where: { 
                  DeviceId: parseInt(req.params.deviceId),
                  Actioned:null
            }
          })         
         .then(commands => res.status(200).send(commands))
         .catch(error => res.status(400).send(error));
   },
   update(req, res) {
      return Command.update({
         Actioned: Date.parse(req.body.Actioned)
      }, {
	 where: { Id: req.params.commandId }
      })
      .then(command => res.status(200).send(command))
      .catch(error => res.status(400).send(error));
   },
};
