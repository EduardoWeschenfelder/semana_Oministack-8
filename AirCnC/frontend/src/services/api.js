import axios from 'axios'; // ferramenta muito completa para lidar com chamdas API

const api = axios.create({
  baseURL: 'http://localhost:3333', //URL que vai se repetir em toda aplicação
});

export default api; // exporta por padrão a api