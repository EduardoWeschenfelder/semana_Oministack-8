
const mongoose = require('mongoose'); // importa o mongoose

const BookingSchema = new mongoose.Schema({ // cria um novo schema  de reserva e passa propriedades
  date: String, // data da reserva
  approved: Boolean, // status da reserva aceita ou não, por padrão vazia, não refinida
  user: { //objeto usuario criado o modelo em user
    type: mongoose.Schema.Types.ObjectId, // id gerado automaticamente
    ref: 'User'//model em user
  },
  spot: { // objeto spot criado modelo em Spot
    type: mongoose.Schema.Types.ObjectId,// id gerado automaticamente
    ref: 'Spot' // model em Spot
  }
});

module.exports = mongoose.model('Booking', BookingSchema); // exporta o model Booking so Schema