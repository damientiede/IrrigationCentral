module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {      
        Name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        Address: {
            type: DataTypes.STRING,
            allowNull:false
        },      
    });

    return Account;
  };
  