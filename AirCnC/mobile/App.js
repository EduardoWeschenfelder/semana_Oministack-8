import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes'; //importa o arquivo de rotas

YellowBox.ignoreWarnings([ // ignora avisos qe comecem  com a escrita abaixo
  'Unrecognized WebSocket' // inicio de um aviso
]);

export default function App() { // exporta por padrão a função App 
  return <Routes />//que retorna o arquivo que direciona para cada rota
}