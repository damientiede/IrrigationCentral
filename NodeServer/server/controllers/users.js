const User = require('../models').User;
const Device = require('../models').Device;
/* const EmailService = require('../services/emailer');
const bcrypt = require('bcrypt');
const randomstring = require('randomstring'); */

module.exports = {
   create(req, res) {   
        User.findOne({ where: { Email: req.body.email } }).then(function (user) {
            if (user) {
                return res.status(200).send('User already exists');                
            }
            // create new user
            //const salt = bcrypt.genSaltSync();
            //const encryptedPassword = bcrypt.hashSync(req.body.password, salt);   
            //console.log(encryptedPassword);
            return User
                .create({            
                    FirstName: req.body.firstName,
                    LastName: req.body.lastName,
                    Email: req.body.email,
                    Mobile: req.body.mobile,   
                    IsAdmin: req.body.isAdmin         
                    //Password: encryptedPassword,
                    //Salt: salt       
                })
                .then(user => res.status(201).send(user))
                .catch(error => res.status(400).send(error));
        });
   },
   /* single(req, res) {
        return User.findById(req.params.id)
            .then(function (user) {
                if (user) {
                    return res.status(200).send(user);                
                }
                return res.status(404);
            })
            .catch(error => res.status(400).send(error));   
   }, */
    single(req, res) {
        return User.findOne({
            include: [{model: Device, as: 'devices'}],            
            where: { Email: req.params.id } })
            .then(user => {
                if (user) {
                    return res.status(200).send(user);                
                }
                return res.status(404).send();
            })
            .catch(error => res.status(400).send(error));   
    },
    list(req, res) {
        return User
            .findAll()
            .then(users => res.status(200).send(users))
            .catch(error => res.status(400).send(error));
    },
    update(req, res) {
        /* const salt = bcrypt.genSaltSync();
        console.log(salt);        
        const encryptedPassword = bcrypt.hashSync(req.body.password , salt); */
        return User
            .update({        
                FirstName: req.body.firstName,
                LastName: req.body.lastName,                
                Mobile: req.body.mobile,
                IsAdmin: req.body.isAdmin      
                // Password: encryptedPassword             
            }, {
	            where: { Email: req.body.email }
            })
            .then(user => res.status(200).send(user))
            .catch(error => res.status(400).send(error));
    },
    /* login(req, res) {
        console.log(req.body);         
        User.findOne({ where: { Email: req.body.email } }).then(function (user) {
            if (!user) {
                res.status(401).send('Unknown email');                
            }
            const encryptedPassword = bcrypt.hashSync(req.body.password, user.Salt);
            if (encryptedPassword != user.Password) {
                res.status(401).send('Password incorrect');
            } else {
                res.status(200).send();
            }
        })
    },
    recoverPassword(req, res) {
    User.findOne({ where: { Email: req.params.uid } })
    .then(function (user) {
        if (user) {
            user.RecoverCode = randomstring.generate(20);
            User.update(user);
            
            let link = '<a href="http://irrigationcentral.co.nz/resetpassword/"'+user.Email+'/'+user.recoveryCode+'"></a>';

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"IrrigationCentral Admin" <admin@irrigationcentral.co.nz>', // sender address
                to: user.Email, // list of receivers
                subject: 'IrrigationCentral Password Recovery', // Subject line
                text: link, // plain text body
                html: '<p>Click here to reset your password.</p>'+link // html body
            };
            EmailService.send(mailOptions);            
            res.status(200).send();
        }
        return res.status(404);
    })
    .catch(error => res.status(400).send(error));
   } */

};
