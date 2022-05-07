const { DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class Price extends Model {
  getFullname() {
    return [this.id, this.amount].join(" ");
  }
}
Price.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Price",
    tableName: "prices",
    timestamps: false,
  }
);

module.exports = Price;
