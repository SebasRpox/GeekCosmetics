import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Import path
import {
  _Inicio,
  _RealizarCompra,
  _TotalCompras
} from "./config/path";

//Import pages
import Inicio from "./pages/Inicio";
import RealizarCompra from "./pages/realizarCompra";
import TotalCompras from "./pages/totalCompras";

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path={_Inicio} component={Inicio} />
        <Route exact path={_RealizarCompra} component={RealizarCompra} />
        <Route exact path={_TotalCompras} component={TotalCompras} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App path={_Inicio} />
  </React.StrictMode>,
  document.getElementById('root')
);