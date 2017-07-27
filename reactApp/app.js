var React = require('react');
var ReactDOM = require('react-dom');
import App from './components/App.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
const store = createStore(rootReducer);
require('../css/main.css');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {BrowserRouter, Route} from 'react-router-dom';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
ReactDOM.render(
     <Provider store={store}>
      <MuiThemeProvider>
        <BrowserRouter>
          <Route path="/" component={App}/>
        </BrowserRouter>
      </MuiThemeProvider>
     </Provider>,
     document.getElementById('root')
   );
