import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {newDoc, addSharedDoc, deleteDoc, openDoc, renderDocs} from '../actions/actions.js';

import {Route} from 'react-router-dom';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import NewDoc from 'material-ui/svg-icons/action/note-add';
import {ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import axios from 'axios';

const onRenderDocsClick = (userId, onRenderClick) => {
  axios.get('http://localhost:3005/render/'+userId)
       .then((resp) => {
         onRenderClick(resp);
       });
};

const onNewDocClick = (userId, docName, onNewClick) => {
  console.log('about to post');
  axios.post('http://localhost:3005/create', {
    userId,
    docName,
  })
  .then((resp) => {
    console.log('got to the then');
    onNewClick(resp.data.docName, resp.data.docId, resp.data.isShared);
  });
};

const onSharedDocClick = (userId,  docId, onNewSharedClick) => {
  //send axios post request to local host 3000/addShared
  //then: dispatch action onSharedClick
  console.log('about to post to addShared');
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

const onDeleteDocClick = (userId, docId, onDeleteClick) => {
  //send axios post request to local host 3000/delete
  //then: dispatch action onDeleteClick
  axios.post('http://localhost:3005/delete/' + docId, {
    docId,
    userId
  }).then(() => {
    onDeleteClick(userId, docId);
  });
};

const colors = {
  TOP_FONT_COLOR: '#ffffff',
  ADD_DOC_PAPER_COLOR: '#325d77',
  TOP_PAPER_COLOR: '#cb3837',
  SHARED_DOC_PAPER_COLOR: '#1b73a7',
  UNDERLINE_COLOR: 'rgba(0, 0, 0, 0)'
};

const tempStyles = {
  addDocSeparator: {
    'backgroundColor': colors.TOP_FONT_COLOR,
    'marginLeft': '10%',
    'marginRight': '8%',
    'height': '50px',
    'marginTop': '-4px'
  },
  addDocTextFieldStyle: {
    'fontColor': colors.TOP_FONT_COLOR,
    'color': colors.TOP_FONT_COLOR,
    'fontSize': '1.5em',
    'width': '50%',
    'height': '60px',
    'marginLeft': '7%',
    'marginBottom': '5px'
  },
  topPaper: {
    'width': '100%',
    'height': '150px',
    'backgroundColor': colors.TOP_PAPER_COLOR
  },
  addDocPaper: {
    'width': '60%',
    'height': '60px',
    'backgroundColor': colors.ADD_DOC_PAPER_COLOR,
    'borderRadius': '5px',
    'marginLeft': '20%'
  },
  newDocStyle: {
    'width': '36px',
    'height': '36px',
    'color': colors.TOP_FONT_COLOR
  },
  newDocButtonStyle: {
    'width': '60px',
    'height': '60px',
    'marginRight': '8%'
  },
  sharedDocPaper: {
    'width': '45%',
    'height': '50px',
    'backgroundColor': colors.SHARED_DOC_PAPER_COLOR,
    'borderRadius': '5px',
    'marginTop': '10px',
    'marginLeft': '27.5%'
  },
  sharedDocTextFieldStyle: {
    'fontColor': colors.TOP_FONT_COLOR,
    'color': colors.TOP_FONT_COLOR,
    'fontSize': '1.125em',
    'width': '50%',
    'height': '60px',
    'marginLeft': '7%',
    'marginBottom': '5px',
    'marginTop': '-5px'
  },
  sharedDocSeparator: {
    'backgroundColor': colors.TOP_FONT_COLOR,
    'marginLeft': '10%',
    'marginRight': '8%',
    'height': '30px',
    'marginTop': '-12px'
  },
  sharedDocStyle: {
    'width': '25px',
    'height': '25px',
    'color': colors.TOP_FONT_COLOR
  },
  sharedDocButtonStyle: {
    'width': '40px',
    'height': '40px',
    'marginRight': '8%',
    'padding': '5px',
    'marginBottom': '12px'
  },
};


class DocumentPortal extends React.Component {
  componentDidMount() {
    onRenderDocsClick(this.props.userId, this.props.onRenderClick);
  }

  render(){
    return (
      <div>
          <div>
              <AppBar
                  title="Mofokin Home"
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  iconElementLeft={<IconButton><ActionHome /></IconButton>}
                iconElementRight={<FlatButton label="Log me Mofokin out!" />}
                />
            <Paper style={tempStyles.topPaper} zDepth={1} children={
              <div>
                {/* // This is the Add New Doc Paper */}
                <Paper style={tempStyles.addDocPaper} zDepth={2} children={
                  <ToolbarGroup>
                    <TextField
                      hintText="Add new document..."
                      underlineStyle={{borderColor: colors.UNDERLINE_COLOR}}
                      underlineFocusStyle={{borderColor: colors.UNDERLINE_COLOR}}
                      hintStyle={{color: colors.TOP_FONT_COLOR, marginBottom: '5px'}}
                      inputStyle={{color: colors.TOP_FONT_COLOR}}
                      style={tempStyles.addDocTextFieldStyle}
                      id="docName"
                    />
                    <ToolbarSeparator style={tempStyles.addDocSeparator}/>
                    <IconButton onClick={() => onNewDocClick(this.props.userId, document.getElementById('docName').value, this.props.onNewClick)} iconStyle={tempStyles.newDocStyle} style={tempStyles.newDocButtonStyle}>
                      <NewDoc />
                    </IconButton>
                  </ToolbarGroup>
                }/>
                {/* // This is the Add Shared Doc Paper */}
                <Paper style={tempStyles.sharedDocPaper} zDepth={2} children={
                  <ToolbarGroup>
                    <TextField
                      hintText="Add shared document..."
                      underlineStyle={{borderColor: colors.UNDERLINE_COLOR}}
                      underlineFocusStyle={{borderColor: colors.UNDERLINE_COLOR}}
                      hintStyle={{color: colors.TOP_FONT_COLOR, marginBottom: '5px'}}
                      inputStyle={{color: colors.TOP_FONT_COLOR}}
                      style={tempStyles.sharedDocTextFieldStyle}
                      id="docId"
                    />
                    <ToolbarSeparator style={tempStyles.sharedDocSeparator}/>
                    <IconButton onClick={() => onSharedDocClick(this.props.userId, document.getElementById('docId').value, this.props.onNewSharedClick)} iconStyle={tempStyles.sharedDocStyle} style={tempStyles.sharedDocButtonStyle}>
                      <NewDoc />
                    </IconButton>
                  </ToolbarGroup>
                }/>
              </div>
            }/>
          </div>

          <ul>
          {this.props.documentList.map((doc) => {
            return (
              <li key={doc.id}>
                {openButton(doc.docId, doc.docName, this.props.socket)}
                {doc.isShared ? <div></div> : <IconButton onClick={() => onDeleteDocClick(this.props.userId, doc.docId, this.props.onDeleteClick)}><i className="material-icons">delete_forever</i></IconButton>}
              </li>
            );
          })}
        </ul>

      </div>
    );
  }
}

const openButton = (docId, docName, socket) => (
  // socket stuff
  <Route render={({ history}) => (
    <span
      onClick={() => {
        history.push('/editor/'+docId);
        socket.emit('joinRoom', docId);

      }}
    >
      {docName}
    </span>
  )}
/>
);

DocumentPortal.propTypes = {
  onNewDocClick: PropTypes.func,
  onNewSharedClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onOpenClick: PropTypes.func,
  onRenderClick: PropTypes.func,
  userId: PropTypes.String,
  documentList: PropTypes.Array
};

const mapStateToProps = state => {
  return {
    userId: state.loginState.userId,
    documentList: state.documentList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onNewClick: (userId, newDocName, docId) => dispatch(newDoc(userId, newDocName, docId)),
    onNewSharedClick: (docName, docId, isShared) => dispatch(addSharedDoc(docName, docId, isShared)),
    onDeleteClick: (userId, docId) => dispatch(deleteDoc(userId, docId)),
    onOpenClick: (userId, docId) => dispatch(openDoc(userId, docId)),
    onRenderClick: (userId, documentList) => dispatch(renderDocs(userId, documentList))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentPortal);
