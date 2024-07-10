const { DataTypes } = require("sequelize");
const {sequelize} = require("../database/database");
const User = require("./userModel");

const categoryModel = sequelize.define(
  "Category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_description: {
      type: DataTypes.TEXT,
    },
    category_image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

categoryModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(categoryModel, { foreignKey: "user_id" });

module.exports = categoryModel;
