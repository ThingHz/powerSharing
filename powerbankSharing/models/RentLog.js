const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");
const PaymentMethod = require("./PaymentMethod");
const PromoCode = require("./PromoCode");
const Station = require("./Station");
const User = require("./User");

class RentLog extends Model {}
RentLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    powerbankId: {
      type: DataTypes.INTEGER,
    },
    startedAt: {
      type: DataTypes.DATE,
    },
    endedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fromStationId: {
      type: DataTypes.INTEGER,
    },
    toStationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymentMethodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    promoCodeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelize,
    modelName: "RentLog",
    tableName: "rent_logs",
    timestamps: false,
  }
);

RentLog.belongsTo(PaymentMethod, { foreignKey: "paymentMethodId" });
RentLog.belongsTo(PromoCode, { foreignKey: "promoCodeId" });
RentLog.belongsTo(User, { foreignKey: "userId" });
RentLog.belongsTo(Station, { foreignKey: "fromStationId", as: "fromStation" });
RentLog.belongsTo(Station, { foreignKey: "toStationId", as: "toStation" });

module.exports = RentLog;
