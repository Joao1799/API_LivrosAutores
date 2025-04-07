const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET
router.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// POST
router.post('/', async (req, res) => {
    const { name, senha } = req.body;
    const user = await prisma.user.create({ data: { name, senha } });
    res.json(user);
});

module.exports = router;
