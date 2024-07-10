const User = require("../models/userModel");
const PasswordToken = require("../models/passwordTokenModel");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const secret = process.env.JWT_SECRET;

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

      if (!user_password || user_password.trim() === "") {
        res.status(400).json({ error: "A senha é obrigatória!" });
        return;
      }

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
      if (error.name === "SequelizeValidationError") {
        // Mapeia os erros para uma resposta JSON
        const errors = error.errors.map((err) => ({
          field: err.path,
          message: err.message,
        }));
        res.status(400).json({ errors });
      } else {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário." });
      }
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
    const requestingUserId = req.user.user_id;
    const requestingUserRole = req.user.user_role;

    console.log(typeof requestingUserId,typeof parseInt(id), requestingUserRole)
    if(requestingUserId !== parseInt(id) && requestingUserRole !== 1){
      return res.status(403).json({error: "Você não tem permissão para deletar esse usuário!"})
    }
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
      const token = uuidv4();
      const user = await User.findOne({ where: { user_email: user_email } });

      if (!user) {
        return res.status(404).send("Usuário não encontrado");
      }
      const result = await PasswordToken.create(
        {
          user_id: user.user_id,
          token: token,
          used: false,
        },
        { expiresIn: "1h" }
      );

      res.status(200).json({token: result.token});
    } catch (error) {
      if (error instanceof Sequelize.ValidationError) {
        return res.status(400).send(error.errors);
      }
      res.status(500).send(error);
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
          { where: { user_id: isTokenValid.token.user_id } }
        );
        await PasswordToken.markAsUsed(token);
        res.status(200).send("Senha alterada com sucesso!");
      } else {
        res.status(406).send("Token inválido!");
      }
    } catch (error) {
      res.status(500).send({ error });
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
