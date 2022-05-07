const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class PromoCode extends Model {
  getFullname() {
    return [this.id, this.code].join(" ");
  }
}
PromoCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
    },
    endedAt: {
      type: DataTypes.DATE,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
  },
  {
    sequelize: sequelize,
    modelName: "PromoCode",
    tableName: "promo_codes",
    timestamps: false,
  }
);

module.exports = PromoCode;
