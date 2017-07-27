import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {saveUsername, savePassword, login} from '../actions/actions.js';
import { Link} from 'react-router-dom';

let Login = ({username, updateUsername, password, updatePassword, onSubmit}) => {
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
          onSubmit();
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
