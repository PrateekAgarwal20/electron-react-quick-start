import React from 'react';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Redirect} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import PropTypes from 'prop-types';
import {goBack, save, requestClose} from '../actions/actions.js';
import {connect} from 'react-redux';
import axios from 'axios';

// TODO: import {Documents} from 'path to models'

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const onSaveClick = (docId, editorState) => {
  axios.post('http://localhost:3005/save', {
    docId,
    editorState
  });
};

let EditorView = ({docId, redirectToHome, open, handleRequestClose, onBack, onSave, editorState}) => {
  if (redirectToHome) {
    return <Redirect push to="/documents" />;
  } else {
    return (
      <div className='outsideStyle'>
        <AppBar
          style={{
            backgroundColor: '#3F51B5'
          }}
          title={<span style={styles.title}>This is the document title</span>}
          iconElementLeft={<IconButton onClick={() => onBack()}><i className="material-icons">arrow_back</i></IconButton>}
          iconElementRight={<FlatButton onClick={() => onSaveClick(docId, editorState)} label="Save Changes" />}
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
            onRequestClose={() => handleRequestClose()}
          />
        </div>
      </div>
    );
  }
};

EditorView.propTypes = {
  editorState: PropTypes.object,
  redirectToHome: PropTypes.bool,
  open: PropTypes.bool,
  docId: PropTypes.String
};

const mapStateToProps = state => {
  return {
    docId: '59791674b69f8b495e2377dd',
    redirectToHome: state.editorViewRedirectState,
    open: state.editorViewOpenState,
    editorState: state.editorState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRequestClose: () => dispatch(requestClose()),
    onBack: () => dispatch(goBack()),
    // onSave: (editorState) => dispatch(save(editorState)),
  };
};

EditorView = connect(
    mapStateToProps,
    mapDispatchToProps
)(EditorView);

export default EditorView;
