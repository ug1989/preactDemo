import { h, Component, render } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';
import { touchScroll } from '../../utils/touchScroll.js'
import { get, post } from '../../utils/http.js';

export default class Home extends Component {

  constructor() {
    super();
    this.refs = {};
  }

  componentDidMount() {
    const container = document.querySelector(`.${style.home}`);
    container.classList.add('limitTouchScroll');
    touchScroll(container);

    get(0 ? 'http://127.0.0.1:8080/api-front/session/create?device=web&version=1.0.0&sessionId=' : '/api-502').then((json) => {
    	// console.log(json);
    });
    post('/api-front/session/create?device=web&version=1.0.0&sessionId=', {}).then((json) => {
    	// console.log(json);
    });
  }

  render() {
    const res = [];
    let index = this.state.count || 1;
    while (--index) {
			((_index) => {
				res.push(<div class={style.cycle} ref={(_this) => {
					this.refs[_index + ''] = _this;
				}}>{index}</div>);
			})(index)
    }
    return (
      <Layout paddingApp={true}>
				<Header paddingApp={true} title="COMM"></Header>
				<div class={style.home}>
					<div>{res.reverse().map((item) => item)}</div>
				</div>
				<Footer></Footer>
			</Layout>
      );
  }
}
