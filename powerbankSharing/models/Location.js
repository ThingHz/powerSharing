const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");
const City = require("./City");

class Location extends Model {}
Location.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    cityId: {
      type: DataTypes.INTEGER,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    workingHours: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Location",
    tableName: "locations",
    timestamps: false,
  }
);

Location.belongsTo(City, { foreignKey: "cityId" });

module.exports = Location;
