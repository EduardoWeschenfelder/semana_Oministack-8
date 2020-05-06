import React from 'react'; //importa o React para 
//para poder ter sintaxe JSX (o html)

import './App.css'; // importa o arquivo de estilização

import logo from './assets/logo.svg'; // importa a imagem do logo

import Routes from './routes'; //importa a função de rotas

function App() { // função que retorna HTML que também é o componente principal da aplicação
  return ( // elemtos de divisão, classe para estilizaçção
    // a primeira div é padrão en todas as telas
    // o conteiner é o espaço padrão 
    // a imgem é a logo padrão importada acima
    // alt especifica um texto alternativo para a imagem
    <div className="container"> 
      <img src={logo} alt="AirCnC" />

      <div className="content">
        <Routes />
      </div>
    </div>
  ); //a className content, é a divisão que abrirá cada uma das telas, / , /dashboard e /new definidas da pasta pages
}

export default App; // função JavaScript que é executada quando acionada

// a função exportada deve ser a única exportação do arquivo
