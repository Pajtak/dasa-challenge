const User = require("./userModel");
const PasswordToken = require("../models/passwordTokenModel");

class PasswordTokenService {
  async create(email) {
    try {
      const user = await User.findOne({ where: { user_email: email } });
      if (user) {
        const token = Date.now().toString();
        await PasswordToken.create({
          user_id: user.user_id,
          used: false,
          token: token,
        });
        return { status: true, token: token };
      } else {
        return {
          status: false,
          err: "O e-mail passado não existe no banco de dados!",
        };
      }
    } catch (err) {
      console.error(err);
      return { status: false, err: err };
    }
  }

  async validate(token) {
    try {
      const tokenRecord = await PasswordToken.findOne({
        where: { token: token },
      });
      if (tokenRecord) {
        if (tokenRecord.used) {
          return { status: false };
        } else {
          return { status: true, token: tokenRecord };
        }
      } else {
        return { status: false };
      }
    } catch (err) {
      console.error(err);
      return { status: false };
    }
  }

  async setUsed(token) {
    try {
      const result = await PasswordToken.update(
        { used: true },
        { where: { token: token } }
      );
      return result[0] > 0;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = new PasswordTokenService();
