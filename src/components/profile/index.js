import { h, Component } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';
import appInfo from '../../utils/app.js';

export default class Home extends Component {

  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <Layout paddingApp={!true}>
				<Header paddingApp={!true}></Header>
				<div class={style.profile}>
					<h1>Profile</h1>
					<p>This is the user profile for a user named.</p>
					<div>Profile route mounted times.</div>
				</div>
				<Footer></Footer>
			</Layout>
      );
  }
}
