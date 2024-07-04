const request = require("supertest");
const app = require("../../src/app");
const Category = require("../../src/models/categoryModel");

describe("CategoriesController", () => {
  describe("GET /categories", () => {
    it("should get all categories", async () => {
      const response = await request(app).get("/categories");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe("POST /categories", () => {
  it("should create a new category", async () => {
    const newCategory = {
      category_name: "New Category",
      category_description: "Description of New Category",
    };

    const response = await request(app).post("/categories").send(newCategory);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Categoria criada com sucesso!");
  });

  it("should return 400 if category name is invalid", async () => {
    const invalidCategory = {
      category_name: "",
      category_description: "Invalid Category Description",
    };

    const response = await request(app)
      .post("/categories")
      .send(invalidCategory);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("O título é inválido!");
  });

  it("should return 406 if category name already exists", async () => {
    const existingCategory = {
      category_name: "Existing Category",
      category_description: "Description of Existing Category",
    };

    const response = await request(app)
      .post("/categories")
      .send(existingCategory);

    expect(response.status).toBe(406);
    expect(response.body.error).toBe("A categoria já está cadastrada!");
  });
});

describe("GET /categories/:category_id", () => {
  it("should get a category by ID", async () => {
    const categoryId = 1;

    const response = await request(app).get(`/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body.category_id).toBe(categoryId);
  });

  it("should return 404 if category ID does not exist", async () => {
    const nonExistentCategoryId = 9999;

    const response = await request(app).get(
      `/categories/${nonExistentCategoryId}`
    );

    expect(response.status).toBe(404);
  });
});

describe("PUT /categories/:category_id", () => {
  it("should update a category by ID", async () => {
    const categoryId = 1;
    const updatedCategoryData = {
      category_id: categoryId,
      category_name: "Updated Category",
      category_description: "Updated Description of Category",
    };

    const response = await request(app)
      .put(`/categories/${categoryId}`)
      .send(updatedCategoryData);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Edição concluída");
  });

  it("should return 406 if category ID does not exist", async () => {
    const nonExistentCategoryId = 9999;
    const updatedCategoryData = {
      category_id: nonExistentCategoryId,
      category_name: "Updated Category",
      category_description: "Updated Description of Category",
    };

    const response = await request(app)
      .put(`/categories/${nonExistentCategoryId}`)
      .send(updatedCategoryData);

    expect(response.status).toBe(406);
  });
});

describe("DELETE /categories/:category_id", () => {
  it("should delete a category by ID", async () => {
    const categoryIdToDelete = 1;

    const response = await request(app).delete(
      `/categories/${categoryIdToDelete}`
    );

    expect(response.status).toBe(200);
    expect(response.text).toBe("Categoria deletada com sucesso");
  });

  it("should return 406 if category ID does not exist", async () => {
    const nonExistentCategoryId = 9999;

    const response = await request(app).delete(
      `/categories/${nonExistentCategoryId}`
    );

    expect(response.status).toBe(406);
  });
});
