module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define('Step', {
      Name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Sequence: {
        type: DataTypes.INTEGER,
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

    Step.associate = (models) => {
        Step.belongsTo(models.Program, {
            foreignKey: 'ProgramId',
            onDelete: 'CASCADE',
        });
    };
  
    return Step;
}