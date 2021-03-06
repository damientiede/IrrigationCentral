module.exports = (sequelize, DataTypes) => {
  const Device = sequelize.define('Device', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Mode: {
      type: DataTypes.ENUM,
      values:['Manual','Auto','Diagnostic']
    },
    State: {
        type: DataTypes.ENUM,
        values:['Standby','Irrigating','Fault']
    },
    Status: DataTypes.STRING,
    Pressure: {
      type:DataTypes.DOUBLE,
      allowNull:false
    },
    Flowrate: {
      type:DataTypes.DOUBLE,
      allowNull:false
    },
    Inputs: DataTypes.STRING,
    Outputs: DataTypes.STRING,    
    PumpSolenoidId: DataTypes.INTEGER,
    ActiveProgramId: DataTypes.INTEGER,
    IrrigationActionId: DataTypes.INTEGER,
    SoftwareVersion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    DeviceMAC: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Device.associate = (models) => {
    Device.hasMany(models.Solenoid, {
      foreignKey: 'DeviceId',
      as: 'Solenoids',
    });
    Device.hasMany(models.Alarm, {
      foreignKey: 'DeviceId',
      as: 'Alarms'
    });
    Device.hasMany(models.Analog, {
      foreignKey: 'DeviceId',
      as: 'Analogs'
    });
    Device.hasMany(models.Spi, {
      foreignKey: 'DeviceId',
      as: 'Spis'
    });
    Device.hasMany(models.Program, {
      foreignKey: 'DeviceId',
      as: 'Programs'
    }); 
    /* Device.hasOne(models.Program, {
      foreignKey: 'Id',
      as: 'ActiveProgram'
    }); */ 
    Device.belongsTo(models.IrrigationAction, {
      foreignKey: 'IrrigationActionId',
      as: 'IrrigationAction'
    });    
    Device.belongsToMany(models.User, {
      through: 'UserDevices',
      as: 'Users',
      foreignKey: 'DeviceId'
    });
  };

  return Device;
};
