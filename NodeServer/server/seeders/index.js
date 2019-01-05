const eventTypes = require('./eventtypes');
const commandTypes = require('./commandtypes');
const devices = require('./devices');
const accounts = require('./accounts');
const solenoids = require('./solenoids');
const schedules = require('./schedules');
const programs = require('./programs');
const steps = require('./steps');
const analogs = require('./analogs');
const spis = require('./spis');
const alarms = require('./alarms');
const commands = require('./commands');
const users = require('./users');

const seedAll = () => {
    eventTypes.seed();
    commandTypes.seed();
    devices.seed(spis, analogs, solenoids, alarms, users, programs, steps, ()=> {
        spis.seed();
        analogs.seed();
        solenoids.seed(programs, steps, () => {
            programs.seed(steps, ()=> {
                steps.seed();
            });
        });
        alarms.seed();
        accounts.seed();
        users.seed(); 
    });            
    commands.seed();
    
}

module.exports = {    
    seedAll
};

