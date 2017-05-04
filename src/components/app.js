import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import AsyncRoute from 'preact-async-route';

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

  handleRoute (e) {
  }

  componentDidMount() {
    setTimeout(() => {
      loadComponent(getDiscovery)('', () => {
    		setTimeout(() => {
					loadComponent(getProfile)()
    		}, 2000);
			});
    }, 2000);
		loadComponent(getAssistant)();
  }

  render() {
    return (
			<Router hashHistory={true} onChange={this.handleRoute}>
				<Community path="/"/>
				<AsyncRoute path="/discovery" component={loadComponent(getDiscovery)}/>
				<AsyncRoute path="/assistant" component={loadComponent(getAssistant)}/>
				<AsyncRoute path="/my" component={loadComponent(getProfile)}/>
			</Router>
      );
  }
}
