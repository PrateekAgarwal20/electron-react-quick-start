import React from 'react';
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {withRouter} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import PropTypes from 'prop-types';
import {goBack, requestClose, getTitle, onChangeAction} from '../actions/actions.js';
import {connect} from 'react-redux';
import axios from 'axios';


const styles = {
  title: {
    cursor: 'pointer',
  },
};

const onRefresh = (docId, onEditorChanged, onGetTitle) => {
  axios.get('http://localhost:3005/open/'+docId)
       .then((resp) => {
         // TODO: fix save in order to save something to editor state then test if this part works as well
         console.log('refreshing', resp.data);

         const editorState = resp.data.editorState;
         if(!editorState){
           onEditorChanged(EditorState.createEmpty());
         } else {
           onEditorChanged(EditorState.createWithContent(convertFromRaw(editorState)));
         }
         console.log('can you do this?');
         onGetTitle(resp.data.title);
       });
};

const onSaveClick = (docId, editorState, snackSave) => {
  snackSave();

  axios.post('http://localhost:3005/save', {
    docId,
    editorState: convertToRaw(editorState.getCurrentContent())
  });
};

const BackButton = withRouter(({ history}) => (
  <IconButton onClick={() => { history.push('/main'); }}>
    <i className="material-icons">arrow_back</i>
  </IconButton>
));

class EditorView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      snackbarOpen: false
    };
  }

  componentDidMount(){
    console.log('params docId', this.props.match.params.docId);
    console.log('props title', this.props.title);
    onRefresh(this.props.match.params.docId, this.props.onEditorChanged, this.props.onGetTitle);
  }

  snackSave() {
    console.log('enters snacksave');
    console.log('before', this.state.snackbarOpen);
    this.setState({
      snackbarOpen: true
    });
    console.log('after', this.state.snackbarOpen);
  }

  handleRequestClose() {
    this.setState({
      snackbarOpen: false,
    });
  }

  render() {
    console.log('editor state inside editor view', this.props.editorState);
    return (
      <div className='outsideStyle'>
        <AppBar
          style={{
            backgroundColor: '#3F51B5'
          }}
          title={<span style={styles.title}>{this.props.titleState}</span>}
          // iconElementLeft={<IconButton onClick={() => this.props.onBack()}><i className="material-icons">arrow_back</i></IconButton>}
          iconElementLeft={<BackButton />}
          iconElementRight={<FlatButton onClick={() => {
            onSaveClick(this.props.match.params.docId, this.props.editorState, () => this.snackSave());
          }} label="Save Changes" />}
        />
        <MuiThemeProvider>
          <Toolbar />
        </MuiThemeProvider>
        <div className='textStyle'><TextEdit/></div>
        <div>
          <Snackbar
            open={this.state.snackbarOpen}
            message="Changes saved!"
            autoHideDuration={1000}
            onRequestClose={() => this.handleRequestClose()}
          />
        </div>
      </div>
    );
  }
}


EditorView.propTypes = {
  editorState: PropTypes.object,
  redirectToHome: PropTypes.bool,
  open: PropTypes.bool,
  titleState: PropTypes.String
};

const mapStateToProps = state => {
  return {
    redirectToHome: state.editorViewRedirectState,
    open: state.editorViewOpenState,
    editorState: state.editorState,
    titleState: state.titleState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRequestClose: () => dispatch(requestClose()),
    onBack: () => dispatch(goBack()),
    onEditorChanged: (newEditorState) => dispatch(onChangeAction(newEditorState)),
    onGetTitle: (title) => dispatch(getTitle(title)),
    // onSave: (editorState) => dispatch(save(editorState)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorView);
