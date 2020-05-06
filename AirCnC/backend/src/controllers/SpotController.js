const User = require('../models/User'); // importa o User
const Spot = require('../models/Spot'); // importa o Spot 

module.exports = { //exporta um objeto 
  async index(req, res) { //medodo de busca dos spots - Assinrono
    const { tech } = req.query; // Acessar query params (para filtros)

    const spots = await Spot.find({ techs: tech }); 
    // aguarda a busca/filtro de tech em techs, ou seja separa por tecnologia os spots 

    return res.json(spots);// retorna os spots por tenologia
  },

  async store(req, res) { // medoto para a criação de novos spots
    const { filename } = req.file; // nome da imagem salva na pasta uploads
    const { company, techs, price } = req.body; //dados do spot que vem pelo corpo da requisição
    const { user_id } = req.headers; // usuario que criou o spot - cabeçalho da requisção (contexto)

    const user = await User.findById(user_id); // busca o user_id, para saber quem está criando o spot

    if (!user) { // verifica se o usuario existe
      return res.status(400).json({ error: 'User does not exists' });
      // retorno um erro caso o usuario não jeva encontreado
    }

    const spot = await Spot.create({ // cria o spot
      user: user_id,  // passa o id do usuario
      thumbnail: filename, // a figura
      company, // a empresa
      techs: techs.split(',').map(tech => tech.trim()), // corta a string pedaços separados po vigula, percore o vetor e remove os espaços
      price // preço
    })

    return res.json(spot)
  }
};