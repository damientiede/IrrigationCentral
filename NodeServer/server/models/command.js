module.exports = (sequelize, DataTypes) => {
    const Command = sequelize.define('Command', {
        CommandType: { 
          type: DataTypes.STRING,
          allowNull:false
        },
        Params: DataTypes.STRING,
        Issued: {
          type: DataTypes.DATE,
          allowNull:false
        },
        Actioned: {
          type:DataTypes.DATE,
          allowNull:true
        },
    });
    Command.associate = (models) => {
      Command.belongsTo(models.Device, {
          foreignKey: 'DeviceId',
          onDelete: 'CASCADE',
      });
    }; 
    return Command;
};
