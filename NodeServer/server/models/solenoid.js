module.exports = (sequelize, DataTypes) => {
    const Solenoid = sequelize.define('Solenoid', {          
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
            values: ['GPIO', 'Distributed', 'SPI']
        },
        Address: {
            type: DataTypes.STRING,
            allowNull:false
        }, 
        Value: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        RequiresPump: DataTypes.BOOLEAN     
    });
    
    Solenoid.associate = (models) => {
        Solenoid.belongsTo(models.Device, {
            foreignKey: 'DeviceId',
            onDelete: 'CASCADE',
        });
    };
    
    return Solenoid;
  };
  