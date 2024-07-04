const Product = require("../models/productModel");

class productController {
  async index(req, res) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produtos." });
    }
  }

  async create(req, res) {
    const { product_name, product_description, product_price, category_id } =
      req.body;
    let { product_image } = req.body;
    const user_id = req.user.user_id;

    if (!product_name || product_name.trim() === "") {
      return res.status(400).json({ error: "O título é inválido!" });
    }

    try {
      const nameExists = await Product.findOne({ where: { product_name } });
      if (nameExists) {
        return res.status(406).json({ error: "O produto já está cadastrado!" });
      }
      if (product_image) {
        product_image = Buffer.from(product_image, "base64");
      }

      await Product.create({
        product_name,
        product_description,
        product_price,
        product_image,
        category_id,
        user_id,
      });
      res.status(200).json({ message: "Produto criado com sucesso!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  async findProduct(req, res) {
    const id = req.params.product_id;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({});
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar produto." });
    }
  }

  async editProduct(req, res) {
    const {
      product_id,
      product_name,
      product_description,
      product_price,
      category_id,
    } = req.body;

    try {
      const result = await Product.update(
        {
          product_name,
          product_description,
          product_price,
          category_id,
          user_id: req.user.user_id,
        },
        { where: { product_id: product_id } }
      );
      if (result[0] > 0) {
        res.status(200).send("Edição concluída");
      } else {
        res.status(406).json({ error: "Erro ao editar produto." });
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }

  async deleteProduct(req, res) {
    const product_id = req.params.product_id;
    try {
      const result = await Product.destroy({
        where: { product_id: product_id },
      });
      if (result) {
        res.status(200).send("Produto deletado com sucesso");
      } else {
        res.status(406).send("Erro ao deletar produto.");
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }
}

module.exports = new productController();
