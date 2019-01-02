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
      Enabled: DataTypes.BOOLEAN
    });

    Program.associate = (models) => {
        Program.hasMany(models.Steps, {
          foreignKey: 'ProgramId',
          as: 'Steps',
        });
    }

    return Program;
}