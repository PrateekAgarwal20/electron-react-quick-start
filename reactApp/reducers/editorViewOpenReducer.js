const editorViewOpenReducer = (state = false, action) => {
  switch (action.type) {
  case 'SAVE': {
    let newState = true;
    return newState;
  }
  case 'CLOSE': {
    let newState = false;
    return newState;
  }
  default:
    return state;
  }
};

export default editorViewOpenReducer;
