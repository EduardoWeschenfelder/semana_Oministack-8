const User = require('../models/User'); // importa o useuario

module.exports = {
  async store(req, res) { // metodo store para criar uma sessão
    const { email } = req.body; // pega a informação do corpo da requisição

    let user = await User.findOne({ email }); // Como o usuario pode mudar por ser uma string o "let" deve ser usado
    // findOne busca o usuario atrves da propriedade email
    // se encontrar o email ira salvar dentro da varialvel user

    if (!user) { // cano são encontrar um usuario criado com o email
      user = await User.create({ email }); // cria um usuario novo com esse email
    }

    return res.json(user); 
  }
};
