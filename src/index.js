import reactDom from 'react-dom';
import { h, render } from 'preact';

let root;

if (module.hot) {
  require('preact/devtools'); // turn this on if you want to enable React DevTools!
  module.hot.accept('./app', () => requestAnimationFrame(init));
}

init();

function init() {
  let App = require('./app').default;
  root = render(<App />, document.body, root);
}
