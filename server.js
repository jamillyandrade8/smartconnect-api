const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3333;

app.use(express.json());

// 1. ROTA DE CADASTRO (POST) - Criar um cliente no PostgreSQL
app.post('/customers', async (req, res) => {
    const { name, email, phone, notes } = req.body;

    // Validação simples de campos obrigatórios
    if (!name || !email) {
        return res.status(400).json({ error: "Nome e E-mail são obrigatórios!" });
    }

    try {
        const newCustomer = await prisma.customer.create({
            data: { name, email, phone, notes }
        });
        res.status(201).json({ message: "Cliente cadastrado com sucesso!", data: newCustomer });
    } catch (error) {
        res.status(500).json({ error: "Erro ao cadastrar cliente. Verifique se o e-mail já existe." });
    }
});

// 2. ROTA DE LISTAGEM (GET) - Buscar todos os clientes salvos
app.get('/customers', async (req, res) => {
    try {
        const customers = await prisma.customer.findMany({
            orderBy: { createdAt: 'desc' } // Mostra os mais recentes primeiro
        });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar clientes no banco de dados." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 SmartConnect API rodando na porta ${PORT}`);
});