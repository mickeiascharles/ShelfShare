const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send("Acesso negado. Nenhum token foi fornecido.");
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .send('Token em formato inválido. Use "Bearer <token>".');
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = payload;

    next();
  } catch (ex) {
    res.status(400).send("Token inválido.");
  }
}

module.exports = auth;
