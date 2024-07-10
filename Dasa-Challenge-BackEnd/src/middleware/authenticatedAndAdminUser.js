const jwt = require("jsonwebtoken");
const passport = require("../config/passport-config");
const secret = process.env.JWT_SECRET;

function authenticatedUser(req, res, next) {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
}

function adminUser(req, res, next) {
  const authToken = req.headers["authorization"];

  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    const token = bearer[1];

    try {
      const decoded = jwt.verify(token, secret);
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
}

function authenticatedAndAdmin(req, res, next) {
  authenticatedUser(req, res, (err) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    adminUser(req, res, next);
  });
}

module.exports = authenticatedAndAdmin;
