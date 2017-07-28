import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import {regUsername, regPassword, verPassword, register} from '../actions/actions.js'
import {Link} from 'react-router-dom';


const onRegisterClick = (username, password, verPassword, onSubmit) => {
  axios.post('http://localhost:3005/signup', {
      username: username,
      password: password,
      passwordRepeat: verPassword,
  })
  .then((resp) => {
    console.log('register success! ', resp)
    onSubmit()
})
.catch((err) =>{
    console.log("registration error: ", err);
});
};

let Register = ({username, password, verPassword, updateUsername, updatePassword, updateVerPassword, onSubmit}) => {
  return (
     <div >
        <AppBar showMenuIconButton={false} title="Register" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
        <form method="POST" style={style()}>
    <div className="form-group">
        <TextField hintText="here" floatingLabelText="Username" name="username" className="form-control" onChange={
            (e) => {updateUsername(e.target.value);
                 console.log(username, password, verPassword);
        }}/><br/>
    </div>
    <div className="form-group">
        <TextField type="password" hintText="here" floatingLabelText="Password" name="password" className="form-control"
            onChange={(e) => {
            updatePassword(e.target.value);
        }}/><br/>
    </div>
    <div className="form-group">
    <TextField type="password" hintText="here" floatingLabelText="Verify Password" name="password" className="form-control" onChange={
        (e) => {
        updateVerPassword(e.target.value);
    }}/><br/>
    </div>
    <div className = "form-group" >
        <RaisedButton onClick={(e) => {
          e.preventDefault();
          onRegisterClick(username, password, verPassword, onSubmit);
      }} label="Sign Up!"/>
        <RaisedButton containerElement = { < Link to = "/login" />}label = "Login" />
    </div>
 </form> </div>
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
    username: state.registerState.regUsername,
    password: state.registerState.regPassword,
    verPassword: state.registerState.verPassword
  };
};

const mapDispatchToProps = dispatch => {
    return {
        updateUsername: (username) => dispatch(regUsername(username)),
        updatePassword: (password) => dispatch(regPassword(password)),
        updateVerPassword: (password) => dispatch(verPassword(password)),
        onSubmit: () => dispatch(register())
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
