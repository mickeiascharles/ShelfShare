<div align="center">
    <img height="200cm" src="/Logo branco oficial.png"/>
</div>

<br>
Projeto desenvolvido para a matéria de Teste de Software.
<br>

## Resumo do projeto

**ShelfShare** é uma plataforma digital para o compartilhamento e empréstimo de livros entre usuários. A aplicação foi desenhada para funcionar como uma "biblioteca" comunitária, onde usuários podem disponibilizar livros que já leram e solicitar o empréstimo de títulos de outros membros da comunidade.

O projeto foi construído com o objetivo principal de servir como um sistema completo para a aplicação prática de metodologias de teste de software.

## Funcionalidades Principais

* **Autenticação de Usuários:** Sistema completo de cadastro e login de usuários, utilizando `bcrypt` para hashing de senhas e **JSON Web Tokens (JWT)** para gerenciamento de sessões seguras.
* **Gerenciamento de Livros ("Meus Livros"):** Usuários autenticados podem cadastrar seus próprios livros (com título, autor, etc.) na plataforma, que ficam listados em sua página de perfil.
* **Dashboard de Livros Disponíveis:** A página principal exibe todos os livros marcados como "disponível" que *não* pertencem ao usuário logado, incentivando a troca.
* **Sistema de Empréstimo (Backend):**
    * Ao solicitar um livro, o sistema executa uma **transação SQL** no backend.
    * A transação verifica se o livro está disponível, muda seu status para "emprestado" e cria um registro de empréstimo.
    * Se qualquer etapa falhar, a transação inteira é revertida (`ROLLBACK`) para garantir a integridade dos dados (evitando que um livro seja emprestado duas vezes).
* **Interface Reativa:** O frontend em React atualiza a interface do usuário em tempo real, removendo um livro da lista de "Disponíveis" imediatamente após a solicitação ser bem-sucedida, sem a necessidade de recarregar a página.

## Arquitetura e Tecnologia

O projeto é construído sobre uma arquitetura de cliente-servidor (Frontend/Backend) separada.

### Backend (Servidor)

* **Node.js** com **Express.js** para a criação da API RESTful.
* **MySQL** como banco de dados para armazenar informações de usuários, livros e empréstimos.
* **Autenticação:** `jsonwebtoken` (JWT) para gerar tokens de sessão e `bcryptjs` para a criptografia de senhas.
* **CORS** para permitir a comunicação entre o frontend (rodando na porta 5173) e o backend (rodando na porta 3001).

### Frontend (Cliente)

* **React** (construído com **Vite**) para uma interface de usuário rápida e reativa.
* **HTML5** e **CSS3** (com **CSS Modules**) para estilização moderna e escopada.
* **React Router DOM** para gerenciar a navegação entre as páginas (Login, Cadastro, Dashboard, etc.).
* **Axios** para gerenciar todas as requisições HTTP para a API do backend.

## Foco em Teste de Software

O objetivo principal deste projeto foi aplicar um ciclo completo de testes, incluindo:

* **Testes Unitários (Jest):** Focados em validar a lógica de negócio pura no backend (ex: validadores de e-mail e senha).
* **Testes de API (Postman):** Usados para validar cada endpoint da API, testando respostas de sucesso (`200 OK`, `201 Created`) e de erro (`401 Unauthorized`, `400 Bad Request`).
* **Testes de Interface (Robot Framework + Selenium):** Scripts automatizados para simular o fluxo do usuário no frontend (abrir o navegador, preencher formulários, clicar em botões e validar resultados).
* **Testes de Carga e Estresse (JMeter):** Usados para medir o desempenho da API de cadastro, simulando 50 usuários (carga) e 500 usuários (estresse) para encontrar o ponto de quebra do sistema.

## 5. Tecnologias Envolvidas

<div>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"/>
    <img height="35cm" src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-1-logo-png-transparent.png"/>
    <img height="35cm" src="https://img.icons8.com/color/512/express-js.png"/>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/MySQL_logo.svg/2560px-MySQL_logo.svg.png"/>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Axios_logo_%282020%29.svg/2560px-Axios_logo_%282020%29.svg.png"/>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/f/f1/Vitejs-logo.svg"/>
    <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2048px-HTML5_logo_and_wordmark.svg.png"/>
  <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/CSS3_logo_and_wordmark.svg/1200px-CSS3_logo_and_wordmark.svg.png"/>
  <img height="35cm" src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"/>
</div>
<br>

## 6. Como Fazer para Rodar no Seu Sistema

Este projeto é dividido em duas partes (Backend e Frontend) e requer um banco de dados MySQL.

### 1. Pré-requisitos
* **Node.js (v18+):** [Baixe aqui](https://nodejs.org/)
* **Git:** [Baixe aqui](https://git-scm.com/)
* **MySQL:** Você precisa de um servidor MySQL rodando. O **MySQL Workbench** é recomendado: [Baixe aqui](https://dev.mysql.com/downloads/workbench/)

### 2. Clonando o Repositório
```bash
# Clone o repositório (substitua pela URL do seu repo)
git clone [https://github.com/mickeiascharles/ShelfShare.git](https://github.com/mickeiascharles/ShelfShare.git)

# Entre na pasta do projeto
cd ShelfShare
