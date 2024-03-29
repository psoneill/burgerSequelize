module.exports = function(sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
      burgerName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,255]
        }
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
  
    return Burger;
  };
  