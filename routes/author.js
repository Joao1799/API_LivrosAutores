const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /authors
router.get('/', async (req, res) => {
    const authors = await prisma.author.findMany();
    res.json(authors);
});

// GET /authors/:id
router.get('/:id', async (req, res) => {
    const author = await prisma.author.findUnique({
        where: { id: req.params.id },
    });
    res.json(author);
});

// POST /authors
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    const author = await prisma.author.create({
        data: { name, email },
    });
    res.json(author);
});

// DELETE /authors/:id
router.delete('/:id', async (req, res) => {
    await prisma.author.delete({ where: { id: req.params.id } });
    res.status(204).end();
});

module.exports = router;
