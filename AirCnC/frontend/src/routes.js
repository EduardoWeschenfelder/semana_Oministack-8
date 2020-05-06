import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login'; //importação dos arquivos
import Dashboard from './pages/Dashboard'; //importação dos arquivos
import New from './pages/New'; //importação dos arquivos

export default function Routes() { // função  de rotas utilizida no app.js para encamina a cada uma das telas
  // Switch -> vai permitir que somente uma rota seja chamada ao mesmo tempo 
  // BrowserRouter -> componte de ROTAS, por padrão permite que mais de uma rota seja chamada
  // Route -> Renderizar interface do usuário quando path corresponder à URL atual.
  // path -> caminho 
  return ( 
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={New} />
      </Switch>
    </BrowserRouter>
  );
}