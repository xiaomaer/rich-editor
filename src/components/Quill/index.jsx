/**
 * 基于Quill 的移动端富文本编辑器
 * github地址：https://github.com/quilljs/quill
 * @export
 * @class MobileQuill
 * @extends {Component}
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Main Quill library
import Quill from 'quill';
//  Theme included stylesheets
import 'quill/dist/quill.snow.css';
// 自定义样式
import './index.scss';

export default class MobileQuill extends Component {
  static propTypes = {
    defaultValue: PropTypes.string,
    value: PropTypes.string,
    bounds: PropTypes.node,
    debug: PropTypes.string,
    formats: PropTypes.object, // 支持的格式化https://bingkui.gitbooks.io/quill/content/documentation/formats.html
    toolbar: PropTypes.object || PropTypes.array,
    keyboard: PropTypes.object,
    history: PropTypes.object,
    clipboard: PropTypes.object,
    syntax: PropTypes.bool,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    scrollingContainer: PropTypes.node,
    strict: PropTypes.bool,
    theme: PropTypes.string, // 内置的选项有“bubble”和“snow”
    onChange: PropTypes.func,
    onSelectionChange: PropTypes.func
  };
  // 属性默认配置请参考：https://bingkui.gitbooks.io/quill/content/documentation/configuration.html
  static defaultProps = {
    defaultValue: '',
    placeholder: '请输入...',
    theme: 'snow'
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || props.defaultValue
    };
  }
  componentDidMount() {
    // 编辑器初始化
    this.createEditor();
  }
  componentWillReceiveProps(nextProps) {
    let editor = this.quill;
    if (!editor) return;
    if ('value' in nextProps) {
      const currentContents = this.state.value;
      const nextContents = nextProps.value;
      if (currentContents !== nextContents) {
        this.setEditorContents(nextContents);
      }
    }
  }
  componentWillUnmount() {
    this.quill.off('selection-change');
    this.quill.off('text-change');
    this.quill = null;
  }
  createEditor() {
    const {
      defaultValue,
      value,
      toolbar,
      keyboard,
      history,
      clipboard,
      syntax,
      ...rest
    } = this.props;
    const modules = {
      toolbar,
      keyboard,
      history,
      clipboard,
      syntax
    };
    this.quill = new Quill('#editor', {
      ...rest,
      modules
    });
    this.setEditorContents(this.state.value);
    this.quill.setSelection(this.quill.getSelection());
    this.quill.focus();
    // 当text-change或者selection-change执行后会被调用执行
    this.quill.on('editor-change', (eventType, rangeOrDelta, oldRangeOrOldDelta, source) => {
      if (eventType === Quill.events.SELECTION_CHANGE) {
        this.handleSelectionChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }

      if (eventType === Quill.events.TEXT_CHANGE) {
        this.handleTextChange(rangeOrDelta, oldRangeOrOldDelta, source);
      }
    });
  }
  handleTextChange = (delta, oldDelta, source) => {
    const editor = this.quill;
    const htmlStr = editor.root.innerHTML;
    this.setState({
      value: htmlStr
    });
    this.props.onChange && this.props.onChange(htmlStr, delta, source);
    this.props.onSelectionChange && this.props.onSelectionChange(editor.getSelection(), source);
  };

  handleSelectionChange = (range, oldRange, source) => {
    this.props.onSelectionChange && this.props.onSelectionChange(range, source);
  };
  setEditorContents(contents) {
    const editor = this.quill;
    if (typeof contents === 'string') {
      editor.setContents(editor.clipboard.convert(contents));
    } else {
      editor.setContents(contents);
    }
  }

  render() {
    return <div id="editor"></div>;
  }
}
