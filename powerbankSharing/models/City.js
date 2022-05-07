const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class City extends Model {}
City.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "City",
    tableName: "cities",
    timestamps: false,
  }
);

module.exports = City;
