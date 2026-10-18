const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para ler JSON nas requisições
app.use(express.json());

// Rota de teste inicial
app.get('/', (req, res) => {
    res.json({ message: "SmartConnect API - Em desenvolvimento ativo para a Smartspace!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando com sucesso na porta ${PORT}`);
});