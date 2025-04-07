const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /books
router.get('/', async (req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
});

// GET /books/:id
router.get('/:id', async (req, res) => {
    const book = await prisma.book.findUnique({
        where: { id: req.params.id },
    });
    res.json(book);
});

// POST /books
router.post('/', async (req, res) => {
    const { name, author_id, pages } = req.body;
    const book = await prisma.book.create({
        data: { name, author_id, pages },
    });
    res.json(book);
});

// DELETE /books/:id
router.delete('/:id', async (req, res) => {
    await prisma.book.delete({ where: { id: req.params.id } });
    res.status(204).end();
});

module.exports = router;
