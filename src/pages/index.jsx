// Draftjs兼容处理：https://draftjs.org/docs/advanced-topics-issues-and-pitfalls.html#polyfills
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

ReactDOM.render(<App />, document.getElementById('root'));
