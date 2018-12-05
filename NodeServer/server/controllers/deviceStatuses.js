const Device = require('../models').Device;
const Solenoid = require('../models').Solenoid;
const Alarm = require('../models').Alarm;
const Spi = require('../models').Spi;
const Analog = require('../models').Analog;
const Command = require('../models').Command;

module.exports = {   
   single(req, res) {
        return Device
            .find({
                where: {id: req.params.deviceid},
                include: [{all:true}]
            })
            .then(device => res.status(200).send(device))
            .catch(error => res.status(400).send(error));   
   }
};
