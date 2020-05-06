
const express = require('express'); //importa o pacote/ferramenta
const multer = require('multer'); //importa o pacote/ferramenta

const uploadConfig = require('./config/upload'); //importa o arquivo upload

const SessionController = require('./controllers/SessionController');      //importa o arquivo SessionController
const SpotController = require('./controllers/SpotController');            //importa o arquivo SpotController
const DashboardController = require('./controllers/DashboardController');  //importa o arquivo DashboardController
const BookingController = require('./controllers/BookingController');      //importa o arquivo BookingController
const ApprovalController = require('./controllers/ApprovalController');    //importa o arquivo ApprovalController
const RejectionController = require('./controllers/RejectionController');  //importa o arquivo RejectionController

const routes = express.Router(); // permite agrupar os manipuladores de rota para uma parte específica de um site e acessá-los usando um prefixo de rota comum
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store); // rota para fazer login

routes.get('/spots', SpotController.index); // rota para visualizar todos os spots
routes.post('/spots', upload.single('thumbnail'), SpotController.store); // rota para criar spot e fazer o upload da imagem do spot

routes.get('/dashboard', DashboardController.show); // rota para ver seus spots ou criar após fazer login

routes.post('/spots/:spot_id/bookings', BookingController.store); // rota para fazer reserva em um spot escolhido

routes.post('/bookings/:booking_id/approvals', ApprovalController.store); // rota para enviar solicitação de reserva Aprovada
routes.post('/bookings/:booking_id/rejections', RejectionController.store); // rota para enviar solicitação de reserva Rejeitada

module.exports = routes; //exporta o modulo routes
