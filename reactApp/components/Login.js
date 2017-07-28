import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import {saveUsername, savePassword, login} from '../actions/actions.js';
import { Link} from 'react-router-dom';
import axios from 'axios';


const onLoginClick = (username, password, onLogin) => {
  axios.post('http://localhost:3005/login', {
    username,
    password,
  })
  .then((resp) => {
    onLogin(resp.data.userId);
  });
};

let Login = ({username, updateUsername, password, updatePassword, onLogin, auth}) => {
  return (
        < div > <form method="POST" style={style()}>
      <h3>Login</h3>
      <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" className="form-control" onChange={(e) => updateUsername(e.target.value)}></input>
      </div>
      <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={(e) => {
            updatePassword(e.target.value);
          }}></input>
      </div>
      <div className="form-group">
          <button className="btn btn-success" onClick={(e) => {
            e.preventDefault();
            onLoginClick(username, password, onLogin);
          }}>Login</button>
          <Link to="/register">Register</Link>
      </div>
  </form> < /div>
  );
};

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  updateUsername: PropTypes.func,
  updatePassword: PropTypes.func,
  onLogin: PropTypes.func,
  auth: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    username: state.loginState.username,
    password: state.loginState.password,
    auth: state.loginState.auth
  };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUsername: (username) => dispatch(saveUsername(username)),
        updatePassword: (password) => dispatch(savePassword(password)),
        onLogin: (userId) => dispatch(login(userId))
    };
};

const style = () => ({
    "maxWidth": "300px",
    "margin": "auto",
    "marginTop": "50px",
    "border": "0.5px solid gray",
     "padding": "30px 30px 30px 30px",
});

Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default Login;
