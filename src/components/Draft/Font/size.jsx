import React, { Component } from 'react';
import Font from './index';

const fontsizeList = [12, 14, 16, 18, 20, 24, 28, 30, 32];
let styleFontsizeMap = {};
fontsizeList.forEach((item) => (styleFontsizeMap[item] = { fontSize: item }));

export default class FontSize extends Component {
  render() {
    return (
      <Font
        data={fontsizeList}
        editorState={this.props.editorState}
        onToggle={this.props.onToggle}
      />
    );
  }
}

export { styleFontsizeMap };
