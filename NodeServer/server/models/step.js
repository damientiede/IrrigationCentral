module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define('Step', {
      Sequence: {
        type: DataTypes.INTEGER,
        allowNull: false
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
      },
      IrrigationActionId: { 
        type: DataTypes.INTEGER,
        allowNull: true
      }
    });

    Step.associate = (models) => {
        Step.belongsTo(models.Program, {
            foreignKey: 'ProgramId',
            onDelete: 'CASCADE',
        });
    };
  
    /* Step.associate = (models) => {
        Step.belongsTo(models.IrrigationAction, {
            foreignKey: 'IrrigationActionId',
            onDelete: 'CASCADE',
        });
    }; */

    return Step;
}