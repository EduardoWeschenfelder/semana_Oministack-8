const mongoose = require('mongoose'); // importa o mongoose

const SpotSchema = new mongoose.Schema({ 
  //definimos um novo Schema no caso SpotSchema que possui varias propriedades
  thumbnail: String, //imagem, foto da empresa
  company: String,   // nome da empresa
  price: Number,     //preço
  techs: [String],   // tecnologias que a empresa utiliza - vetor de string
  user: { 
    // o usuario é um objeto 
    type: mongoose.Schema.Types.ObjectId, // id do usuario criado automaticamente
    ref: 'User' // nome que foi dado ao model criado em User 
  }// formato para aceitar imagem é Multpart no insomnia
}, {
  toJSON: { // corvete para o forma json
    //Se você usar toJSON()ou toObject() mongooseto, não incluirá virtuais por padrão.
    virtuals: true,  // virtuals serve para formatar, e/ou combinar as informações
    //Os virtuais são propriedades de documentos que você pode obter e definir, mas que não são mantidas no MongoDB. 
  },
});

SpotSchema.virtual('thumbnail_url').get(function() { // virtual get usado para compor um elemento
  return `http://localhost:3333/files/${this.thumbnail}` // vem da clase definida no schema definido acima
  // constroi o caminho para acessar a imagem de forma virtual, ou seja sem armazenar no banco de dados
})

module.exports = mongoose.model('Spot', SpotSchema); //exporta o model Spot do squema 