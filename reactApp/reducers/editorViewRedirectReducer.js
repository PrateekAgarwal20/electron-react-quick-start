const editorViewRedirectReducer = (state = false, action) => {
  switch (action.type) {
  case 'BACK': {
    let newState = true;
    return newState;
  }
  default:
    return state;
  }
};

export default editorViewRedirectReducer;
