// 整体应用入口
import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import { createHashHistory } from 'history';
import AsyncRoute, {loadComponent} from '../lib/asyncRoute';
import {touchScroll} from '../lib/touchScroll';

import Index from './index';
import Assistant from './assistant';
import Discovery from './discovery';
import './public/toast.js';

// System.import return function can load component when execute
const getProfile = () => System.import('./profile');
getProfile.cname = 'profile';


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
    };

    // optimize touchscroll
    touchScroll(true);

    // preload Components
    // loadComponent(getProfile)();
  }

  render() {
    return (
      <Router history={hashHistory} onChange={this.handleRoute}>
        <Index default />
        <Discovery path="/discovery" />
        <Assistant path="/assistant" />
        <AsyncRoute path="/my" cname="profile" component={loadComponent(getProfile)} loading={_loading} />
      </Router>
    );
  }
}
