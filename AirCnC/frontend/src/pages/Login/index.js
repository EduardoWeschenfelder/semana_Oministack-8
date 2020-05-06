import React, { useState } from 'react';
import api from '../../services/api';

export default function Login({ history }) { // history componente que faz a nevegação
  const [email, setEmail] = useState(''); // cria um estado. estado é qualquer informação que será armazenado no componete
  //vetor com duas posições:[1- campo 2- função que atualiza o campo] 
  async function handleSubmit(event) { //função assincrona 
    event.preventDefault(); // previne o comportamento padrão de enviar o usuario para otra tela

    const response = await api.post('/sessions', { email }); //aguarda a verificação do email para ir para proxima tela 

    const { _id } = response.data; // pega o id do usuario atraves de email
    // o id é gerado automaticamete ao preencher o email,
    // caso ele utilize o mesmo email recebera o mesmo id

    localStorage.setItem('user', _id); //salva no banco de dados do navegado o id do usuario

    history.push('/dashboard'); //envia o usuario para tela de dashboard
  }

  return (
    // <> div vazia fragment para evitar u uso de divs que atrapalham na estilização
    // sitaxe JSX (xml em js)

    //formulario de login para cadstrar spots

    // inputs = campos de entradas de dados

    //htmlFor -> estrutura de repetição do html

    // onSubmit -> executa uma função quando o formulario receber submit

    //onchange -> toda vez que o usuario alterar o lalor do imput,
    //nesse caso a função setEmail vai receber o valor do campo

    //value para manter o email atualizado
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa
      </p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-MAIL *</label> 
        <input 
          id="email" 
          type="email" 
          placeholder="Seu melhor e-mail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />

        <button className="btn" type="submit">Entrar</button>
      </form>
    </>
  )
}