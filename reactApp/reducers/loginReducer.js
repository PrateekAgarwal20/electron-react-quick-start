const loginReducer = (state = {'username': "", 'password': "", 'userId':""}, action) => {
  switch (action.type) {
  case 'LOGIN': {
    const newState = Object.assign({}, state);
    newState.userId = action.userId;
    return newState;
  }
  case 'USERNAME':{
    const newState2 = Object.assign({}, state);
    newState2.username = action.username;
    return newState2;
  }
  case 'PASSWORD':{
    const newState3 = Object.assign({}, state);
    newState3.password = action.password;
    return newState3;
  }
  default:
    return state;
  }
};

export default loginReducer;
