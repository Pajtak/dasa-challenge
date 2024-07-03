const jwt = require("jsonwebtoken");
const secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

module.exports = function (req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, secret);
      console.log(decoded.role);
      if (decoded.role == 1) {
        next();
      } else {
        res.status(403);
        res.send("Você não tem permissão para isso!");
        return;
      }
    } catch (err) {
      res.status(403);
      res.send("Você não está autenticado");
      return;
    }
  } else {
    res.status(403);
    res.send("Você não está autenticado");
    return;
  }
};
