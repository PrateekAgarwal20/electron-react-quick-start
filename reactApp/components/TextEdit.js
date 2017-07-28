import React from 'react';
import {Editor} from 'draft-js';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onChangeAction, onChangeColor} from '../actions/actions.js'; // import relevant actions

class TextEdit extends React.Component {
  componentDidMount() {
    this.props.socket.on('updateEditor', (editorState) => {
      this.props.onChange(editorState);
    });
  }

  render() {
    return (
        <div>
          <Editor
            editorState={this.props.editorState}
            onChange={changeEditor(this.props.socket, this.props.docId, this.props.editorState, this.props.onChange)}
            customStyleMap={setStyleMap(this.props.colorState)}
          />
          <button onClick={(e) => this.props.onColorChange(e)}>change color</button>
        </div>
    );
  }
}

const changeEditor = (socket, docId, editorState, onChange) => {
  socket.emit('editorChange', docId, editorState);
  return onChange;
};


const setStyleMap = (color) => {
  return (
    {
      'COLOR': {
        color: color
      }
    }
  );
};

TextEdit.propTypes = {
  editorState: PropTypes.object,
  onChange: PropTypes.func,
  colorState: PropTypes.String
};

const mapStateToProps = state => {
  return {
    editorState: state.editorState,
    colorState: state.colorState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: (newEditorState) => dispatch(onChangeAction(newEditorState)),
    onColorChange: (e) => dispatch(onChangeColor(e))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TextEdit);
