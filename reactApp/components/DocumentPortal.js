import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {newDoc, addSharedDoc, deleteDoc, openDoc} from '../actions/actions.js';

import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import {indigo50, indigo100, red900} from 'material-ui/styles/colors';
import NewDoc from 'material-ui/svg-icons/action/note-add';
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import axios from 'axios';

const onNewDocClick = (userId, docName, onNewClick) => {
  axios.post('http://localhost:3005/create', {
    userId,
    docName,
  })
  .then((resp) => {
    onNewClick(resp.data.docName, resp.data.docId, resp.data.isShared);
  });
};

const onSharedDocClick = (userId,  docId, onNewSharedClick) => {
  //send axios post request to local host 3000/addShared
  //then: dispatch action onSharedClick
  console.log('In onSharedDocClick');
  axios.post('http://localhost:3005/addShared', {
    docId,
    userId,
  })
  .then((resp) => {
    console.log('resp', resp);
    // console.log('name',resp.data.docName,"id",resp.data.docId, 'user', userId);
    // onNewClick(resp.
    onNewSharedClick(resp.data.docName, resp.data.docId, resp.data.isShared);
  });
    //then: dispatch action onNewClick
};

const onDeleteDocClick = (userId, docId) => {
  //send axios post request to local host 3000/delete
  //then: dispatch action onDeleteClick
  axios.post('http://localhost:3005/delete', {

  });
};

const onDocOpenClick = (userId, docId) => {
  //send axios get request to local host 3000/open?docId=
  //then dispatch action onOpenClick
};

const colors = {
  TOP_FONT_COLOR: '#ffffff',
  ADD_DOC_PAPER_COLOR: '#1d4e69',
  TOP_PAPER_COLOR: '#cb3837'
};

const tempStyles = {
  separator: {
    'backgroundColor': colors.TOP_FONT_COLOR,
    'position': 'relative',
    'marginLeft': '10%',
    'marginRight': '10%',
    'height': '50px',
    'marginTop': '-4px'
  },
  textFieldStyle: {
    'fontColor': colors.TOP_FONT_COLOR,
    'color': colors.TOP_FONT_COLOR,
    'fontSize': '1.5em',
    'width': '50%',
    'height': '60px',
    'marginRight': '14px',
    'marginLeft': '7%',
    'marginTop': '5px'
  },
  topPaper: {
    'width': '100%',
    'height': '150px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'backgroundColor': colors.TOP_PAPER_COLOR
  },
  addDocPaper: {
    'width': '700px',
    'height': '60px',
    'backgroundColor': colors.ADD_DOC_PAPER_COLOR,
    'borderRadius': '5px'
  },
  newDocStyle: {
    'width': '36px',
    'height': '36px',
    'marginRight': '',
    'color': colors.TOP_FONT_COLOR
  },
  newDocButtonStyle: {
    'width': '60px',
    'height': '60px',
    'marginTop': '5px'
  }

};

let DocumentPortal = ({userId, onNewClick, docId, onNewSharedClick}) => {
  return (
    <div>

        <div>
          <Paper style={tempStyles.topPaper} zDepth={1} children={
            <Paper style={tempStyles.addDocPaper} zDepth={2} children={
              <ToolbarGroup>
                <TextField
                  hintText="Add new document..."
                  underlineStyle={{borderColor: colors.ADD_DOC_PAPER_COLOR}}
                  underlineFocusStyle={{borderColor: colors.ADD_DOC_PAPER_COLOR}}
                  hintStyle={{color: colors.TOP_FONT_COLOR}}
                  inputStyle={{color: colors.TOP_FONT_COLOR}}
                  style={tempStyles.textFieldStyle}
                />
                <ToolbarSeparator style={tempStyles.separator}/>
                <IconButton iconStyle={tempStyles.newDocStyle} style={tempStyles.newDocButtonStyle}>
                  <NewDoc />
                </IconButton>
              </ToolbarGroup>
            }/>
          }/>

        </div>
      <input type="text" id="docName" placeholder="New Document Name" ></input>
      <button onClick={() => onNewDocClick(userId, document.getElementById('docName').value, onNewClick)}>Create</button><br></br>
      <input type="text" id="docId" placeholder="Document ID"></input>
      <button onClick={() => onSharedDocClick(userId, document.getElementById('docId').value, onNewSharedClick)}>Add</button>
      <IconButton onClick={() => onDeleteDocClick(userId, docId)}><i className="material-icons">delete_forever</i></IconButton>
    </div>
  );
};

DocumentPortal.propTypes = {
  onNewDocClick: PropTypes.func,
  onNewSharedClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onOpenClick: PropTypes.func,
  userId: PropTypes.String
};

const mapStateToProps = state => {
  return {
    userId: '59791638b114ad48db864b00'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewClick: (userId, newDocName, docId) => dispatch(newDoc(userId, newDocName, docId)),
    onNewSharedClick: (userId, newDocName, docId) => dispatch(addSharedDoc(userId, newDocName, docId)),
    onDeleteClick: (userId, docId) => dispatch(deleteDoc(userId, docId)),
    onOpenClick: (userId, docId) => dispatch(openDoc(userId, docId)),
  };
};

DocumentPortal = connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentPortal);

export default DocumentPortal;
