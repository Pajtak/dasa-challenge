const request = require("supertest");
const app = require("../../src/app");
const Product = require("../../src/models/productModel");

describe("productController", () => {
  describe("GET /products", () => {
    it("should get all products", async () => {
      const response = await request(app).get("/products");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});

describe("POST /products", () => {
  it("should create a new product", async () => {
    const newProduct = {
      product_name: "New Product",
      product_description: "Description of New Product",
      product_price: 99.99,
      category_id: 1,
    };

    const response = await request(app).post("/products").send(newProduct);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Produto criado com sucesso!");
  });

  it("should return 400 if product name is invalid", async () => {
    const invalidProduct = {
      product_name: "",
      product_description: "Invalid Product Description",
      product_price: 99.99,
      category_id: 1,
    };

    const response = await request(app).post("/products").send(invalidProduct);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("O título é inválido!");
  });

  it("should return 406 if product name already exists", async () => {
    const existingProduct = {
      product_name: "Existing Product",
      product_description: "Description of Existing Product",
      product_price: 99.99,
      category_id: 1,
    };

    const response = await request(app).post("/products").send(existingProduct);

    expect(response.status).toBe(406);
    expect(response.body.error).toBe("O produto já está cadastrado!");
  });
});

describe("GET /products/:product_id", () => {
  it("should get a product by ID", async () => {
    const productId = 1;

    const response = await request(app).get(`/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body.product_id).toBe(productId);
  });

  it("should return 404 if product ID does not exist", async () => {
    const nonExistentProductId = 9999;

    const response = await request(app).get(
      `/products/${nonExistentProductId}`
    );

    expect(response.status).toBe(404);
  });
});

describe("PUT /products/:product_id", () => {
  it("should update a product by ID", async () => {
    const productId = 1;
    const updatedProductData = {
      product_id: productId,
      product_name: "Updated Product",
      product_description: "Updated Description of Product",
      product_price: 99.99,
      category_id: 1,
    };

    const response = await request(app)
      .put(`/products/${productId}`)
      .send(updatedProductData);

    expect(response.status).toBe(200);
    expect(response.text).toBe("Edição concluída");
  });

  it("should return 406 if product ID does not exist", async () => {
    const nonExistentProductId = 9999;
    const updatedProductData = {
      product_id: nonExistentProductId,
      product_name: "Updated Product",
      product_description: "Updated Description of Product",
      product_price: 99.99,
      category_id: 1,
    };

    const response = await request(app)
      .put(`/products/${nonExistentProductId}`)
      .send(updatedProductData);

    expect(response.status).toBe(406);
  });
});

describe("DELETE /products/:product_id", () => {
  it("should delete a product by ID", async () => {
    const productIdToDelete = 1;

    const response = await request(app).delete(
      `/products/${productIdToDelete}`
    );

    expect(response.status).toBe(200);
    expect(response.text).toBe("Produto deletado com sucesso");
  });

  it("should return 406 if product ID does not exist", async () => {
    const nonExistentProductId = 9999;

    const response = await request(app).delete(
      `/products/${nonExistentProductId}`
    );

    expect(response.status).toBe(406);
  });
});
