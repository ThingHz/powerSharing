const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");
const PromoCode = require("./PromoCode");

class PromocodeUser extends Model {
  getFullname() {
    return [this.id, this.code].join(" ");
  }
}
PromocodeUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    promoCodeId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    isUsed: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: sequelize,
    modelName: "PromocodeUser",
    tableName: "promocode_user",
    timestamps: true,
  }
);

PromocodeUser.belongsTo(PromoCode, { foreignKey: "promoCodeId" });

module.exports = PromocodeUser;
