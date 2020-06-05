const express = require('express');
const server = express();

// Pegar o banco de dados
const db = require('./database/db')

// Configurar a pasta public
server.use(express.static('public'));

// Habilitar o uso do REQ.BODY 
server.use(express.urlencoded({ extended: true }))

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
  console.log(req.query)
  return res.render('create-point.html');
});

server.post('/save-point', (req, res) => {
    // console.log(req.body)

    // Inserir dados no Banco
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?, ?, ?, ?, ?, ?, ?);
`
  const values =  [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
   ]

   function afterInsertData(err) {
    if(err){
      console.log(err)
      return res.send('Erro no cadastro!')
    }
    console.log('Cadastrado com sucesso.')
    console.log(this)


    return res.render('create-point.html', { saved: true });
   }

    db.run(query, values, afterInsertData)
});

// Rota da Pagina Search Results
server.get('/search', (req, res) => {
  const search = req.query.search

  if (search == '') {
    return res.render('search-results.html', { total: 0})
  }

  // Pegar os dados do banco
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    console.log('REGISTROS: ', rows)

    const total = rows.length

    // Mostrar a pagina HTML com os dados do bando
    return res.render('search-results.html', { places: rows, total });

  })
});

// Ligar o servidor na porta 3000
server.listen(3000)