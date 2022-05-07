const { DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class Question extends Model {}
Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Question",
    tableName: "questions",
    timestamps: false,
  }
);

module.exports = Question;
