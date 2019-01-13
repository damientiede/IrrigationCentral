const Step = require('../models').Step;
const IrrigationAction = require('../models').IrrigationAction;

module.exports = {
   create(req, res) {   
       console.log(req.body);   
        return Step
            .create({            
                Sequence: req.body.Sequence,
                Duration: parseInt(req.body.Duration),
                SolenoidId: req.body.SolenoidId,
                SolenoidName: req.body.SolenoidName,
                RequiresPump: req.body.RequiresPump,
                ProgramId: req.body.ProgramId,
                Enabled: req.body.Enabled
            })
            .then(step => res.status(201).send(step))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Step
            .find({
                where: { id: req.params.id},
                include: [{model: IrrigationAction, as: 'IrrigationAction'}]
            })
            .then(step => res.status(200).send(step))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Step
            .findAll({
                include: [{model: IrrigationAction, as: 'IrrigationAction'}]
            })
            .then(steps => res.status(200).send(steps))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Step
            .update({        
                Sequence: req.body.Sequence,
                Duration: parseInt(req.body.Duration),
                SolenoidId: req.body.SolenoidId,
                SolenoidName: req.body.SolenoidName,
                RequiresPump: req.body.RequiresPump,
                ProgramId: req.body.ProgramId,
                IrrigationActionId: req.body.IrrigationActionId,
                Enabled: req.body.Enabled
            }, {
	            where: { id: parseInt(req.body.id != undefined?req.body.id:req.body.Id) }
            })
            .then(step => res.status(200).send(step))
            .catch(error => res.status(400).send(error));
    },
    delete (req, res) {
        return Step
            .destroy({
                where: { Id: req.params.id }
            })
            .then(affectedRows => res.status(204))
            .catch(error => res.status(400).send(error));
    }
};
