const express = require('express');
const server = express();

// Configurar a pasta public
server.use(express.static('public'));

/* Configurar caminhos da minha aplicação / Rotas
  REQUEST: Requisição
  RESPONSE: Resposta
*/


// Rota da Pagina Principal
server.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

// Rota da Pagina Create Point
server.get('/create-point', (req, res) => {
  res.sendFile(__dirname + '/views/create-point.html')
});

// Ligar o servidor na porta 3000
server.listen(3000)