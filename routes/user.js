const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// GET todos os usuários (só pra teste)
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true }
    });
    res.json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// POST /users/register - criar novo usuário
router.post('/register', async (req, res) => {
  const { name, email, senha } = req.body;

  if (!name || !email || !senha) {
    return res.status(400).json({ error: "Nome, e-mail e senha são obrigatórios" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já está em uso' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);

    const user = await prisma.user.create({
      data: { name, email, senha: hashedPassword },
      select: { id: true, name: true, email: true }
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

// POST /users/login - login de usuário
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    return res.json({
      message: 'Login bem-sucedido',
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error("Erro ao logar:", error);
    return res.status(500).json({ error: "Erro interno no login" });
  }
});

module.exports = router;
