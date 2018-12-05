module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      EventType: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      EventValue: {
        type: DataTypes.STRING,
        allowNull:false
      }  
    });
    Event.associate = (models) => {
      Event.belongsTo(models.Device, {
          foreignKey: 'DeviceId',
          onDelete: 'CASCADE',
      });
    }; 
    return Event;
};
