import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import './index.scss';

const { hasCommandModifier } = KeyBindingUtil;

export default class MyEditor extends Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }
  componentDidMount() {
    this.editor.focus();
  }

  onChange = (editorState) => {
    this.setState({ editorState });
  };
  // 处理按键执行操作，Cmd+B (bold), Cmd+I (italic)
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    // 自定义按键执行行为
    if (command === 'myeditor-save') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      return 'handled';
    }
    return 'not-handled';
  };
  // 粗体操作
  _onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  };
  // 修改按键默认行为
  myKeyBindingFn = (e) => {
    /* `S` key */
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    // 获取默认按键执行命令
    return getDefaultKeyBinding(e);
  };
  // 修改默认样式,.blockquote样式替换为.superFancyBlockquote样式
  myBlockStyleFn = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  };
  render() {
    return (
      <div className="draft-editor-container">
        {/* 工具栏按钮操作 */}
        <div className="draft-editor-toolbar ">
          <button type="button" onClick={this._onBoldClick}>
            Bold
          </button>
        </div>
        <Editor
          ref={(editor) => (this.editor = editor)}
          editorState={this.state.editorState}
          onChange={this.onChange}
          placeholder="请输入..."
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.myKeyBindingFn}
          blockStyleFn={this.myBlockStyleFn}
        />
      </div>
    );
  }
}
