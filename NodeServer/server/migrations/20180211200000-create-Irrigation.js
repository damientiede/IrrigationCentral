'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
    return [
        //devices        
        queryInterface.createTable('Devices', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Description: {
                type: Sequelize.STRING,
                allowNull: false
            },
            Mode: {
                type: Sequelize.ENUM,
                values:['Manual','Auto','Diagnostic'],
                default:'Manual'
            },
            State: {
                type: Sequelize.ENUM,
                values:['Standby','Irrigating','Fault'],
                default:'Standby'
            },   
            Status: {
                type: Sequelize.STRING
            },
            Pressure: {
                type: Sequelize.INTEGER,
                default: 0
            },
            Flowrate: {
                type: Sequelize.INTEGER,
                default: 0
            },            
            ActiveProgramId: {
                type: Sequelize.INTEGER,
                default: null               
            },
            IrrigationActionId: {
                type: Sequelize.INTEGER,
                default: null               
            },
            Inputs: {
                type: Sequelize.STRING
            },
            Outputs: {
                type: Sequelize.STRING
            },
            PumpSolenoidId: {
                type: Sequelize.INTEGER
            }, 
            DeviceMAC: {
                type: Sequelize.STRING
            },
            SoftwareVersion: {
                type: Sequelize.STRING,
                allowNull: false
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),         
        //accounts
        queryInterface.createTable('Accounts', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Address: {
                type: Sequelize.STRING,
                allowNull:false
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),   
        //users                
        queryInterface.createTable('Users', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            FirstName: {
                type: Sequelize.STRING,
                allowNull:false
            },
            LastName: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Email: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Mobile: {
                type: Sequelize.STRING,
                allowNull:false
            },
            IsAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull:false
            }, 
            /* Password: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Salt: {
                type: Sequelize.STRING,
                allowNull:false
            }, */
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }           
        }),     
        //userdevice
        queryInterface.createTable('UserDevices', {
            UserId: {     
                type: Sequelize.INTEGER,
                allowNull: false
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            } 
        }),        
        //commandtype
        queryInterface.createTable('CommandTypes', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Title: {
                type: Sequelize.STRING
            },
            Description: {
                type: Sequelize.STRING
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),                
        //eventtype
        queryInterface.createTable('EventTypes', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING
            },
            Description: {
                type: Sequelize.STRING
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),
        //irrigation actions
        queryInterface.createTable('IrrigationActions', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Start: {
                type: Sequelize.DATE,
                allowNull:false
            },
            Finished: {
                type: Sequelize.DATE,
                allowNull:true
            },
            Duration: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            SolenoidId:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            SolenoidName: {
                type: Sequelize.STRING,
                allowNull:false
            },
            RequiresPump:{
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'cascade',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            }
        }),
        //Devices - IrrigationAction foriegn key
        queryInterface.addConstraint('Devices',['IrrigationActionId'],{
            type: 'foreign key',
            name: 'fk_devices_irrigation_action_constraint',
            references: { //Required field
              table: 'IrrigationActions',
              field: 'Id'
            },
            onDelete: 'cascade'
        }),
        //solenoids
        queryInterface.createTable('Solenoids', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Description: {
                type: Sequelize.STRING,
                allowNull:false
            },
            HardwareType: {
                type: Sequelize.ENUM,
                values: ['GPIO', 'Distributed', 'SPI']
            },
            Address: {
                type: Sequelize.STRING,
                allowNull:false
            }, 
            Value: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            RequiresPump: {
                type: Sequelize.BOOLEAN
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            }
        }),                  
        //spis
        queryInterface.createTable('Spis', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Clock: {
              type: Sequelize.INTEGER,
              allowNull:false
            },
            CS: {
                type: Sequelize.INTEGER,
                allowNull:false
              },
            MISO: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            MOSI: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            }
        }),  
        //alarms
        queryInterface.createTable('Alarms', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Description: {
                type: Sequelize.STRING,
                allowNull:false
            },
            HardwareType: {
                type: Sequelize.ENUM,
                values:['GPIO','Distributed','SPI']
            },
            Address: {
                type: Sequelize.STRING,
                allowNull:false
            },  
            Value: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            }
        }),
        //analogs
        queryInterface.createTable('Analogs', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Description: {
                type: Sequelize.STRING,
                allowNull:false
            },
            HardwareType: {
                type: Sequelize.STRING,
                allowNull:false
            },
            Address: {
                type: Sequelize.STRING,
                allowNull:false
            }, 
            Multiplier: {
                type: Sequelize.DOUBLE,
                allowNull:false
            },
            RawValue: {
                type: Sequelize.INTEGER,
                allowNull:false
            },
            Units: {
                type: Sequelize.STRING,
                allowNull:false
            }, 
            Value: {
                type: Sequelize.DOUBLE,
                allowNull:false
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            }
        }), 
        //commands
        queryInterface.createTable('Commands', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            CommandType: {
                type: Sequelize.STRING
            },
            Params: {
                type: Sequelize.STRING
            },
            Issued: {
                type: Sequelize.DATE,
                allowNull:false
            },
            Actioned: {
                type:Sequelize.DATE,
                allowNull:true
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            },
        }),          
        //schedules
        queryInterface.createTable('Schedules', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING
            },            
            StartDate: {
                type: Sequelize.DATE
            },
            StartHours: {
                type: Sequelize.INTEGER
            },
            StartMins: {
                type: Sequelize.INTEGER
            },
            Duration: {
                type: Sequelize.INTEGER
            },
            Days: {
                type: Sequelize.STRING
            },
            Repeat: {
                type: Sequelize.BOOLEAN
            },            
            Enabled: {
                type: Sequelize.BOOLEAN
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            },
            SolenoidId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Solenoids',
                    key: 'Id',
                    as: 'SolenoidId'
                }
            }
        }),
        //programs
        queryInterface.createTable('Programs', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Name: {
                type: Sequelize.STRING
            },            
            Start: {
                type: Sequelize.DATE
            },
            Enabled: {
                type: Sequelize.BOOLEAN
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }),  
        //Devices - ActiveProgram foriegn key
        queryInterface.addConstraint('Devices',['ActiveProgramId'],{
            type: 'foreign key',
            name: 'fk_devices_activeprogram_constraint',
            references: { //Required field
              table: 'Programs',
              field: 'Id'
            },
            onDelete: 'cascade'
        }),
        //step
        queryInterface.createTable('Steps', {
            Id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Sequence: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            Duration: {
                type: Sequelize.INTEGER
            },
            SolenoidId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Solenoids',
                    key: 'Id',
                    as: 'SolenoidId'
                }
            },
            SolenoidName: {
                type: Sequelize.STRING,
                allowNull: false,
            },  
            RequiresPump: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },                      
            IrrigationActionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'IrrigationActions',
                    key: 'Id',
                    as: 'IrrigationActionId'
                }
            },
            ProgramId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Programs',
                    key: 'Id',
                    as: 'ProgramId'
                },
                onDelete: 'CASCADE'
            },            
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }            
        }),         
        //event
        queryInterface.createTable('Events', {
            Id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            EventType: {
                type: Sequelize.INTEGER
            },
            EventValue: {
                type: Sequelize.STRING
            },
            CreatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            UpdatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            DeviceId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Devices',
                    key: 'Id',
                    as: 'DeviceId'
                },
            }
        })             
    ]},      
    down: function(queryInterface, Sequelize) {
    return [  
        queryInterface.removeConstraint('Devices','fk_devices_activeprogram_constraint'),
        queryInterface.removeConstraint('Devices','fk_devices_irrigation_action_constraint'),
        
        //accounts
        queryInterface.dropTable('Accounts'),
        //alarms
        queryInterface.dropTable('Alarms'),
        //schedules
        queryInterface.dropTable('Schedules'), 
        queryInterface.dropTable('Programs'), 
        queryInterface.dropTable('Steps'),   
        //irrigation programs
        queryInterface.dropTable('IrrigationActions'),   
        //spis
        queryInterface.dropTable('Spis'),
        //solenoids
        queryInterface.dropTable('Solenoids'),        
        //analogs
        queryInterface.dropTable('Analogs'),
        //commands
        queryInterface.dropTable('Commands'),
        //commandtypes
        queryInterface.dropTable('CommandTypes'),        
        //events
        queryInterface.dropTable('Events'),
        //eventtypes
        queryInterface.dropTable('EventTypes'),                
        //users
        queryInterface.dropTable('Users'),
        //userdevices
        queryInterface.dropTable('UserDevices'),
        //devices
        queryInterface.dropTable('Devices')
        //queryInterface.dropAllTables()
    ]
  }
};
