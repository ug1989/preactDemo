import { h, Component } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';
import { touchScroll } from '../utils/limitTouch.js'


export default class Home extends Component {

  componentDidMount() {
		const container = document.querySelector(`.${style.home}`);
		container.classList.add('limitTouchScroll');
		touchScroll(container);
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
