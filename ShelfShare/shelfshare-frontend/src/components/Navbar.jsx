import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./navbar.module.css";
import logo from "../assets/logo-branco.png";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/dashboard">
          <img src={logo} alt="ShelfShare Logo" className={styles.logo} />
        </Link>

        {/* LINKS DE NAVEGAÇÃO ADICIONADOS */}
        <div className={styles.navLinks}>
          <Link to="/dashboard">Livros Disponíveis</Link>
          <Link to="/meus-livros">Meus Livros</Link>
        </div>
      </div>

      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair (Logout)
      </button>
    </nav>
  );
}

export default Navbar;
