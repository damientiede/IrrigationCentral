const eventsController = require('../controllers').events;
const commandsController = require('../controllers').commands;
const commandTypesController = require ('../controllers').commandTypes;
const accountsController = require('../controllers').accounts;
const devicesController = require('../controllers').devices;
const solenoidsController = require('../controllers').solenoids;
const alarmsController = require('../controllers').alarms;
const analogsController = require('../controllers').analogs;
const spisController = require('../controllers').spis;
const usersController = require('../controllers').users;
const deviceStatusController = require('../controllers').deviceStatuses;
const schedulesController = require('../controllers').schedules;
const irrigationProgramsController = require('../controllers').irrigationPrograms;


module.exports = (app) => {
   app.get('/api',(req, res) => res.status(200).send({
      message: 'Welcome to Irrigation Controller API',
   }));

   //Events
   app.post('/api/events', eventsController.create);
   app.get('/api/devices/:deviceId/events', eventsController.list);

   //Commands
   app.get('/api/commands', commandsController.list);
   app.get('/api/devices/:deviceId/commands', commandsController.listByDevice);
   app.get('/api/devices/:deviceId/pendingcommands', commandsController.pending);
   app.put('/api/commands/:commandId', commandsController.update);
   app.post('/api/commands', commandsController.create);

   //CommandTypes
   app.get('/api/commandtypes', commandTypesController.list);

   //Devices
   app.get('/api/devices', devicesController.list);
   app.get('/api/devices/:DeviceMAC/register', devicesController.register);
   app.post('/api/devices', devicesController.create);
   app.get('/api/devices/:id', devicesController.single);   
   app.put('/api/devices/:id', devicesController.update);

   //Accounts
   app.post('/api/accounts', accountsController.create);
   app.get('/api/accounts/:id', accountsController.single);
   app.get('/api/accounts', accountsController.list);
   app.put('/api/accounts/:id', accountsController.update);
   app.delete('/api/accounts/:id', accountsController.delete);

   //Users
   app.post('/api/users', usersController.create);
   app.get('/api/user/:id', usersController.single);  
   app.get('/api/userbyid/:uid', usersController.singleByUid); 
   app.get('/api/recoverpassword/uid',usersController.recoverPassword);
   app.get('/api/users', usersController.list);
   app.put('/api/users/:id', usersController.update);  
   app.post('/api/login', usersController.login);

   //Solenoids
   app.post('/api/solenoids', solenoidsController.create);
   app.get('/api/solenoids/:id', solenoidsController.single);
   app.get('/api/solenoids', solenoidsController.list);
   app.put('/api/solenoids/:id', solenoidsController.update);
   app.get('/api/devices/:deviceId/solenoids', solenoidsController.listByDevice);
   app.delete('/api/solenoids/:id',solenoidsController.delete);

   //Alarms
   app.post('/api/alarms', alarmsController.create);
   app.get('/api/alarms/:id', alarmsController.single);
   app.get('/api/alarms', alarmsController.list);
   app.put('/api/alarms/:id', alarmsController.update);
   app.get('/api/devices/:deviceId/alarms', alarmsController.listByDevice);
   app.delete('/api/alarms/:id',alarmsController.delete);

   //Analogs   
   app.post('/api/analogs', analogsController.create);
   app.get('/api/analogs/:id', analogsController.single);
   app.get('/api/analogs', analogsController.list);
   app.put('/api/analogs/:id', analogsController.update);
   app.get('/api/devices/:deviceId/analogs', analogsController.listByDevice);

   //Spis
   app.post('/api/spis', spisController.create);
   app.get('/api/spis/:id', spisController.single);
   app.get('/api/spis', spisController.list);
   app.put('/api/spis/:id', spisController.update);
   app.get('/api/devices/:deviceId/spis', spisController.listByDevice);

   //Schedules
   app.post('/api/schedules', schedulesController.create);
   app.get('/api/schedule/:id', schedulesController.single);
   app.get('/api/schedules', schedulesController.list);
   app.put('/api/schedules/:id', schedulesController.update);
   app.get('/api/devices/:deviceId/schedules', schedulesController.listByDevice);
   app.delete('/api/schedules/:id',schedulesController.delete);

   //IrrigationPrograms
   app.post('/api/irrigationprograms', irrigationProgramsController.create);
   app.get('/api/irrigationprograms/:id', irrigationProgramsController.single);
   app.get('/api/irrigationprograms', irrigationProgramsController.list);
   app.put('/api/irrigationprograms/:id', irrigationProgramsController.update);
   app.get('/api/devices/:deviceId/irrigationprograms', irrigationProgramsController.listByDevice);
   app.get('/api/devices/:deviceId/activeprogram',irrigationProgramsController.activeByDevice);
  
};

