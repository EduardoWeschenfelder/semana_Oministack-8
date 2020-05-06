import axios from 'axios'; // ferramenta muito completa para lidar com chamdas API


const api = axios.create({
  baseURL: 'http://192.168.100.4:3333', //URL que vai se repetir em toda aplicação 
  //ao invez de localhost para rodar no celular e emulador deve ser o ip fornecido ao rodar a aplicação
});

export default api; //exporta por padrão a api