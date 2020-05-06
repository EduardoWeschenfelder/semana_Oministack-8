const express = require('express'); //biblioteca que reune varios frameworks 
const mongoose = require('mongoose');
const cors = require('cors'); //controle de rotas 
const path = require('path');

const socketio = require('socket.io'); 
//importa socket.io é uma biblioteca que permite a comunicação em tempo real, bidirecional e baseada em eventos entre o navegador e o servidor.
const http = require('http');
//O módulo HTTP pode criar um servidor HTTP que escute as portas do servidor e dê uma resposta de volta ao cliente.

const routes = require('./routes'); // importa o arquivo routes 

const app = express(); //define o app
const server = http.Server(app); // define o server passando o app como parametro Pegando servidor http e extraindo do express
const io = socketio(server); // server passa a ouvir o protocolo websocket

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-ht8q6.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connectedUsers = {};

io.on('connection', socket => { //ouve a informação de todo usuario logado na aplicação
  // socket representa conexão com o usuario

  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id; // relaciona o id de usuario com o id de conexão
});

app.use((req, res, next) => { // adicionar uma funcionalidade em toda rota independente do metodo que ela utiliza
  req.io = io; // deixa disponivel para todas as rotas o protocolo de comunicação
  req.connectedUsers = connectedUsers; // deixa disponivel para todas as rotas os usuarios conectados na aplicação
  // dessa forma é possivel acessar os req em qualquer rota

  return next();// para que continue a execução do codigo 
})

// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors()); //determina quais origens têm permissão para acessar os recursos do servidor pelo CORS
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); // usado para exibir imagens da pasta uploads
app.use(routes);

server.listen(3333); // a aplicação ouve requisições websocket e http
