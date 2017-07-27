import { combineReducers } from 'redux';

// import reducers from other files
import editorReducer from './editorReducer';
import documentListReducer from './documentListReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';


// import * as types from '../actions/types';

const rootReducer = combineReducers({
  // label reducers as the state name to the reducer name
  documentList: documentListReducer,
  editorState: editorReducer,
  loginState: loginReducer,
  registerState: registerReducer
});

export default rootReducer;
