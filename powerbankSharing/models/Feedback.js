const { Sequelize, DataTypes, Model } = require("sequelize");
const RentLog = require("./RentLog");
const User = require("./User");
const sequelize = require("../sequelize");

class Feedback extends Model {
  getFullname() {
    return [this.id, this.code].join(" ");
  }
}
Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rentLogId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    rating: {
      type: DataTypes.INTEGER,
    },
    feedback: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Feedback",
    tableName: "feedbacks",
    timestamps: true,
  }
);

Feedback.belongsTo(RentLog, { foreignKey: "rentLogId" });
Feedback.belongsTo(User, { foreignKey: "userId" });

module.exports = Feedback;
