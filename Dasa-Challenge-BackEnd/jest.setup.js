// jest.setup.js
require('dotenv').config();

const User = require("./src/models/userModel");
const { sequelize } = require("./src/database/database");
const jwt = require("jsonwebtoken");

global.generateAuthToken = (user) => {
  const token = jwt.sign(
    { userId: user.user_id, role: user.user_role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

beforeAll(async () => {
  await sequelize.sync({ force: true });
  global.adminUser = await User.create({
    user_name: "Admin User",
    user_email: "admin@example.com",
    user_password: "adminpassword",
    user_role: 1,
  });
  global.adminToken = generateAuthToken(global.adminUser);
});

afterAll(async () => {
  await sequelize.close();
});
