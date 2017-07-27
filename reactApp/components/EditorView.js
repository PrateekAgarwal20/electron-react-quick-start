import React from 'react';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {Redirect} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

class EditorView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToHome: false,
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  onSave() {
    // TODO: if document exists, update. Else, create and save
    this.setState({
      open: true,
    });
  }

  onBack() {
    // TODO: save document and go back
    this.setState({
      redirectToHome: true,
    });
  }

  render() {
    if (this.state.redirectToHome) {
      return <Redirect push to="/documents" />;
    } else {
      return (
        <div className='outsideStyle'>
          <AppBar
            style={{
              backgroundColor: '#3F51B5'
            }}
            title={<span style={styles.title}>This is the document title</span>}
            iconElementLeft={<IconButton onClick={() => this.onBack()}><i className="material-icons">arrow_back</i></IconButton>}
            iconElementRight={<FlatButton onClick={() => this.onSave()} label="Save Changes" />}
          />
          <MuiThemeProvider>
            <Toolbar />
          </MuiThemeProvider>
          <div className='textStyle'><TextEdit/></div>
          <div>
            <Snackbar
              open={this.state.open}
              message="Changes saved!"
              autoHideDuration={1000}
              onRequestClose={() => this.handleRequestClose()}
            />
          </div>
        </div>
      );
    }

  }
}

export default EditorView;
