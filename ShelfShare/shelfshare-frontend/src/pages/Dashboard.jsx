import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import styles from "./dashboard.module.css";
import api from "../services/api.js";

function Dashboard() {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [solicitandoId, setSolicitandoId] = useState(null);

  const fetchLivros = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/livros");
      setLivros(response.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Sua sessão expirou. Por favor, faça login novamente.");
      } else {
        setError("Erro ao carregar os livros. Tente novamente mais tarde.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleSolicitar = async (idLivro) => {
    setSolicitandoId(idLivro);
    setError("");

    try {
      await api.post("/emprestimos/solicitar", {
        id_livro: idLivro,
      });
      setLivros((livrosAtuais) =>
        livrosAtuais.filter((livro) => livro.id !== idLivro)
      );
    } catch (err) {
      if (err.response && err.response.data) {
        setError(`Erro: ${err.response.data}`);
      } else {
        setError("Erro ao processar a solicitação.");
      }
      console.error(err);
    } finally {
      setSolicitandoId(null);
    }
  };
  const renderContent = () => {
    if (loading) {
      return <p className={styles.loading}>Carregando livros...</p>;
    }

    if (error) {
      return <p className={styles.error}>{error}</p>;
    }

    if (livros.length === 0) {
      return (
        <p className={styles.empty}>
          Nenhum livro disponível para empréstimo no momento.
        </p>
      );
    }

    return (
      <div className={styles.bookGrid}>
        {livros.map((livro) => (
          <div key={livro.id} className={styles.bookCard}>
            <div className={styles.bookCardContent}>
              <h3>{livro.titulo}</h3>
              <p className={styles.author}>por {livro.autor}</p>
              <p>Dono: {livro.nome_dono}</p>
            </div>

            {/* --- LÓGICA DO BOTÃO ATUALIZADA --- */}
            <button
              onClick={() => handleSolicitar(livro.id)}
              disabled={solicitandoId === livro.id}
            >
              {/* Muda o texto durante a solicitação */}
              {solicitandoId === livro.id
                ? "Solicitando..."
                : "Solicitar Empréstimo"}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.content}>
        <h1 className={styles.title}>Livros Disponíveis</h1>
        {/*
          Renderiza o erro aqui em cima, para que ele
          não desapareça se a lista de livros ficar vazia.
        */}
        {error && !loading && <p className={styles.error}>{error}</p>}
        {renderContent()}
      </main>
    </div>
  );
}

export default Dashboard;
