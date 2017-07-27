import axios from 'axios';

const loginReducer = (state = {'username': "", 'password': "", 'id':""}, action) => {
  switch (action.type) {
    case 'LOGIN':
    // get request to verify login
    var newId = ""
    const newState = Object.assign(state);
    // console.log(state.username);
    // console.log(state.password);
        axios.post('http://localhost:3005/login', {
          password: state.password,
          username: state.username,
        })
        .then(function(response){
        console.log("1", response)
        newState.username = state.password
        newState.password = state.username
        newState.id = response.data
        console.log("newState ", newState);
        return newState;
        })
        .catch(function(err){
            console.log("2 error: ", err);
            console.log("newState ", newState);
            return newState;
        })


    case 'USERNAME':
          const newState2 = Object.assign(state);
          newState2.username = action.username
    return newState2;

    case 'PASSWORD':
        console.log(state);
        const newState3 = Object.assign(state);
        newState3.password = action.password
    return newState3;
    default:
      return state;
  }
};

export default loginReducer;
