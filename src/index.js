// polyfill promise && fetch globally
import 'promise-polyfill';
import 'unfetch';
import FastClick from 'fastclick';

import { h, render } from 'preact';
import './style/index.less';

FastClick.attach(document.body);

// hide loading animation
const loadingDom = document.querySelector('.page_init_loading');
loadingDom && (() => {
  loadingDom.classList.add('fadeOut');
  setTimeout(_ => loadingDom.style.zIndex = -1, 350);
})();

let root;

// register ServiceWorker via OfflinePlugin, for prod only:
if (process.env.NODE_ENV === 'production') {
  require('./pwa');
}

// in development, set up HMR:
if (module.hot) {
  require('preact/devtools'); // turn this on if you want to enable React DevTools!
  module.hot.accept('./components/app', () => requestAnimationFrame(init));
}

init();

function init() {
  let App = require('./components/app').default;
  root = render(<App />, document.body, root);
}
