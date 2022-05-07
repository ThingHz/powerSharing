const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class Status extends Model {}
Status.init(
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
    modelName: "Status",
    tableName: "statuses",
    timestamps: false,
  }
);

module.exports = Status;
