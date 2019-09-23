- [使用文档-英文](https://draftjs.org/docs/getting-started)
- [使用文档-中文](http://seejs.me/draft-js-cn/docs/)
- [demo](https://draftjs.org/)
- [github](https://github.com/facebook/draft-js)
- [awesome-draft-js](https://github.com/nikgraf/awesome-draft-js)
- [plugins](https://github.com/draft-js-plugins/draft-js-plugins/blob/master/README.md)


结论：
* 在React中构建富文本编辑器的框架，基于不可变模式和封装跨浏览器差异来实现。
* 本质上是一个编辑器，不是一个开箱即用的富文本编辑器，需要基于其提供的Editor组件和API，自定义开发工具栏操作，实现对富文本编辑器的封装
* 完全可定制和扩展，提供构建模块，以支持创建各种丰富的文本组合体验，从简单的文本样式到嵌入式媒体元素
* 社区虽然有一些插件，但是不一定满足我们的功能和交互场景，仍然需要二次开发或重写，所以基于draft封装富文本编辑器，要考虑人力和时间成本，可能需要根据我们的需求，`从头开始规划和开发工具栏操作`。
* 官方文档明确说明，在Android和IOS支持上，仍然存在一些问题。


draft自身不支持：字号【done】、颜色（有plugin）、缩进、图片（有插件）、字体【done】、分割线（有插件）、对齐方式（有插件）、超链接（有插件）

有些插件移动端是不支持的，要么在此基础上优化，要么重新开发。draft本身是个编辑器，需要设计和实现工具栏，内置操作包括加粗、斜体、下划线、列表、标题、代码块、引用块

字体、图片可以正常显示，但是视频、音频、表格、缩进、链接、居中