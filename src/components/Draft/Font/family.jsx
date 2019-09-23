import React, { Component } from 'react';
import Font from './index';

const fontfamilyList = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy'];
let styleFontfamilyMap = {};
fontfamilyList.forEach((item) => (styleFontfamilyMap[item] = { fontFamily: item }));

export default class FontSize extends Component {
  render() {
    return (
      <Font
        data={fontfamilyList}
        editorState={this.props.editorState}
        onToggle={this.props.onToggle}
      />
    );
  }
}

export { styleFontfamilyMap };
