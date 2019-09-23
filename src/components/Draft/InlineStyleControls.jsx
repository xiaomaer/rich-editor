/**
 * 定义工具栏行内操作
 *
 * @export
 * @param {*} props
 * @returns
 */
import React from 'react';
import PropTypes from 'prop-types';
import StyleButton from './StyleButton';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Strike', style: 'STRIKETHROUGH' },
  { label: 'Monospace', style: 'CODE' }
];
export default function InlineStyleControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}
InlineStyleControls.propTypes = {
  onToggle: PropTypes.func.isRequired,
  editorState: PropTypes.object.isRequired
};
