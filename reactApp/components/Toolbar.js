import React from 'react';
// import {Editor, EditorState, RichUtils} from 'draft-js';


import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {onBoldClick, onItalicClick, onStrikeClick, onUnderlineClick, onCodeClick} from '../actions/actions.js'; // import relevant actions
import IconButton from 'material-ui/IconButton';
import ColorPicker from './ColorPicker';

let Toolbar = ({onBoldClick, onItalicClick, onStrikeClick, onUnderlineClick, onCodeClick}) => {
  return (
    <div className="divStyle">
      <IconButton tooltip="bold" tooltipPosition="top-right" onMouseDown={(e) => onBoldClick(e)} ><i className="material-icons">format_bold</i></IconButton>
      <IconButton tooltip="italic" tooltipPosition="top-right" onMouseDown={(e) => onItalicClick(e)} ><i className="material-icons">format_italic</i></IconButton>
      <IconButton tooltip="underline" tooltipPosition="top-right" onMouseDown={(e) => onUnderlineClick(e)} ><i className="material-icons">format_underlined</i></IconButton>
      <IconButton tooltip="strikethrough" tooltipPosition="top-right" onMouseDown={(e) => onStrikeClick(e)} ><i className="material-icons">format_strikethrough</i></IconButton>
      <IconButton tooltip="code" tooltipPosition="top-right" onMouseDown={(e) => onCodeClick(e)} ><i className="material-icons">font_download</i></IconButton>
      <IconButton tooltip="color" tooltipPosition="top-right" onMouseDown={(e) => onStrikeClick(e)} ><i className="material-icons">format_color_text</i></IconButton>
      <ColorPicker />
    </div>
  );
};

Toolbar.propTypes = {
  onBoldClick: PropTypes.func
};

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBoldClick: (e) => dispatch(onBoldClick(e)),
    onItalicClick: (e) => dispatch(onItalicClick(e)),
    onStrikeClick: (e) => dispatch(onStrikeClick(e)),
    onUnderlineClick: (e) => dispatch(onUnderlineClick(e)),
    onCodeClick: (e) => dispatch(onCodeClick(e)),
  };
};

Toolbar = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toolbar);

export default Toolbar;
