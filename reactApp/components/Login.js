import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {connect} from 'react-redux';
import {saveUsername, savePassword, login} from '../actions/actions.js';
import { Link} from 'react-router-dom';

let Login = ({username, updateUsername, password, updatePassword, onSubmit}) => {
  return (
     < div >
      <AppBar showMenuIconButton={false} title="Login" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
      <form method="POST" style={style()}>
    <div className="form-group">
        <TextField hintText="here" floatingLabelText="Username" name="username" className="form-control" onChange={(e) => updateUsername(e.target.value)}/><br/>
    </div>
    <div className="form-group">
        <TextField type="password" hintText="here" floatingLabelText="Password" name="password" className="form-control" onChange={(e) => {
            updatePassword(e.target.value);
        }}/><br/>
    </div>
    <div className="form-group">
        <RaisedButton onClick={(e) => {
          e.preventDefault();
          onSubmit(username, password);
      }} label="Login"/>
      <RaisedButton containerElement={<Link to="/register"/>} label="Register"/>
    </div>
</form> < /div>
  );
};

Login.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  updateUsername: PropTypes.func,
  updatePassword: PropTypes.func,
  onSubmit: PropTypes.func
};

const mapStateToProps = state => {
  return {
    username: state.loginState.username,
    password: state.loginState.password
  };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUsername: (username) => dispatch(saveUsername(username)),
        updatePassword: (password) => dispatch(savePassword(password)),
        onSubmit: (username, password) => dispatch(login())
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
