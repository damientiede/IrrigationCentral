const Account = require('../models').Account;

module.exports = {
   create(req, res) {      
        return Account
            .create({            
                Name: req.body.firstName,
                Address: req.body.lastName
            })
            .then(account => res.status(201).send(account))
            .catch(error => res.status(400).send(error));
   },
   single(req, res) {
        return Account
            .findById(req.params.id)
            .then(account => res.status(200).send(account))
            .catch(error => res.status(400).send(error));   
   },
   list(req, res) {
        return Account
            .findAll()
            .then(accounts => res.status(200).send(accounts))
            .catch(error => res.status(400).send(error));
   },
   update(req, res) {
        return Account
            .update({        
                Name: req.body.firstName,
                Address: req.body.lastName             
            }, {
	            where: { id: req.body.id }
            })
            .then(account => res.status(200).send(account))
            .catch(error => res.status(400).send(error));
   },
   delete(req, res) {
    return Account
        .destroy({
            where: {id:req.params.id},
            truncate:true
        })  
        .then(affectedRows => res.status(200).send())                    
        .catch(error => res.status(400).send(error));
    }
};
