require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usuarioRoutes = require("./routes/usuarios.js");
const livroRoutes = require("./routes/livros.js");
const emprestimoRoutes = require("./routes/emprestimos.js");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do ShelfShare está no ar!");
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/livros", livroRoutes);
app.use("/api/emprestimos", emprestimoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
