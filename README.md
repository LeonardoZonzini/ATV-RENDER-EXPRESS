# CRUD CPF - JSON Server + Express

CRUD completo (POST, GET, PUT, DELETE) usando JSON Server e Node.js com Express, com busca por CPF.

## Link do site hospedado no Render

🔗 **https://atv-render-express.onrender.com**

> Instância gratuita do Render: pode levar ~50s para responder na primeira requisição após um período de inatividade.

## Estrutura do projeto

```
├── db.json              # Banco de dados (JSON Server)
├── server.js            # Servidor Express + JSON Server
├── package.json
└── public/
    ├── index.html        # Página inicial com menu
    ├── style.css          # CSS compartilhado por todas as páginas
    ├── post/              # Cadastrar (POST)
    ├── get/               # Listar / buscar por CPF (GET)
    ├── put/               # Atualizar (PUT)
    └── delete/            # Excluir (DELETE)
```

## Rodando localmente

```bash
npm install
node server.js
```

O servidor sobe em `http://localhost:3000`.
