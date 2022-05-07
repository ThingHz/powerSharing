const { DataTypes, Model } = require("sequelize");
const sequelize = require("../sequelize");

class Article extends Model {}
Article.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Article",
    tableName: "articles",
    timestamps: false,
  }
);

module.exports = Article;
