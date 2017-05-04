import { h, Component } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';
import { touchScroll } from '../../utils/limitTouch.js'
import {get, post} from '../../utils/http.js';

export default class Home extends Component {

  componentDidMount() {
		const container = document.querySelector(`.${style.home}`);
		container.classList.add('limitTouchScroll');
		touchScroll(container);
		get('/api-front/session/get-user-info?device=web&version=1.0.0&sessionId=64077edb-1f4b-4eb4-a2bd-2491a81cf944').then((json) => {
			console.log(json);
		});
		post('/api-front/session/create?device=web&version=1.0.0&sessionId=', {}).then((res) => {
			console.log(res);
		});
	}

  render() {
    return (
			<Layout paddingApp={true}>
				<Header paddingApp={true} title="COMM"></Header>
				<div class={style.home}>
					<div class={style.cycle}></div>
					<div class={style.cycle}></div>
					<div class={style.cycle}></div>
					<div class={style.cycle}></div>
					<div class={style.cycle}></div>
					<div class={style.cycle}></div>
					<div class={style.cycle}></div>
					<div class={style.cycle}></div>
				</div>
				<Footer></Footer>
			</Layout>
      );
  }
}
