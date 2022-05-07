const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    bonuses: {
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

// User.hasMany(Powerbank, { foreignKey: "stationId" });

module.exports = User;
