import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import './editorStyles.scss';

/* algin对齐方式 */
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import 'draft-js-alignment-plugin/lib/plugin.css';

const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;
const plugins = [alignmentPlugin];

export default class SimpleInlineToolbarEditor extends Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = (editorState) => {
    this.setState({
      editorState
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div>
        <div className="editor" onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
          <AlignmentTool />
        </div>
      </div>
    );
  }
}
