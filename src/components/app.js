import { h, Component } from 'preact';
import { Router } from 'preact-router';
import AsyncRoute from 'preact-async-route';

import Home from './home';
import Header from './header';

const loadComponent = (url, cb) => {
	System.import('./profile').then(module => {
		cb && cb({component: module.default});
	});
}

const appContainerStyle = {
	width: '100%',
	height: '100%',
	overflow: 'hidden'
};

export default class App extends Component {
	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	}

	componentDidMount() {
		setTimeout(() => {
			// loadComponent('/profile');
		}, 2000);
	}

	render() {
		return (
			<div id="app" style={appContainerStyle}>
				<Header />
				<Router hashHistory={true} onChange={false && this.handleRoute}>
					<Home path="/" />
					<AsyncRoute path="/profile/" component={loadComponent} user="me" />
					<AsyncRoute path="/profile/:user" component={loadComponent} loading={() => {
						return (<div style={{paddingTop: "4rem"}}>Loading ....</div>);
					}} />
				</Router>
			</div>
		);
	}
}
