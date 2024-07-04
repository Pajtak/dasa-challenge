const request = require("supertest");
const app = require("../../src/app");
const { sequelize } = require("../database/database");
const User = require("../models/userModel");

beforeAll(async () => {
  await sequelize.sync();
});

describe("User Model", () => {
  it("should create a new user", async () => {
    const res = await User.create({
      user_name: "John Doe",
      user_email: "john.doe@example.com",
      user_password: "password123",
      user_role: 1,
    });

    expect(res.user_name).toBe("John Doe");
    expect(res.user_email).toBe("john.doe@example.com");
    expect(res.user_role).toBe(1);
  });

  it("should find a user by ID", async () => {
    const newUser = await User.create({
      user_name: "Jane Doe",
      user_email: "jane.doe@example.com",
      user_password: "password456",
      user_role: 2,
    });

    const foundUser = await User.findByPk(newUser.user_id);

    expect(foundUser.user_name).toBe("Jane Doe");
    expect(foundUser.user_email).toBe("jane.doe@example.com");
    expect(foundUser.user_role).toBe(2);
  });

  it("should update a user", async () => {
    const newUser = await User.create({
      user_name: "Michael Smith",
      user_email: "michael.smith@example.com",
      user_password: "password789",
      user_role: 3,
    });

    const updatedUser = await User.update(
      { user_name: "Updated Name" },
      { where: { user_id: newUser.user_id } }
    );

    expect(updatedUser[0]).toBe(1);
  });

  it("should delete a user", async () => {
    const newUser = await User.create({
      user_name: "Sarah Johnson",
      user_email: "sarah.johnson@example.com",
      user_password: "password000",
      user_role: 4,
    });

    const deletedUser = await User.destroy({
      where: { user_id: newUser.user_id },
    });

    expect(deletedUser).toBe(1);
  });
});
