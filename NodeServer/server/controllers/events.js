const Event = require('../models').Event;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
   create(req, res) {           
      return Event
         .create({
            EventType: parseInt(req.body.EventType),
            EventValue: req.body.EventValue,
            DeviceId: parseInt(req.body.DeviceId)
         })
         .then(event => res.status(201).send(event))
         .catch(error => res.status(400).send(error));
   },
   list(req, res) {
      return Event
         .findAll({ 
            where: { 
               DeviceId: parseInt(req.params.deviceId),
               EventType: { [Op.ne]: 3 }
             },
            order: [['createdAt','DESC']],
            limit: 250
         })
         .then(events => res.status(200).send(events))
         .catch(error => res.status(400).send(error));
   }
};
