import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login'; // importa Login
import List from './pages/List';   // importa List
import Book from './pages/Book';   // importa Book

const Routes = createAppContainer(
  createSwitchNavigator({ // createSwitchNavigator faz  navegação entre as rotas de forma simples e sem estilização
    Login, // cria a rota importada acima
    List,  // cria a rota importada acima 
    Book   // cria a rota importada acima
  })
);

export default Routes; // Exporta por padrão as rotas