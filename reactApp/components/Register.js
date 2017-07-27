import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {regUsername, regPassword, verPassword, register} from '../actions/actions.js'
import { Link} from 'react-router-dom';

let Register = ({username, password, verPassword, updateUsername, updatePassword, updateVerPassword, onSubmit}) => {
  return (
     < div > <form method="POST" style={style()}>
    <h3>Register</h3>
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
        <label>Verify Password</label>
        <input type="password" name="passwordRepeat" className="form-control" onChange={(e) => updateVerPassword(e.target.value)}></input>
    </div>
    <div className="form-group">
        <button className="btn btn-success" onClick={(e) => {
            e.preventDefault();
            onSubmit();
        }}>Register</button>
        <Link to="/login">Login</Link>
    </div>
</form> < /div>
  );
};

Register.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string,
  verPassword: PropTypes.string,
  updateUsername: PropTypes.func,
  updatePassword: PropTypes.func,
  updateVerPassword: PropTypes.func,
  onSubmit: PropTypes.func
};

const mapStateToProps = state => {
  return {
    username: state.regUsername,
    password: state.regPassword,
    verPassword: state.verPassword
  };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUsername: (username) => dispatch(regUsername(username)),
        updatePassword: (password) => dispatch(regPassword(password)),
        updateVerPassword: (password) => dispatch(verPassword(password)),
        onSubmit: (username, password, verPassword) => dispatch(register())
    };
};

const style = () => ({
    "maxWidth": "300px",
    "margin": "auto",
    "marginTop": "50px",
    "border": "0.5px solid gray",
     "padding": "30px 30px 30px 30px",
});

Register = connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

export default Register;
