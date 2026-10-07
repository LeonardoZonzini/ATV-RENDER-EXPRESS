// Importar a biblioteca json-server
const jsonServer = require('json-server');

// Importar o módulo express
const express = require('express');

// Criar uma instância do servidor JsonServer
const server = jsonServer.create();

// Criar um roteador com o arquivo db.json
// O roteador define as rotas da API (ex: /pessoas) usando o JSON como base de dados
const router = jsonServer.router('db.json');

// Funções padrão executadas em cada requisição (CORS, logger, static, etc.)
const middlewares = jsonServer.defaults();

// Define a porta em que o servidor irá rodar (o Render define a porta via variável de ambiente)
const porta = process.env.PORT || 3000;

server.use(middlewares);

// Usa o roteador da API em /pessoas
server.use(router);

// Criando a instância do express para servir as páginas HTML do CRUD
const app = express();

// Serve os arquivos estáticos (HTML, CSS, JS) da pasta public
app.use(express.static('public'));

// Rota principal: envia a página inicial com o menu do CRUD
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// Usa as rotas do express dentro do mesmo servidor do json-server
server.use(app);

// Inicia o servidor na porta definida e exibe uma mensagem no console
server.listen(porta, () => {
    console.log(`JSON SERVER está rodando em http://localhost:${porta}`);
});
