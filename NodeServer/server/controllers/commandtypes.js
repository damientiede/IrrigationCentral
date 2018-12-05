const CommandType = require('../models').CommandType;

module.exports = {   
   list(req, res) {
      return CommandType
      .findAll({ limit: 100 })         
      .then(commandTypes => res.status(200).send(commandTypes))
      .catch(error => res.status(400).send(error));
   }
};
