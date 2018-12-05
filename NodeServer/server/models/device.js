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
    ScheduleId: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    Inputs: DataTypes.STRING,
    Outputs: DataTypes.STRING,    
    PumpSolenoidId: DataTypes.INTEGER,
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
    Device.hasMany(models.Schedule, {
      foreignKey: 'DeviceId',
      as: 'Schedules'
    }); 
    /* Device.hasOne(models.Status, {
      foreignKey: 'DeviceId',
      as: 'Status'
    }); */
  };

  return Device;
};
