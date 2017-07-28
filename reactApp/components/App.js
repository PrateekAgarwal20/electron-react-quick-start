import React from 'react';
import Login from './Login.js';
import Register from './Register.js';
import DocumentPortal from './DocumentPortal.js';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import EditorView from './EditorView';

import io from 'socket.io-client';

// import DocumentPortal from './DocumentPortal';

// TODO: When we switch this back to login, make sure to switch '/' in the back button to the documentPortal ('/home')??
var socket = null;
class App extends React.Component {
  componentWillMount() {
    socket = io('http://localhost:3005');
    socket.on('successJoiningRoom', () => {
      console.log('HEREHEHREHRE', this.props.socket.rooms);
    });
  }

  render() {
    return (
      <HashRouter>
          <Switch>
              <Route exact path="/" render={() =>
                this.props.userId ? (<Redirect to="/main"/>) : (<Redirect to="/login"/>)
              }/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" render={() =>
                this.props.userId ? (<Redirect to="/main"/>) : (<Login/>)} />
              <Route exact path="/main" render={() => (
                <DocumentPortal socket={socket}/>
              )}/>
              <Route path="/editor/:docId" component={EditorView} />
          </Switch>
      </HashRouter>
    );
  }


}


DocumentPortal.propTypes = {
  auth: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    userId: state.loginState.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);


export default App;
