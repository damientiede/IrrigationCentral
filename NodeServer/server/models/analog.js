module.exports = (sequelize, DataTypes) => {
    const Analog = sequelize.define('Analog', {           
        Name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        Description: {
            type: DataTypes.STRING,
            allowNull:false
        },
        HardwareType: {
            type: DataTypes.STRING,
            allowNull:false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull:false
        }, 
        Multiplier: {
            type: DataTypes.DOUBLE,
            allowNull:false
        },
        RawValue: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        Units: {
            type: DataTypes.STRING,
            allowNull:false
        }, 
        Value: {
            type: DataTypes.DOUBLE,
            allowNull:false
        }    
    });

    Analog.associate = (models) => {
        Analog.belongsTo(models.Device, {
            foreignKey: 'DeviceId',
            onDelete: 'CASCADE',
        });
    };

    return Analog;
  };
  