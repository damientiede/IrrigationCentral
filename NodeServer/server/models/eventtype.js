module.exports = (sequelize, DataTypes) => {
  const EventType = sequelize.define('EventType', {
    Name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    Description: DataTypes.STRING
  });
  return EventType;
};
