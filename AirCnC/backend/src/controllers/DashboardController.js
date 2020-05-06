const Spot = require('../models/Spot'); //importa o Spot

module.exports = {
  async show(req, res) { // exibe os spots 
    const { user_id } = req.headers; // busca o usuario logado no cabeçalho

    const spots = await Spot.find({ user: user_id }); // busca os spots em que o campo user é igual a User_id

    return res.json(spots);
  }
}