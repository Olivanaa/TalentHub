require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require('jsonwebtoken');
const usuarios = require("./data/usuarios.json");
const profissionais = require("./data/profissionais.json");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.SECRET_KEY;

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/profissionais", (req, res) => {
  res.json(profissionais);
});

app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const user = usuarios.find(u => u.email === email && u.senha === senha);

    if (!user) {
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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});