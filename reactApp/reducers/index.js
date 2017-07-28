import { combineReducers } from 'redux';

// import reducers from other files
import editorReducer from './editorReducer';
import documentListReducer from './documentListReducer';
import editorViewOpenReducer from './editorViewOpenReducer';
import editorViewRedirectReducer from './editorViewRedirectReducer';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import colorReducer from './colorReducer';
import titleReducer from './titleReducer';

// import * as types from '../actions/types';

const rootReducer = combineReducers({
  // label reducers as the state name to the reducer name
  documentList: documentListReducer,
  editorViewOpenState: editorViewOpenReducer,
  editorViewRedirectState: editorViewRedirectReducer,
  editorState: editorReducer,
  loginState: loginReducer,
  registerState: registerReducer,
  colorState: colorReducer,
  titleState: titleReducer
});

export default rootReducer;
