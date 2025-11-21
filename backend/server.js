require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require('jsonwebtoken');
const usuarios = require("./data/usuarios.json");
const profissionais = require("./data/profissionais.json");
const { log } = require("console");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'TalentHub API está rodando!',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/profissionais", (req, res) => {
  res.json(profissionais);
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    console.log(email, senha);    

    const user = usuarios.find(u => u.email === email && u.senha === senha);
    console.log(user);    

    if (!user) {
        console.log('Credenciais inválidas.');
        
        return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, nome: user.nome },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
    return res.json({
        message: "Login realizado com sucesso!",
        token,
        user
    });

});

app.use((req, res, next) => {
    res.status(404).json({ 
        message: 'Rota não encontrada',
        path: req.originalUrl
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});