import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors, styleColorMap } from './constant';
import './index.scss';

export default class ColorPicker extends Component {
  static propTypes = {
    prop: PropTypes
  };
  handleColorChange = (e, color) => {
    e.preventDefault();
    this.props.onToggle(color);
  };
  renderColor = () => {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    return colors.map((color, index) => {
      const active = currentStyle.has(color);
      return (
        <span
          key={index}
          style={{ backgroundColor: color }}
          className={`color-picker-item${active ? ' color-picker-item-active' : ''}`}
          onMouseDown={(e) => this.handleColorChange(e, color)}
        ></span>
      );
    });
  };

  render() {
    return (
      <div className="color-picker-container">
        {/* <div className="color-picker-button">color</div> */}
        <div className="color-picker">{this.renderColor()}</div>
      </div>
    );
  }
}
export { styleColorMap };
