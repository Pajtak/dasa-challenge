const Category = require("../models/categoryModel");

class CategoriesController {
  async index(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categorias." });
    }
  }

  async create(req, res) {
    const { category_name, category_description } = req.body;
    let { category_image } = req.body;
    const user_id = req.user.user_id;

    if (!category_name || category_name.trim() === "") {
      return res.status(400).json({ error: "O título é inválido!" });
    }

    try {
      const nameExists = await Category.findOne({
        where: { category_name: category_name },
      });
      if (nameExists) {
        return res
          .status(406)
          .json({ error: "A categoria já está cadastrada!" });
      }

      if (category_image) {
        category_image = Buffer.from(category_image, "base64");
      }

      await Category.create({
        category_name,
        category_description,
        category_image,
        user_id,
      });
      res.status(200).json({ message: "Categoria criada com sucesso!" });
    } catch (error) {
      console.error("Erro ao criar categoria:", error);
      res.status(500).json({ error: "Erro ao criar categoria." });
    }
  }

  async findCategory(req, res) {
    const id = req.params.category_id;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({});
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar categoria." });
    }
  }

  async editCategory(req, res) {
    const { category_id, category_name, category_description } = req.body;
    const { id: user_id } = req.user;

    try {
      const result = await Category.update(
        { category_name, category_description, user_id },
        { where: { category_id: category_id } }
      );
      if (result[0] > 0) {
        res.status(200).send("Edição concluída");
      } else {
        res.status(406).json({ error: "Erro ao editar categoria." });
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }

  async deleteCategory(req, res) {
    const category_id = req.params.category_id;
    try {
      const result = await Category.destroy({
        where: { category_id: category_id },
      });
      if (result) {
        res.status(200).send("Categoria deletada com sucesso");
      } else {
        res.status(406).send("Erro ao deletar categoria.");
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }
}

module.exports = new CategoriesController();
