import React, { Component } from 'react';
import './index.scss';

export default class FontSize extends Component {
  handleToggle = (e, item) => {
    e.preventDefault();
    this.props.onToggle(item);
  };
  render() {
    const currentStyle = this.props.editorState.getCurrentInlineStyle();
    return (
      <div>
        {this.props.data.map((item, index) => {
          const active = currentStyle.has(item);
          return (
            <span
              className={`font-item${active ? ' font-item-active' : ''}`}
              key={index}
              onMouseDown={(e) => this.handleToggle(e, item)}
            >
              {item}
            </span>
          );
        })}
      </div>
    );
  }
}
