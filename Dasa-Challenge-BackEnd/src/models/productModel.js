// models/Product.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const User = require("./userModel");
const Category = require("./categoryModel");

const productModel = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    product_image: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "category_id",
      },
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
    tableName: "products",
    timestamps: false,
  }
);

productModel.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(productModel, { foreignKey: "user_id" });

productModel.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(productModel, { foreignKey: "category_id" });

module.exports = productModel;
