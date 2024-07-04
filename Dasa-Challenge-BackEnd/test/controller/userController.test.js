const request = require("supertest");
const app = require("../../src/app");
const User = require("../../src/models/userModel");

describe("UserController", () => {
  describe("GET /users", () => {
    it("should get all users", async () => {
      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe("GET /users/:user_id", () => {
  it("should get a user by ID", async () => {
    const userId = 1;

    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.user_id).toBe(userId);
  });

  it("should return 404 if user ID does not exist", async () => {
    const nonExistentUserId = 9999;

    const response = await request(app).get(`/users/${nonExistentUserId}`);

    expect(response.status).toBe(404);
  });
});

describe("POST /users", () => {
  it("should create a new user", async () => {
    const newUser = {
      user_email: "newuser@example.com",
      user_name: "New User",
      user_password: "password123",
    };

    const response = await request(app).post("/users").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Usuário criado com sucesso!");
  });

  it("should return 400 if email is invalid", async () => {
    const invalidUser = {
      user_email: "",
      user_name: "Invalid User",
      user_password: "password123",
    };

    const response = await request(app).post("/users").send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("O e-mail é inválido!");
  });

  it("should return 406 if email already exists", async () => {
    const existingUser = {
      user_email: "existing@example.com",
      user_name: "Existing User",
      user_password: "password123",
    };

    const response = await request(app).post("/users").send(existingUser);

    expect(response.status).toBe(406);
    expect(response.body.error).toBe("O e-mail já está cadastrado!");
  });
});

describe("PUT /users/:user_id", () => {
  it("should update a user by ID", async () => {
    const userId = 1;
    const updatedUserData = {
      user_id: userId,
      user_name: "Updated User",
      user_role: "admin",
      user_email: "updated@example.com",
    };

    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUserData);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Usuário atualizado com sucesso!");
  });

  it("should return 404 if user ID does not exist", async () => {
    const nonExistentUserId = 9999;
    const updatedUserData = {
      user_id: nonExistentUserId,
      user_name: "Updated User",
      user_role: "admin",
      user_email: "updated@example.com",
    };

    const response = await request(app)
      .put(`/users/${nonExistentUserId}`)
      .send(updatedUserData);

    expect(response.status).toBe(404);
  });
});

describe("DELETE /users/:user_id", () => {
  it("should delete a user by ID", async () => {
    const userIdToDelete = 1;

    const response = await request(app).delete(`/users/${userIdToDelete}`);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Usuário deletado com sucesso!");
  });

  it("should return 406 if user ID does not exist", async () => {
    const nonExistentUserId = 9999;

    const response = await request(app).delete(`/users/${nonExistentUserId}`);

    expect(response.status).toBe(406);
  });
});

describe("POST /users/recover-password", () => {
  it("should recover password for a user", async () => {
    const userWithEmail = { user_email: "existing@example.com" };

    const response = await request(app)
      .post("/users/recover-password")
      .send(userWithEmail);

    expect(response.status).toBe(200);
  });

  it("should return 406 if user email does not exist", async () => {
    const nonExistentUserEmail = { user_email: "nonexistent@example.com" };

    const response = await request(app)
      .post("/users/recover-password")
      .send(nonExistentUserEmail);

    expect(response.status).toBe(406);
  });
});

describe("POST /users/change-password", () => {
  it("should change password with valid token", async () => {
    const validToken = "validToken";
    const newPassword = { token: validToken, user_password: "newpassword123" };

    const response = await request(app)
      .post("/changepassword")
      .send(newPassword);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Senha alterada com sucesso!");
  });

  it("should return 406 if token is invalid", async () => {
    const invalidToken = "invalidToken";
    const newPassword = {
      token: invalidToken,
      user_password: "newpassword123",
    };

    const response = await request(app)
      .post("/changepassword")
      .send(newPassword);

    expect(response.status).toBe(406);
  });
});

describe("POST /login", () => {
  it("should log in with correct credentials", async () => {
    const credentials = {
      user_email: "bruno@gmail.com",
      user_password: "1234",
    };

    const response = await request(app).post("/login").send(credentials);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return 404 if user email does not exist", async () => {
    const credentials = {
      user_email: "nonexistent@example.com",
      user_password: "password123",
    };

    const response = await request(app).post("/login").send(credentials);

    expect(response.status).toBe(404);
  });
  it("should return 406 if password is incorrect", async () => {
    const user = {
      user_email: "bruno@gmail.com",
      user_password: "1234", // Senha correta
    };

    const credentials = {
      user_email: user.user_email,
      user_password: "wrongpassword", // Senha incorreta
    };

    // Execute a solicitação POST para /login com as credenciais incorretas
    const response = await request(app).post("/login").send(credentials);

    // Verifique se o status retornado é 406 (Senha incorreta)
    expect(response.status).toBe(406);
  });
});
