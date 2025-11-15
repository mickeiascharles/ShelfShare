import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";

import styles from "./login.module.css";
import logoShelfShare from "../assets/logo-preto.png";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMensagem("");

    try {
      const response = await api.post("/usuarios/login", {
        email: email,
        senha: senha,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setMensagem("Login bem-sucedido!");
      navigate("/dashboard");
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
      <div className={styles.loginBox}>
        <img
          src={logoShelfShare}
          alt="Logo ShelfShare"
          className={styles.logo}
        />
        <h1 className={styles.title}>Bem-vindo de volta</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
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
              placeholder="Sua senha"
            />
          </div>

          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>

        {mensagem && (
          <p
            className={`${styles.message} ${
              mensagem.startsWith("Erro") ? styles.error : styles.success
            }`}
          >
            {mensagem}
          </p>
        )}

        {/* --- 2. LINK ADICIONADO AQUI --- */}
        <p className={styles.cadastroLink}>
          Não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
