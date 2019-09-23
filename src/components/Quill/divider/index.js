import Quill from 'quill';
import Divider from './divider.js';
Quill.register({
  'formats/divider': Divider
});

class ToolbarDivider {
  constructor(quill) {
    this.quill = quill;
    this.toolbar = quill.getModule('toolbar');
    if (typeof this.toolbar !== 'undefined') {
      this.toolbar.addHandler('divider', this.insertDivider);
    }
  }
  insertDivider() {
    let range = this.quill.getSelection(true);
    this.quill.insertText(range.index, '\n', Quill.sources.USER);
    this.quill.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER);
    this.quill.setSelection(range.index + 2, Quill.sources.SILENT);
  }
}
Quill.register('modules/divider', ToolbarDivider);
