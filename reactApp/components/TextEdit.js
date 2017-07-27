import React from 'react';
import {Editor} from 'draft-js';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onChangeAction, onChangeColor} from '../actions/actions.js'; // import relevant actions

let TextEdit = ({editorState, onChange, colorState, onColorChange}) => {

  return (
      <div>
        <Editor
          editorState={editorState}
          onChange={onChange}
          customStyleMap={setStyleMap(colorState)}
        />
        <button onClick={(e) => onColorChange(e)}>change color</button>
      </div>
  );
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

TextEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(TextEdit);

export default TextEdit;
