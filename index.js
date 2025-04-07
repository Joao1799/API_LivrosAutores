const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/books', require('./routes/books'));
app.use('/authors', require('./routes/authors'));
app.use('/user', require('./routes/users'));

app.listen(3001, () => {
    console.log('🚀 API rodando em http://localhost:3001');
});
