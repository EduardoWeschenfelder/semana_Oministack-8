const Booking = require('../models/Booking'); //importando da pasta models o Booking

module.exports = {
  async store(req, res) { //async é utilizado para indicar que uma função é assincrona, ou seja não segue o curso padrão de execução do codigo fonte podendo levar algum tempo para executar
    const { booking_id } = req.params; // Acessar route params

    const booking = await Booking.findById(booking_id).populate('spot'); //await so pode ser usado junto com async, para que o processo aguarde sua execução entes de seguir
    // busca nas reservas(booking) pelo id da reserva e relaciona com o spot que foi feita a reserva

    // POPULATE permite fazer referência a documentos em outras coleções.
    //POPULATION é o processo de substituir automaticamente os caminhos especificados no documento por documentos de outras coleções.
    //Podemos preencher um único documento, vários documentos, objeto simples, vários objetos simples ou todos os objetos retornados de uma consulta


    booking.approved = true; // passa valor verdade para a propriedade approved dentro do arquivo booking

    await booking.save(); // salva o valor verdade passa acima

    const bookingUserSocket = req.connectedUsers[booking.user];
    // usuario conectado que fez  a reserva(bookingUserSocket) recebe todos os usuarios conectados e filtra pelo usuario

    if (bookingUserSocket) {//se o usuario que fez a reserva estiver conectado ele ira receber a resposta de aceita ou rejeitada
      req.io.to(bookingUserSocket).emit('booking_response', booking);
      // atravez de todos protocolo de comunicação vê se o usuario que fez a reserva esta logado e envia a resposta
    }

    return res.json(booking);
  }
};