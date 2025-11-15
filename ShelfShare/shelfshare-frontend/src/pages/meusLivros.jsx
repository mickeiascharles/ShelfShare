import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import styles from "./meusLivros.module.css";
import api from "../services/api.js";

function MeusLivros() {
  const [meusLivros, setMeusLivros] = useState([]);
  const [loading, setLoading] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [mensagem, setMensagem] = useState("");

  const fetchMeusLivros = async () => {
    try {
      setLoading(true);
      const response = await api.get("/livros/meus");
      setMeusLivros(response.data);
    } catch (error) {
      console.error("Erro ao buscar 'meus livros':", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeusLivros();
  }, []);

  const handleNovoLivro = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (!titulo || !autor) {
      setMensagem("Erro: Título e Autor são obrigatórios.");
      return;
    }

    try {
      await api.post("/livros", { titulo, autor, isbn });

      setMensagem("Livro cadastrado com sucesso!");

      setTitulo("");
      setAutor("");
      setIsbn("");

      fetchMeusLivros();
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      setMensagem("Erro ao cadastrar o livro.");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.content}>
        <div className={styles.layoutSplit}>
          {/* Coluna 1: Formulário de Cadastro */}
          <div className={styles.formContainer}>
            <h2>Cadastrar Novo Livro</h2>
            <form onSubmit={handleNovoLivro} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="titulo">Título:</label>
                <input
                  id="titulo"
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="autor">Autor:</label>
                <input
                  id="autor"
                  type="text"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="isbn">ISBN (Opcional):</label>
                <input
                  id="isbn"
                  type="text"
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                />
              </div>
              <button type="submit" className={styles.button}>
                Cadastrar
              </button>

              {mensagem && (
                <p
                  className={`${styles.message} ${
                    mensagem.startsWith("Erro") ? styles.error : styles.success
                  }`}
                >
                  {mensagem}
                </p>
              )}
            </form>
          </div>

          {/* Coluna 2: Lista dos Meus Livros */}
          <div className={styles.listContainer}>
            <h2>Meus Livros Cadastrados</h2>
            {loading ? (
              <p>Carregando...</p>
            ) : (
              meusLivros.map((livro) => (
                <div key={livro.id} className={styles.bookItem}>
                  <div className={styles.bookItemInfo}>
                    <h3>{livro.titulo}</h3>
                    <p>por {livro.autor}</p>
                  </div>
                  <span
                    className={`${styles.bookItemStatus} ${
                      styles[livro.status]
                    }`}
                  >
                    {livro.status === "disponivel"
                      ? "Disponível"
                      : "Emprestado"}
                  </span>
                </div>
              ))
            )}
            {!loading && meusLivros.length === 0 && (
              <p>Você ainda não cadastrou nenhum livro.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default MeusLivros;
