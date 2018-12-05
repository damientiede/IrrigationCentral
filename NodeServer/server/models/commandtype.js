module.exports = (sequelize, DataTypes) => {
    const CommandType = sequelize.define('CommandType', {
      Title: {
        type: DataTypes.STRING,
        allowNull:false
      },
      Description: DataTypes.STRING
    }, {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    });
    return CommandType;
};
