
//Mongoose é uma ferramenta de modelagem de objeto MongoDB projetada para funcionar em um ambiente assíncrono.
const mongoose = require('mongoose');

//Com o Mongoose, tudo é derivado de um esquema.
const UserSchema = new mongoose.Schema({
  email: String, // definimos um novo Schema no caso UserSchema que possui uma propriedade que é o email
                 // dessa forma o email será a forma de login para cada usuario
});

module.exports = mongoose.model('User', UserSchema); 
// a primeira propriedade é o nome do modelo, segunda é o Squema 

// Modelos são construtores sofisticados compilados a partir de Schemadefinições.
// Uma instância de um modelo é chamada de documento . 
// Os modelos são responsáveis ​​por criar e ler documentos a partir do banco de dados