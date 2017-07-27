import React from 'react';

import Login from './Login.js';
import Register from './Register.js';
import { HashRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => {
  return (
      <div>
          <MuiThemeProvider>
          <HashRouter>
              <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" component={Login}/>
              </Switch>
          </HashRouter>
      </MuiThemeProvider>
      </div>
  );
};

export default App;
