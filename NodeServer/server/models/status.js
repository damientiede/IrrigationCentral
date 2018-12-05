module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    State: {
      type:DataTypes.STRING,
      allowNull:false
    },
    Mode: {
      type:DataTypes.STRING,
      allowNull:false
    },
    Pressure: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    Station: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    Start: DataTypes.DATE,
    Duration: DataTypes.INTEGER,
    ScheduleId: DataTypes.INTEGER,
    Inputs: DataTypes.STRING,
    Outputs: DataTypes.STRING  
  });

  Status.associate = (models) => {
    Status.belongsTo(models.Device, {
        foreignKey: 'DeviceId',
        onDelete: 'CASCADE',
    });
  };
  
  return Status;
};
