import React, { useEffect, useState, useMemo } from 'react'; 
//useEffect -> usada para ezecutar algo após a renderização
import { Link } from 'react-router-dom';
//LINK o router processa a correspondência <Route>.
//Nos bastidores, um é <Link>renderizado <a>com um real href, para que as pessoas que usam o teclado para navegação ou leitores de tela ainda possam usar este aplicativo
import socketio from 'socket.io-client';
//biblioteca que permite a comunicação em tempo real, bidirecional e baseada em eventos entre o navegador e o servidor
import api from '../../services/api'; //importa a api de services

import './styles.css'; //importa o arquivo de estilização de Dashboard

export default function Dashboard() { //
  const [spots, setSpots] = useState([]); // define o estado que onde serão armazenados informações
  const [requests, setRequests] = useState([]); // define o estado que onde serão armazenados informações

  const user_id = localStorage.getItem('user');  
  // pega a informação salva no banco de dados do navegador definida no index do login para poder apresentar os spots somente daquele usuario  
  
  const socket = useMemo(() => socketio('http://localhost:3333', { // soket é a conecxão, 
  // o useMeno armazena esta conexão para que ela só seja executada novamente quando o parametro user_id alterar
    query: { user_id },
  }), [user_id]); // quando esse parametro mudar ele executa a conecxão novamente para pegar o usuario conectado
  
  useEffect(() => {
    socket.on('booking_request', data => { // ouve a resposta envida do backend e pega todos os dados da reserva
      setRequests([...requests, data]); 
      // salva cada solicitação de reserva uma apos a outra, 
      // ... -> params para pegar todos os elementos e um aray 
    })
  }, [requests, socket]);// ele será executado novente quando esses parametros alterarem

  useEffect(() => {
    async function loadSpots() { // função de busca de spots
      const user_id = localStorage.getItem('user'); // busca o usuario logado salvo no BD do navegador 
      const response = await api.get('/dashboard', { //faz uma solicitação para acessar os dados dentro dashboard
        headers: { user_id } // com base no user_id
      });

      setSpots(response.data); //setSpots recebe todos os dados da solicitação
    }

    loadSpots(); // executa a função assincrona de busca de spots atravez do user logado
  }, []);

  async function handleAccept(id) { // função que encamniha a resposta da solicitaçã como Aprovada 
    await api.post(`/bookings/${id}/approvals`); //aguarda a solicitação a api 

    setRequests(requests.filter(request => request._id !== id)); //filtra as requisições que foram respopndidas para remove-las
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`); // função que encamniha a resposta da solicitaçã como Rejeitada

    setRequests(requests.filter(request => request._id !== id));//filtra as requisições que foram respopndidas para remove-las
  }

  return (
    //classe para estilização
    //percore a requisição para montar a notificação de rserva solicitada
    //cada elemento da lista rcebe uma chave(_id) que nao pode repetir
    // frase com usuario, empresa, e data que o user fez a reserva
    //botões de aceitar e rejeitar que recebem por parametro  o id da solicitação de reserva
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong>{request.date}</strong>
            </p>
            <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
            <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
          </li>
        ))}
      </ul>

      <ul className="spot-list">
        {spots.map(spot => (
          <li key={spot._id}>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
          </li>
        ))}
      </ul>

      <Link to="/new">
        <button className="btn">Cadastrar novo spot</button>
      </Link>
    </>
    // classe para estilização dos spots
    //percore os spots e para cada um coloca a imagem, o nome da empresa e o preço por dia
    // o Link envia o usuario para a rota /new caso o botão seja executado
  )
}