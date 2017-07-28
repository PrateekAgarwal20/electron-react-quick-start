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
        < div >
        <AppBar showMenuIconButton={false} title="Login" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <form method="POST" style={style()}>
        <div className="form-group">
            <TextField hintText="here" floatingLabelText="Username" name="username" className="form-control" onChange={
                (e) => {updateUsername(e.target.value); 
                }}/><br/>
        </div>
        <div className="form-group">
            <TextField type="password" hintText="here" floatingLabelText="Password" name="password" className="form-control"
                onChange={(e) => {
                updatePassword(e.target.value);
            }}/><br/>
        </div>
      <div className="form-group">
          <RaisedButton onClick={(e) => {
            e.preventDefault();
            onLoginClick(username, password, onLogin);
        }} label="Log it mofokin in!"/>
          <RaisedButton containerElement = { < Link to = "/Register" />}label = "Register" />
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
