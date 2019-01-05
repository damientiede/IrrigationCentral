const accounts = require('./accounts');
const alarms = require('./alarms');
const devices = require('./devices');
const events = require('./events');
const solenoids = require('./solenoids');
const analogs = require('./analogs');
const spis = require('./spis');
const commands = require('./commands');
const commandTypes = require('./commandtypes');
// const deviceStatuses = require('./deviceStatuses');
const schedules = require('./schedules');
const users = require('./users');
const programs = require('./programs');
const irrigationActions = require('./irrigationactions');

module.exports = {
   accounts,
   alarms,
   devices,
   events,
   solenoids,
   analogs,
   spis,
   commands,
   commandTypes,
   schedules,
   users,
   irrigationActions,
   programs
};
