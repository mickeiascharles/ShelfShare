import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";

import styles from "./cadastro.module.css";
import logoShelfShare from "../assets/logo-preto.png";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem("");

    if (!nome || !email || !senha) {
      setMensagem("Erro: Todos os campos são obrigatórios.");
      return;
    }

    try {
      await api.post("/usuarios/cadastro", {
        nome: nome,
        email: email,
        senha: senha,
      });

      setMensagem(
        "Cadastro realizado com sucesso! Redirecionando para o login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMensagem(`Erro: ${error.response.data}`);
      } else {
        setMensagem("Erro: Não foi possível se conectar ao servidor.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cadastroBox}>
        <img
          src={logoShelfShare}
          alt="Logo ShelfShare"
          className={styles.logo}
        />
        <h1 className={styles.title}>Crie sua conta</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome completo"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="senha">Senha:</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button type="submit" className={styles.button}>
            Cadastrar
          </button>
        </form>

        {/* Mensagem de feedback */}
        {mensagem && (
          <p
            className={`${styles.message} ${
              mensagem.startsWith("Erro") ? styles.error : styles.success
            }`}
          >
            {mensagem}
          </p>
        )}

        {/* Link para voltar ao Login */}
        <p className={styles.loginLink}>
          Já tem uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
