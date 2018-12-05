module.exports = (sequelize, DataTypes) => {
    const Alarm = sequelize.define('Alarm', {           
        Name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull:false
        },
        HardwareType: {
            type: DataTypes.ENUM,
            values:['GPIO','Distributed','SPI']
        },
        Address: {
            type: DataTypes.STRING,
            allowNull:false
        },  
        Value: {
            type: DataTypes.INTEGER,
            allowNull:false
        }    
    });
    
    Alarm.associate = (models) => {
        Alarm.belongsTo(models.Device, {
            foreignKey: 'DeviceId',
            onDelete: 'CASCADE',
        });
    };
    
    return Alarm;
  };
  