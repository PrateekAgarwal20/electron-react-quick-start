import React from 'react';
import TextEdit from './TextEdit.js';
import Toolbar from './Toolbar.js';

class EditorView extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => {}}>Back to Documents Portal</button>
        <h1> This is the document name </h1>
        <p> Sharable Document ID: 69696969 </p>
        <button onClick={() => {}}>Save Changes</button>
        <Toolbar />
        <TextEdit />
      </div>
    );
  }
}

export default EditorView;
