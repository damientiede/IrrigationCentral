module.exports = (sequelize, DataTypes) => {
    const IrrigationProgram = sequelize.define('IrrigationProgram', {
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
      Duration:{
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

    IrrigationProgram.associate = (models) => {
        IrrigationProgram.belongsTo(models.Device, {
            foreignKey: 'DeviceId',
            onDelete: 'CASCADE',
        });
    };
  
    return IrrigationProgram;
}