import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  EditorState,
  ContentState,
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertFromHTML,
  Modifier
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import BlockStyleControls from './BlockStyleControls';
import InlineStyleControls from './InlineStyleControls';
import ColorPicker, { styleColorMap } from './ColorPicker';
import FontSize, { styleFontsizeMap } from './Font/size';
import FontFamily, { styleFontfamilyMap } from './Font/family';
import './demo.scss';

const { hasCommandModifier } = KeyBindingUtil;

export default class DemoDraft extends Component {
  static propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(EditorState)]),
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool, // 是否将编辑器渲染为禁止所有编辑行为的静态DOM。
    stripPastedStyles: PropTypes.bool, // 是否删除除粘贴内容的纯文本外的所有信息
    handlePastedText: PropTypes.func, // 处理直接被粘贴到编辑器里面的文本或html（富文本）
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };
  static defaultProps = {
    defaultValue: EditorState.createEmpty(),
    placeholder: '请输入...',
    readOnly: false,
    stripPastedStyles: false
  };
  constructor(props) {
    super(props);
    let defaultValue = props.defaultValue;
    if (typeof defaultValue === 'string') {
      const blocksFromHTML = convertFromHTML(defaultValue);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      defaultValue = EditorState.createWithContent(state);
    }
    this.state = {
      editorState: defaultValue
    };
  }
  onChange = (editorState) => {
    this.setState({
      editorState
    });
    this.props.onChange && this.props.onChange(editorState);
  };
  toggleBlockType = (blockType) => {
    const editorState = RichUtils.toggleBlockType(this.state.editorState, blockType);
    this.onChange(editorState);
  };
  toggleInlineStyle = (inlineType) => {
    const editorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineType);
    this.onChange(editorState);
  };
  onFocus = () => {
    this.editor.focus();
  };
  // 自定义类名，修改默认块样式,.blockquote样式替换为.RichEditor-blockquote样式
  getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote':
        return 'RichEditor-blockquote';
      default:
        return null;
    }
  };
  // 自定义内联样式表
  getStyleMap = () => {
    return {
      ...styleColorMap,
      ...styleFontsizeMap,
      ...styleFontfamilyMap,
      STRIKETHROUGH: {
        // 增加一个'STRIKETHROUGH'样式
        textDecoration: 'line-through'
      },
      CODE: {
        // 重写code样式
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2
      }
    };
  };
  //   处理按键执行操作
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    if (command === 'myeditor-save') {
      // Perform a request to save your contents, set
      // a new `editorState`, etc.
      return 'handled';
    }
    return 'not-handled';
  };
  // 修改按键默认行为
  mapKeyToEditorCommand = (e) => {
    /* TAB */
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(e, this.state.editorState, 4 /* maxDepth */);
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    /* `S` key */
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return 'myeditor-save';
    }
    return getDefaultKeyBinding(e);
  };
  handlePastedText = (text, html, editorState) => {};
  handleFocus = () => {
    this.props.onFocus && this.props.onFocus(this.state.editorState);
  };
  hanldeBlur = () => {
    this.props.onBlur && this.props.onBlur(this.state.editorState);
  };
  toggleCustom = (type, styleMap, isNum = false) => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    const nextContentState = Object.keys(styleMap).reduce((contentState, item) => {
      return Modifier.removeInlineStyle(contentState, selection, isNum ? Number(item) : item);
    }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');
    const currentStyle = editorState.getCurrentInlineStyle();
    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    }
    // If the color is being toggled on, apply it.
    if (!currentStyle.has(type)) {
      nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, type);
    }

    this.onChange(nextEditorState);
  };

  render() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();
    let className = 'RichEditor-editor';
    if (!contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }
    const customStyleMap = this.getStyleMap();

    return (
      <div className="RichEditor-root">
        <ColorPicker
          editorState={editorState}
          onToggle={(type) => this.toggleCustom(type, styleColorMap)}
        />
        <FontSize
          editorState={editorState}
          onToggle={(type) => this.toggleCustom(type, styleFontsizeMap, true)}
        />
        <FontFamily
          editorState={editorState}
          onToggle={(type) => this.toggleCustom(type, styleFontfamilyMap)}
        />
        <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
        <div className={className} onFocus={this.onFocus}>
          <Editor
            ref={(editor) => (this.editor = editor)}
            editorState={editorState}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
            blockStyleFn={this.getBlockStyle}
            customStyleMap={customStyleMap}
            readOnly={this.props.readOnly}
            stripPastedStyles={this.props.stripPastedStyles}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            handlePastedText={this.handlePastedText}
            onFocus={this.handleFocus}
            onBlur={this.hanldeBlur}
          />
        </div>
      </div>
    );
  }
}
