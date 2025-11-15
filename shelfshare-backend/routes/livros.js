const express = require("express");
const db = require("../db.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const idUsuarioLogado = req.usuario.id;

    const [livros] = await db.query(
      `SELECT 
                l.id, 
                l.titulo, 
                l.autor, 
                l.isbn, 
                u.nome AS nome_dono
             FROM 
                livros l
             JOIN 
                usuarios u ON l.id_dono = u.id
             WHERE 
                l.status = 'disponivel' 
                AND l.id_dono != ?`,
      [idUsuarioLogado]
    );

    res.status(200).json(livros);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar livros.");
  }
});

router.post("/", auth, async (req, res) => {
  const { titulo, autor, isbn } = req.body;
  const idDono = req.usuario.id;

  if (!titulo || !autor) {
    return res.status(400).send("Título e Autor são obrigatórios.");
  }

  try {
    const [result] = await db.query(
      "INSERT INTO livros (id_dono, titulo, autor, isbn) VALUES (?, ?, ?, ?)",
      [idDono, titulo, autor, isbn || null]
    );

    res.status(201).json({
      message: "Livro cadastrado com sucesso!",
      idLivro: result.insertId,
      titulo: titulo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar livro.");
  }
});

router.get("/meus", auth, async (req, res) => {
  try {
    const idUsuarioLogado = req.usuario.id;

    const [meusLivros] = await db.query(
      `SELECT id, titulo, autor, isbn, status 
             FROM livros 
             WHERE id_dono = ?`,
      [idUsuarioLogado]
    );

    res.status(200).json(meusLivros);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar seus livros.");
  }
});

module.exports = router;
