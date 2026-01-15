const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const bcrypt = require('bcrypt');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/books', require('./routes/book.js'));
app.use('/authors', require('./routes/author.js'));
app.use('/user', require('./routes/user.js'));

app.listen(4242, () => {
    console.log('🚀 API rodando em http://localhost:4242');
});
