var React = require('react');
var ReactDOM = require('react-dom');
import App from './components/App.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
const store = createStore(rootReducer);
require('../css/main.css');

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
ReactDOM.render(
     <Provider store={store}>
        <App />
     </Provider>,
     document.getElementById('root')
   );
