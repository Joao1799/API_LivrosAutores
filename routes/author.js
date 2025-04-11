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

// PUT /authors/:id
router.put('/:id', async (req, res) => {
    const { name, email } = req.body;
  
    try {
      const updatedAuthor = await prisma.author.update({
        where: { id: req.params.id },
        data: {
          name,
          email,
        },
      });
      console.log(updatedAuthor);
      
      res.json(updatedAuthor);
    } catch (error) {
      console.error("Erro ao atualizar autor:", error);
      res.status(400).json({ error: "Erro ao atualizar autor." });
    }
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
