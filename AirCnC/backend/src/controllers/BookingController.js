
const Booking = require('../models/Booking'); // importa de models o arquivo Booking

module.exports = {
  async store(req, res) { 
    const { user_id } = req.headers; //busca o usuario logado, para fazer a reserva
    const { spot_id } = req.params;  //busca o id do spot  req.params = paramentros que vem da roota
    const { date } = req.body; // vem do corpo da requisição

    const booking = await Booking.create({ // aguarda cria a reserva/booking
      user: user_id, //usuario que fez a reserva
      spot: spot_id, // spot que foi feita a reseva
      date, // data informada para reserva
    });

    await booking.populate('spot').populate('user').execPopulate();
    //faz a relação do spot com o usuario prenchendo as informações de user e spot 

    const ownerSocket = req.connectedUsers[booking.spot.user];  
    // dono do spot    //todos os usuarios conectados[busca pela reseva, pelo spot e pelo usuario] atravez do populate

    if (ownerSocket) { // se uma conexão em, tempo real, será enviada uma resposta
      req.io.to(ownerSocket).emit('booking_request', booking);
      //pega todos os usuarios logado e envia para o dona a mensagem de reserva/booking
      // booking_request é enviado para index do dashboard (frontend)
    }

    return res.json(booking);
  }
};