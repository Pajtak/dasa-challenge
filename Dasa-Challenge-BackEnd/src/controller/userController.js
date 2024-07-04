const User = require("../models/userModel");
const PasswordToken = require("../models/passwordTokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar usuários." });
    }
  }

  async findUser(req, res) {
    const id = req.params.user_id;
    console.log("Finding user with ID:", id);
    try {
      const user = await User.findByPk(id);
      if (!user) {
        console.log("User not found with ID:", id);
        return res.status(404).json({});
      }
      console.log("User found:", user);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  }

  async create(req, res) {
    try {
      const { user_email, user_name, user_password } = req.body;
      let { user_image } = req.body;

      if (!user_email || user_email.trim() === "") {
        res.status(400).json({ error: "O e-mail é inválido!" });
        return;
      }

      const emailExists = await User.findOne({ where: { user_email } });

      if (emailExists) {
        res.status(406).json({ error: "O e-mail já está cadastrado!" });
        return;
      }

      const hashedPassword = await bcrypt.hash(String(user_password), 10);

      if (user_image) {
        user_image = Buffer.from(user_image, "base64");
      }

      await User.create({
        user_email,
        user_name,
        user_password: hashedPassword,
        user_image,
      });

      res.status(200).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }

  async edit(req, res) {
    const { user_id, user_name, user_role, user_email, user_image } = req.body;
    try {
      const result = await User.update(
        { user_name, user_role, user_email, user_image },
        { where: { user_id: user_id } }
      );
      if (result[0] > 0) {
        res.status(200).send("Usuário atualizado com sucesso!");
      } else {
        res.status(406).json({ error: "Erro ao atualizar usuário." });
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }

  async remove(req, res) {
    const id = req.params.user_id;

    try {
      const result = await User.destroy({ where: { user_id: id } });
      if (result) {
        res.status(200).send("Usuário deletado com sucesso!");
      } else {
        res.status(406).json({ error: "Erro ao deletar usuário." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }

  async recoverPassword(req, res) {
    const { user_email } = req.body;
    try {
      const result = await PasswordToken.create(user_email);
      if (result.status) {
        res.status(200).send("" + result.token);
      } else {
        res.status(406).send(result.error);
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }

  async changePassword(req, res) {
    const { token, user_password } = req.body;
    try {
      const isTokenValid = await PasswordToken.validate(token);
      if (isTokenValid.status) {
        const hashedPassword = await bcrypt.hash(user_password, 10);
        await User.update(
          { user_password: hashedPassword },
          { where: { token_id: isTokenValid.token.user_id } }
        );
        res.status(200).send("Senha alterada com sucesso!");
      } else {
        res.status(406).send("Token inválido!");
      }
    } catch (error) {
      res.status(500).send("Ocorreu um erro no servidor.");
    }
  }

  async login(req, res) {
    const { user_email, user_password } = req.body;

    try {
      const user = await User.findOne({ where: { user_email: user_email } });

      if (user) {
        const passwordToCompare = user_password.toString();

        const resultado = await bcrypt.compare(
          passwordToCompare,
          user.user_password
        );

        if (resultado) {
          const token = jwt.sign(
            { email: user.user_email, role: user.user_role, id: user.user_id },
            secret,
            { expiresIn: "1h" }
          );
          res.status(200).json({ token, user_role: user.user_role });
        } else {
          res.status(406).send("Senha incorreta.");
        }
      } else {
        res.status(404).json({ error: "Usuário não encontrado." });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro no servidor." });
    }
  }
}

module.exports = new UserController();
