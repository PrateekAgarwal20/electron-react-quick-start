import axios from 'axios';

const loginReducer = (state = {'regUsername': "", 'regPassword': "", 'verPassword': ""}, action) => {
  switch (action.type) {
    case 'REGISTER':
    console.log(state);
    // gpost registration request
        axios.post('http://localhost:3005/signup', {
            username: state.regUsername,
            password: state.regPassword,
            passwordRepeat: state.verPassword
        })
        let newState = Object.assign(state)
            newState.regUsername = ""
            newState.regPassword = ""
            newState.verPassword = ""
        return newState;

    case 'REGUSERNAME':
        let newState2 = Object.assign(state);
        newState2.regUsername = action.regUsername
    return newState2;

    case 'REGPASSWORD':
        let newState3 = Object.assign(state);
        newState3.regPassword = action.regPassword
    return newState3;

    case 'VERPASSWORD':
        let newState4 = Object.assign(state);
        newState4.verPassword = action.verPassword
    return newState4;

    default:
      return state;
  }
};

export default loginReducer;
