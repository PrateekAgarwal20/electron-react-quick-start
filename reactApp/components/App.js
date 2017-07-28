import React from 'react';
import Login from './Login.js';
import Register from './Register.js';
import DocumentPortal from './DocumentPortal.js';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// import DocumentPortal from './DocumentPortal';


let App = ({userId}) => {
  return (
      <div>
          <HashRouter>
            <Switch>
              <Route exact path="/" component={DocumentPortal} />
              <Route path="/editor/:docId" component={EditorView} />
            </Switch>
          </HashRouter>

          {/* <EditorView /> */}
          {/* <HashRouter>
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
