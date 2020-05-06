
import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg'; //importa a icone da camera que vai ficar no file de arquivo

import './styles.css'; //importa estilização

export default function New({ history }) { // funço para criação de novos spots com objeto para navegação
  const [thumbnail, setThumbnail] = useState(null); //imagem
  const [company, setCompany] = useState(''); // empresa
  const [techs, setTechs] = useState(''); // tecnologias
  const [price, setPrice] = useState(''); //preço

  const preview = useMemo(() => {  // permite visualizar a imagem antes denviar ao servidor
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]) // ira memorizar novamente quando a imagem mudar

  async function handleSubmit(event) {
    event.preventDefault(); // previne o funcionamento padrão de enviar para outra tela

    const data = new FormData(); // cria um novo objeto no formato data
    const user_id = localStorage.getItem('user'); //recebe o user salvo no BD do navegador

    data.append('thumbnail', thumbnail); 
    //Anexa um novo valor a uma chave existente dentro de um FormData objeto ou adiciona a chave se ela ainda não existir.
    data.append('company', company);
    ////Anexa um novo valor a uma chave existente dentro de um FormData objeto ou adiciona a chave se ela ainda não existir.
    data.append('techs', techs);
    ////Anexa um novo valor a uma chave existente dentro de um FormData objeto ou adiciona a chave se ela ainda não existir.
    data.append('price', price);
    //Anexa um novo valor a uma chave existente dentro de um FormData objeto ou adiciona a chave se ela ainda não existir.

    await api.post('/spots', data, { //aguarda o novo spot ser adionado aos spots 
      headers: { user_id } // id do user que criou o spot pelo cabeçalho da requisição
    })

    history.push('/dashboard'); 
    // history faz a navegação para a tela de dashboard, onde aparecem os spots criados
  }

  return (
    // formulario para criação de novo spot recebe a função handleSubmit que cria o spot
    //campo para inserir imagem salva no computador
    //
    //
    //
    <form onSubmit={handleSubmit} >   
   
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''} // se existir uma imagem, adiciona a class 'has-thumbnail' senão adciona nada ''
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input 
        id="company"
        placeholder="Sua empresa incrível"
        value={company} // mantem atualizado
        onChange={event => setCompany(event.target.value)} // atualiza a empresa quando mudar
      />

      <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input 
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs} // mantem atualizado
        onChange={event => setTechs(event.target.value)} //atualiza as tecnologias sepre o texto mudar
      />

      <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span></label>
      <input 
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}// mantem atualizado
        onChange={event => setPrice(event.target.value)} //atualiza o preço quando ele mudar
      />

      <button type="submit" className="btn">Cadastrar</button>
    </form>
  )
}