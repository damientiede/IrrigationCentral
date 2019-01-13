module.exports = (sequelize, DataTypes) => {
    const Program = sequelize.define('Program', {
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
      CurrentStep: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      Enabled: DataTypes.BOOLEAN
    });

    Program.associate = (models) => {
        Program.hasMany(models.Step, {
          foreignKey: 'ProgramId',
          onDelete: 'CASCADE',
          as: 'Steps',
        });
        Program.belongsTo(models.Device, {
            foreignKey: 'DeviceId',
            onDelete: 'CASCADE'
        });
    }


    return Program;
}