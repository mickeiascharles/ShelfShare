import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/cadastro.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MeusLivros from "./pages/meusLivros.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 2. ADICIONAR NOVA ROTA */}
      <Route path="/meus-livros" element={<MeusLivros />} />

      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
