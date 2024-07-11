import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export function AdminAuth(req, res, next) {
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
