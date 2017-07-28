import React from 'react';
import Popover from 'material-ui/Popover';
import { CirclePicker } from 'react-color';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {onColorClickAction} from '../actions/actions.js'; // import relevant actions

class ColorPicker extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div>
        <IconButton tooltip="color" tooltipPosition="top-right" onMouseDown={(e) => this.handleTouchTap(e)}><i className="material-icons">format_color_text</i></IconButton>
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={() => this.handleRequestClose()}
        >
          <CirclePicker width='160px' circleSize={15} onChangeComplete={(color, e) => this.props.onColorClick(color, e)} circleSpacing={10} colors={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#000000", "#795548", "#607d8b"]}/>
        </Popover>
      </div>
    );
  }
}


ColorPicker.propTypes = {
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  console.log('in mapdispatchtoProps');
  return {
    onColorClick: (color, e) => dispatch(onColorClickAction(color.hex, e))
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ColorPicker);
