import React from 'react';
import {EditorState} from 'draft-js';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Redirect} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import PropTypes from 'prop-types';
import {goBack, save, requestClose, getTitle, onChangeAction} from '../actions/actions.js';
import {connect} from 'react-redux';
import axios from 'axios';

// TODO: import {Documents} from 'path to models'

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const onRefresh = (docId, onEditorChanged, onGetTitle) => {
  axios.get('http://localhost:3005/open/'+docId)
       .then((resp) => {
         // TODO: fix save in order to save something to editor state then test if this part works as well
         console.log('editor state', resp.data);

         var editorState = resp.data.editorState;
         var content = editorState.getCurrentContent();
         var newEditorState = EditorState.createWithContent(content, );

         onEditorChanged(newEditorState);
         onGetTitle(resp.data.title);
       });
};

const onSaveClick = (docId, editorState) => {
  axios.post('http://localhost:3005/save', {
    docId,
    editorState
  });
};

class EditorView extends React.Component {
    componentDidMount(){
      onRefresh(this.props.match.params.docId, this.props.onEditorChanged, this.props.onGetTitle);
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
            iconElementLeft={<IconButton onClick={() => this.props.onBack()}><i className="material-icons">arrow_back</i></IconButton>}
            iconElementRight={<FlatButton onClick={() => onSaveClick(this.props.match.params.docId, this.props.editorState)} label="Save Changes" />}
          />
          <MuiThemeProvider>
            <Toolbar />
          </MuiThemeProvider>
          <div className='textStyle'><TextEdit/></div>
          <div>
            <Snackbar
              open={open}
              message="Changes saved!"
              autoHideDuration={1000}
              onRequestClose={() => this.props.handleRequestClose()}
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
    onGetTitle: (title) => dispatch(getTitle(title))
    // onSave: (editorState) => dispatch(save(editorState)),
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorView);
