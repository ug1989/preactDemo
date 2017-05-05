import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import AsyncRoute from '../lib/asyncRoute';

import Community from './community';

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
}

export default class App extends Component {

  handleRoute(e) {}

  componentDidMount() {
		// preload components
    // setTimeout(() => {
    //   loadComponent(getDiscovery)('', () => {
    //     setTimeout(() => {
    //       loadComponent(getProfile)()
    //     }, 2000);
    //   });
    // }, 2000);
    // loadComponent(getAssistant)();
  }

  render() {
    return (
      <Router hashHistory={true} onChange={this.handleRoute}>
				<Community path="/"/>
				<AsyncRoute path="/my" cname="profile" component={loadComponent(getProfile)}/>
				<AsyncRoute path="/discovery" cname="discover" component={loadComponent(getDiscovery)}/>
				<AsyncRoute path="/assistant" cname="assistant" component={loadComponent(getAssistant)}/>
				<AsyncRoute path="/discovery/:id" cname="discover" component={loadComponent(getDiscovery)}/>
			</Router>
      );
  }
}

