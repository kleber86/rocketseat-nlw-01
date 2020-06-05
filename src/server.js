const express = require('express');
const server = express();

// Pegar o banco de dados
const db = require('./database/db')

// Configurar a pasta public
server.use(express.static('public'));

/* Configurar caminhos da minha aplicação / Rotas
  REQUEST: Requisição
  RESPONSE: Resposta
*/

// Utilizando Templete Engine
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

// Rota da Pagina Principal
server.get('/', (req, res) => {
  return res.render('index.html', {
    title: 'Um titulo qualquer'
  });
});

// Rota da Pagina Create Point
server.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

// Rota da Pagina Search Results
server.get('/search', (req, res) => {
  return res.render('search-results.html');
});

// Ligar o servidor na porta 3000
server.listen(3000)