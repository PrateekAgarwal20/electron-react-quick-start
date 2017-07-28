import React from 'react';
import Login from './Login.js';
import Register from './Register.js';
import DocumentPortal from './DocumentPortal.js';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
// TODO: delete
// import DocumentPortal from './DocumentPortal';


let App = ({userId}) => {
  return (
      <div>
        <MuiThemeProvider>
          {/* <DocumentPortal /> */}
          <HashRouter>
              <Switch>
                  <Route exact path="/" render={() =>
                    userId ? (<Redirect to="/document"/>) : (<Redirect to="/login"/>)
                  }/>
                  <Route exact path="/register" component={Register}/>
                  <Route exact path="/login" render={() =>
                    userId ? (<Redirect to="/document"/>) : (<Login/>)} />
                  <Route exact path="/document" component={DocumentPortal}/>
              </Switch>
          </HashRouter>
        </MuiThemeProvider>
      </div>
  );
};

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
