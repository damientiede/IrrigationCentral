module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define('Schedule', {
    Name: { 
      type:DataTypes.STRING,
      allowNull:false
    },   
    StartDate: { 
      type:DataTypes.DATE,
      allowNull:true
    },
    StartHours: {
      type:DataTypes.INTEGER,
      allowNull:true
    },
    StartMins: {
      type:DataTypes.INTEGER,
      allowNull:true
    },    
    Duration: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    Days: {
      type:DataTypes.STRING,
      allowNull:true
    },
    Repeat: DataTypes.BOOLEAN,    
    Enabled: DataTypes.BOOLEAN  
  });

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Solenoid, {
      foreignKey: 'SolenoidId',
      onDelete: 'CASCADE'      
    });
    Schedule.belongsTo(models.Device, {
        foreignKey: 'DeviceId',
        onDelete: 'CASCADE',
    }); 
  };

  return Schedule;
};
