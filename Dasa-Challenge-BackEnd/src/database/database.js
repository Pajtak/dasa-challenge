const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "u862327486_prod_reg",
  "u862327486_root",
  "Wn_R_*DNfWZpE3d",
  {
    host: "45.152.44.1",
    dialect: "mysql",
  }
);

module.exports = sequelize;
