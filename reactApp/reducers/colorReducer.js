// import {EditorState, RichUtils} from 'draft-js';

const colorReducer = (state = "black", action) => {
  switch (action.type) {
  case 'COLOR':
    console.log('in color reducer', action.color);
    return action.color;
  default:
    return state;
  }
};

export default colorReducer;
