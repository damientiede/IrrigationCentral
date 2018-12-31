module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {        
      FirstName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull:false
      },
      Email: {
          type: DataTypes.STRING,
          allowNull:false
      },
      Mobile: {
        type: DataTypes.STRING,
        allowNull:false
      },      
     /*  Password: {
        type: DataTypes.STRING,
        allowNull:false
      }, */
      IsAdmin: DataTypes.BOOLEAN,
     /*  Salt: {
        type: DataTypes.STRING,
        allowNull:false
      },
      RecoveryCode: {
        type: DataTypes.STRING,
        allowNull:true
      } */
    });

    User.associate = (models) => {
      User.hasOne(models.Account, {
        foreignKey: 'AccountId',
        as: 'Account'
      })
    };

    User.associate = (models) => {
      User.belongsToMany(models.Device, {
        through: 'UserDevices',
        as: 'devices',
        foreignKey: 'UserId'
      });
    };

   /*  User.associate = (models) => {
      User.hasMany(models.Device, {
        foreignKey: 'deviceId',
        as: 'devices'
      })
    };    */
    return User;
  };
  