module.exports = (sequelize, DataTypes) => {
    const IrrigationAction = sequelize.define('IrrigationAction', {
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Start: {
        type: DataTypes.DATE,
        allowNull: false
      },
      Finished: {
        type: DataTypes.DATE,
        allowNull: true
      },
      Paused: {
        type: DataTypes.DATE,
        allowNull: true
      },
      Duration:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Progress:{
        type: DataTypes.INTEGER,        
        allowNull: false
      },
      SolenoidId:{
        type: DataTypes.INTEGER,
        allowNull: false
      },
      SolenoidName:{
        type: DataTypes.STRING,
        allowNull:false
      },      
      RequiresPump:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
    });

    IrrigationAction.associate = (models) => {
        IrrigationAction.belongsTo(models.Device, {
            foreignKey: 'DeviceId',
            onDelete: 'CASCADE',
        });
    };
  
    return IrrigationAction;
}