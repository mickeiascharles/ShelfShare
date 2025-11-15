// src/services/api.js
import axios from "axios";

// 1. Cria a instância do axios
const api = axios.create({
  baseURL: "http://localhost:3001/api", // A URL base da sua API
});

// --- INJETOR DE TOKEN (A CORREÇÃO) ---
// 2. Pega o token do localStorage
const token = localStorage.getItem("token");

// 3. Se o token existir, define-o no cabeçalho padrão do 'api'
// Isso garante que QUALQUER requisição futura já saia com o token.
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
// ------------------------------------

// 4. Exporta a instância pronta
export default api;
