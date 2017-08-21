// 整体应用入口
import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { createHashHistory } from 'history';
import AsyncRoute from '../lib/asyncRoute';

import Index from './index';
import './public/toast.js';

// return function that load component lazy
const getAssistant = () => System.import('./assistant');
const getDiscovery = () => System.import('./discovery');
const getProfile = () => System.import('./profile');

// AsyncRoute will pass (location.pathname, setComponent) to loadComponentPromise
const loadComponent = (getComponent) => {
  return (url, cb) => {
    getComponent().then(module => {
      cb && cb({
        component: module.default
      });
    });
  }
};

const _loading = (hideLoading) => {
  const loadingDom = document.querySelector('.page_init_loading');
  if (!loadingDom) return;
  if (hideLoading) {
    loadingDom.classList.add('fadeOut');
    setTimeout(_ => loadingDom.style.zIndex = -1, 360);
  } else {
    loadingDom.classList.remove('fadeOut');
    loadingDom.style.zIndex = 1;
  }
};

const hashHistory = createHashHistory();

export default class App extends Component {

  handleRoute(e) {}

  componentDidMount() {
    let _push = hashHistory.push;
    hashHistory.push = (path, state) => {
      path != hashHistory.location.pathname && _push(path, state);
    }
  }

  render() {
    return (
      <Router history={hashHistory} onChange={this.handleRoute}>
        <Index default />
        <AsyncRoute path="/my" cname="profile" component={loadComponent(getProfile)} loading={_loading} />
        <AsyncRoute path="/assistant" cname="assistant" component={loadComponent(getAssistant)} loading={_loading} />
        <AsyncRoute path="/discovery" cname="discover" component={loadComponent(getDiscovery)} loading={_loading} />
        <AsyncRoute path="/discovery/:id" cname="discover" component={loadComponent(getDiscovery)} loading={_loading} />
      </Router>
    );
  }
}

// 打包至同一文件
// import Assistant from './assistant';
// import Discovery from './discovery';
// import Profile from './profile';
// <Discovery path="/discovery" />
// <Assistant path="/assistant" />
// <Profile path="/my" />

// preload components
// setTimeout(() => {
//   loadComponent(getDiscovery)('', () => {
//     setTimeout(() => {
//       loadComponent(getProfile)()
//     }, 2000);
//   });
// }, 2000);
// loadComponent(getAssistant)();
