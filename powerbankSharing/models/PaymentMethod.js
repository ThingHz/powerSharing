const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");
const User = require("./User");

class PaymentMethod extends Model {}
PaymentMethod.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cardHash: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    approved: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDefault: {
      type: DataTypes.INTEGER,
      allowNull: null,
    },
  },
  {
    sequelize: sequelize,
    modelName: "PaymentMethod",
    tableName: "payment_methods",
  }
);

PaymentMethod.belongsTo(User, { foreignKey: "userId" });

module.exports = PaymentMethod;
