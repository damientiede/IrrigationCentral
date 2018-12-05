module.exports = (sequelize, DataTypes) => {
    const Spi = sequelize.define('Spi', {                  
        Name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        Clock: {
          type: DataTypes.INTEGER,
          allowNull:false
        },
        CS: {
            type: DataTypes.INTEGER,
            allowNull:false
          },
        MISO: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        MOSI: {
            type: DataTypes.INTEGER,
            allowNull:false
        },                       
    });

    Spi.associate = (models) => {
      Spi.belongsTo(models.Device, {
        foreignKey: 'DeviceId',
        onDelete: 'CASCADE',
      });
    };
    return Spi;
  };
  