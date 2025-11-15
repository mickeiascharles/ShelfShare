const express = require("express");
const bcrypt = require("bcryptjs");
const db = require("../db.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).send("Todos os campos são obrigatórios.");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    const [result] = await db.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, hashedPassword]
    );

    res
      .status(201)
      .send(`Usuário cadastrado com sucesso! ID: ${result.insertId}`);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).send("Este e-mail já está em uso.");
    }
    console.error(error); // Mostra o erro no console do backend
    res.status(500).send("Erro ao cadastrar usuário.");
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).send("E-mail e senha são obrigatórios.");
  }

  try {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);

    const usuario = rows[0];
    if (!usuario) {
      return res.status(401).send("Credenciais inválidas.");
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).send("Credenciais inválidas.");
    }

    const payload = {
      id: usuario.id,
      nome: usuario.nome,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login bem-sucedido!",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro no servidor durante o login.");
  }
});

module.exports = router;
