const express = require("express");
const db = require("../db.js");
const auth = require("../middleware/auth.js");

const router = express.Router();

router.post("/solicitar", auth, async (req, res) => {
  const { id_livro } = req.body;
  const id_solicitante = req.usuario.id;

  if (!id_livro) {
    return res.status(400).send("ID do livro é obrigatório.");
  }

  let connection;
  try {
    connection = await db.getConnection();

    await connection.beginTransaction();

    const [rows] = await connection.query(
      "SELECT id_dono, status FROM livros WHERE id = ? FOR UPDATE",
      [id_livro]
    );

    const livro = rows[0];

    if (!livro) {
      await connection.rollback();
      return res.status(404).send("Livro não encontrado.");
    }
    if (livro.id_dono === id_solicitante) {
      await connection.rollback();
      return res
        .status(400)
        .send("Você não pode emprestar um livro de si mesmo.");
    }
    if (livro.status !== "disponivel") {
      await connection.rollback();
      return res.status(400).send("Este livro não está mais disponível.");
    }

    await connection.query(
      "UPDATE livros SET status = 'emprestado' WHERE id = ?",
      [id_livro]
    );

    const dataDevolucao = new Date();
    dataDevolucao.setDate(dataDevolucao.getDate() + 14);

    await connection.query(
      `INSERT INTO emprestimos 
        (id_livro, id_solicitante, id_dono, data_devolucao_prevista, status) 
       VALUES (?, ?, ?, ?, 'aceito')`,
      [id_livro, id_solicitante, livro.id_dono, dataDevolucao]
    );

    await connection.commit();

    res.status(201).send("Empréstimo solicitado com sucesso!");
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Erro na transação de empréstimo:", error);
    res.status(500).send("Erro no servidor ao processar a solicitação.");
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;
