const titleReducer = (state = "Default Title", action) => {
  switch (action.type) {
  case 'TITLE':
    return action.title;
  default:
    return state;
  }
};

export default titleReducer;
