const Status = require('../models').Status;

module.exports = {
      update(req,res) {
            return Status
                  .findOrCreate({
                        where:{DeviceId:req.params.DeviceId},
                        defaults:{
                              State:'Unknown',
                              Pressure:'Device description',
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
      },
      get(req,res) {

            Solenoid.findAll({ where: { deviceId: req.query.id } })
                  .then(projects => {
                        // projects will be an array of Project instances with the specified name
                      })
                      
            let device = Devices
                  .findById(req.body.deviceId)
                  .then


      },


   /* list(req, res) {
      return Statuses
         .all()
         .then(status => res.status(200).send(status))
         .catch(error => res.status(400).send(error));
   }, */
   update(req, res) {
      return Statuses.update({
         state: req.body.state,
         mode: req.body.mode,
         pressure: req.body.pressure,
         station: req.body.station,
         start: req.body.start,
         duration: req.body.duration,
         scheduleId: req.body.scheduleId,
         inputs: req.body.inputs,
         outputs: req.body.outputs
      }, {
	 where: { id: 1 }
      })
      .then(status => res.status(200).send(status))
      .catch(error => res.status(400).send(error));
   },
};
