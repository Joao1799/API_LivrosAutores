const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// GET todos os usuários (só pra teste)
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany({
        select: { id: true, name: true } // não retornar senha
    });
    res.json(users);
});

// POST /users - criar novo usuário
router.post('/', async (req, res) => {
    const { name, senha } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { name } });
    if (existingUser) {
        return res.status(400).json({ error: 'Usuário já existe' });
    }

    // hash da senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
        data: { name, senha: hashedPassword },
        select: { id: true, name: true }
    });

    res.json(user);
});

// POST /users/login - login de usuário
router.post('/login', async (req, res) => {
    const { name, senha } = req.body;

    const user = await prisma.user.findUnique({ where: { name } });
    if (!user) {
        return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
        return res.status(401).json({ error: 'Senha inválida' });
    }

    res.json({ message: 'Login bem-sucedido', user: { id: user.id, name: user.name } });
});

module.exports = router;
