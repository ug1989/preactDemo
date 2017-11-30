import { h, Component } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';
import appInfo from '../../utils/app.js';

import T from '../testC/index.js';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      num: 100
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        num: 60 + Math.floor(Math.random() * 60)
      });
    }, 3000);
  }

  render() {
    return (
      <Layout paddingApp={!true}>
				<Header paddingApp={!true}></Header>
				<div class={style.profile + ' touch_scroll'}>
					<h1>Profile</h1>
					<p>This is the user profile for a user named.</p>
          <div>Profile route mounted times.</div>
          <T />
				</div>
				<Footer></Footer>
			</Layout>
      );
  }
}
