/**
 * 工具栏按钮
 *
 * @export
 * @class StyleButton
 * @extends {Component}
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class StyleButton extends Component {
  static propTypes = {
    style: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
    onToggle: PropTypes.func
  };
  onToggle = (e) => {
    e.preventDefault();
    this.props.onToggle(this.props.style);
  };

  render() {
    let className = 'RichEditor-styleButton';
    if (this.props.active) {
      className += ' RichEditor-activeButton';
    }
    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}
