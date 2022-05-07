const { Sequelize, DataTypes, Model } = require("sequelize");
const Powerbank = require("./Powerbank");
const Location = require("./Location");
const sequelize = require("./../sequelize");

class Station extends Model {
  getFullname() {
    return [this.id, this.code].join(" ");
  }
}
Station.init(
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
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
    },
    totalSlot: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Station",
    tableName: "stations",
    timestamps: true,
  }
);

Station.hasMany(Powerbank, { foreignKey: "stationId" });
Station.belongsTo(Location, { foreignKey: "locationId" });

module.exports = Station;
