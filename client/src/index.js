import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Import path
import {_RealizarCompra} from "./config/path";

//Import pages
import RealizarCompra from "./pages/realizarCompra";

const App = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path={_RealizarCompra} component={RealizarCompra} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App path={_RealizarCompra} />
  </React.StrictMode>,
  document.getElementById('root')
);