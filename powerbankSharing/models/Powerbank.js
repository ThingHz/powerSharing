const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");
const Status = require("./Status");

class Powerbank extends Model {
  getFullname() {
    return [this.id, this.code].join(" ");
  }
}
Powerbank.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    stationId: {
      type: DataTypes.INTEGER,
    },
    slotNumber: {
      type: DataTypes.INTEGER,
    },
    battery: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Powerbank",
    tableName: "powerbanks",
    timestamps: false,
  }
);

Powerbank.belongsTo(Status, { foreignKey: "statusId" });

module.exports = Powerbank;
