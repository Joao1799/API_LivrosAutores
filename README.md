📚 API de Livros e Autores
Este projeto é uma API RESTful desenvolvida em Node.js utilizando Express e Prisma ORM, com um banco de dados SQLite, que permite o gerenciamento de livros e autores com relacionamento entre eles.

🚀 Tecnologias Utilizadas
Node.js: Ambiente de execução JavaScript.
Express: Framework web para Node.js.
Prisma ORM: ORM moderno para Node.js e TypeScript.
SQLite: Banco de dados leve e embarcado.
Nodemon: Ferramenta para monitorar mudanças no código e reiniciar o servidor automaticamente.
⚙️ Instalação e Execução
Siga os passos abaixo para configurar e rodar a API em sua máquina local.

1. Clone o repositório
Bash

git clone https://github.com/Joao1799/API_LivrosAutores.git
cd API_LivrosAutores
2. Instale as dependências
Bash

npm install
3. Inicialize o Prisma
Bash

npx prisma init
Este comando criará a pasta prisma/ com o arquivo schema.prisma.

4. Configure o banco de dados
A API utiliza SQLite. A URL padrão já está configurada no arquivo .env gerado:

Ini, TOML

DATABASE_URL="file:./dev.db"
5. Gere as migrações do banco
Bash

npx prisma migrate dev --name init
6. Rode a aplicação
Bash

npm run dev
🔗 Rotas da API
📖 Livros
GET /livros: Retorna todos os livros cadastrados, com seus autores relacionados.
GET /livros/:id: Retorna um livro específico pelo ID.
POST /livros: Cria um novo livro. Exemplo de corpo JSON:
JSON

{
  "titulo": "O Senhor dos Anéis",
  "genero": "Fantasia",
  "autorId": 1
}
PUT /livros/:id: Atualiza os dados de um livro existente.
DELETE /livros/:id: Remove um livro do sistema.
👤 Autores
GET /autores: Retorna todos os autores cadastrados.
GET /autores/:id: Retorna um autor específico pelo ID.
POST /autores: Cria um novo autor. Exemplo de corpo JSON:
JSON

{
  "nome": "J.R.R. Tolkien",
  "nacionalidade": "Britânico"
}
PUT /autores/:id: Atualiza os dados de um autor existente.
DELETE /autores/:id: Remove um autor do sistema. Atenção: Só é possível excluir autores que não possuem livros associados. Caso contrário, será lançado um erro de integridade relacional.
🗃️ Estrutura do Projeto
API_LivrosAutores/
├── prisma/               # Schema e migrações do Prisma
│   └── schema.prisma
├── src/
│   ├── controllers/      # Lógica dos controladores
│   ├── models/           # Modelos de dados (gerados pelo Prisma)
│   ├── routes/           # Definição das rotas da API
│   └── index.js          # Ponto de entrada principal da aplicação
├── .env                  # Variáveis de ambiente
├── package.json          # Metadados e dependências do projeto
└── README.md             # Este arquivo README
📌 Observações
Este projeto foi desenvolvido com foco educacional, visando o aprendizado de REST APIs, relacionamentos em bancos de dados e o uso do ORM Prisma.

Para um ambiente de produção, é altamente recomendado o uso de um banco de dados mais robusto como PostgreSQL ou MySQL.

🧑‍💻 Autor
Desenvolvido por João Victor
