# TalentHub 💼

## 📌 Resumo do Projeto

O **TalentHub** é uma plataforma web desenvolvida com o objetivo de conectar profissionais (talentos) a empresas e oportunidades de trabalho.  

A aplicação permite que os usuários criem perfis profissionais contendo suas habilidades, experiências e portfólio, enquanto empresas podem buscar, filtrar e encontrar talentos ideais para vagas disponíveis.

O sistema foi pensado para facilitar o processo de recrutamento, centralizando informações importantes em um único ambiente digital de forma simples, moderna e eficiente.

O projeto está dividido em duas partes principais:  
- **Frontend:** Interface do usuário  
- **Backend:** Lógica da aplicação e gerenciamento de dados  

---
## 🎯 Funcionalidades Principais

- Busca inteligente por nome, cargo, habilidades, tecnologias, etc
- Filtros avançados por área de atuação, cidade e tecnologias
- Ordenação dos perfis por ID, A-Z ou Z-A
- Perfis Profissionais Detalhados, com informações completas de experiência profissional, habilidades técnicas e soft skills, formação acadêmica e certificações, projetos realizados e portfólio, idiomas e áreas de interesse
- Design dark/light mode
- Interface totalmente responsiva
- Modais interativos para visualização de perfis
- Login seguro com JWT

---
## 👤 Usuários e Senhas

Caso existam usuários de teste cadastrados na aplicação, eles podem ser utilizados para demonstração:

### ✅ Usuário 1
- **Nome:** Maria Souza  
- **Email:** maria.souza@example.com  
- **Senha:** 123456  

### ✅ Usuário 2
- **Nome:** Jose Henrique Ferreira  
- **Email:** jose.ferreira@example.com  
- **Senha:** abc123 

### ✅ Usuário 3
- **Nome:** Carla Mendes Rocha  
- **Email:** carla.rocha@example.com
- **Senha:** senha789

---

## 🛠️ Instalação do Projeto (Passo a Passo)

Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### 🔹 1. Clonar o repositório

```bash
git clone https://github.com/Olivanaa/TalentHub.git
cd TalentHub
```
### 🔹 2. Configuração do Backend

```bash
cd backend
npm install

```
Crie um arquivo .env na pasta backend:

```bash
SECRET_KEY=sua_chave_secreta_jwt
PORT=5000

```

### 🔹 3. Configuração do Frontend

```bash
cd ../frontend
npm install
```
Crie um arquivo .env na pasta frontend:
```bash
VITE_API_URL=http://localhost:5000

```

### 🔹 4. Executar a aplicação

Terminal 1 - Backend:

```bash
cd backend
npm start
```
Terminal 2 - Frontend:
```bash
cd frontend
npm run dev

```

### 🔹 4. Executar a aplicação

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

### 🌍 Link do Deploy

### 🔗 Aplicação em produção:


- Frontend: https://talent-hub-mu.vercel.app
- Backend: https://talenthub-backend-sa9p.onrender.com/

---

### 🔗 Link do Repositório

### 📁 GitHub:

https://github.com/Olivanaa/TalentHub

---

### 👨‍💻 Integrantes do Grupo

Matheus von Koss Wildeisen — RM: 561539

Ana Clara Rocha de Oliveira — RM: 564298

Davi Marques de Andrade Munhoz — RM: 566223