import { h, Component, render } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';

import { watch, notify } from '../../lib/hookComponent.js';
import { get, post } from '../../utils/http.js';
import appInfo from '../../utils/app.js';

let pullLimitH = -10000;

export default class Home extends Component {

  constructor() {
    super();
    this.refs = {};
    this.state = {
      showLoading: false
    }
  }

  componentDidMount() {
    pullLimitH = parseInt(getComputedStyle(this.refs.header.base).height);
    this.initData();
  }

  pullLoading(touchMoveY) {
    if (!this.refs.refreshDom || this.state.onLoading)
      return;
    const limitY = pullLimitH * 1.2;
    const vectorY = touchMoveY - this.refs.home.scrollTop;
    const overLimit = this.pullLoading.lastVectorY == limitY;
    const showLoadingState = {
      showLoading: true,
      onLoading: true,
      loadingTop: limitY
    };
    const hideLoadingState = {
      showLoading: false,
      onLoading: false,
      loadingTop: -limitY
    };
    // touchend
    if (touchMoveY === null) {
      overLimit && this.setState(showLoadingState);
      overLimit ? this.initData(() => {
        this.setState(hideLoadingState);
      }) : this.setState(hideLoadingState);
      return;
    }
    // scale touchmove in 1/3
    const scaleY = vectorY / 3;
    notify(appInfo.share, () => {
      appInfo.share.title = scaleY;
    });
    this.pullLoading.lastVectorY = scaleY > limitY ? limitY : scaleY;
    this.setState({
      showLoading: true,
      onLoading: false,
      loadingTop: this.pullLoading.lastVectorY
    });
  }

  initData(callback) {
    get('http://bala.so/wxapp/freeGame').then((res) => {
      console.log(res);
      post('/api-front/session/create?device=web&version=1.0.0&sessionId=', {}, 'text').then((res) => {
        console.log(res);
        callback && callback();
      });
    });
  }

  render({ }, { showLoading, onLoading, loadingTop }) {
    const res = [];
    let index = this.state.count || 12;
    while (--index) {
      ((_index) => {
        res.push(<div class={style.cycle} ref={(_this) => {
          this.refs[_index + ''] = _this;
        }}></div>);
      })(index)
    }

    const loadingStyleContainer = {
      top: loadingTop,
      zIndex: showLoading ? 1 : -1
    };

    const loadingStyleInner = {
      transform: `rotate(${onLoading ? 10000 : (loadingTop / pullLimitH * 360 * 3)}deg)`,
      'transition-duration': onLoading ? '10s' : '0s',
      opacity: loadingTop / pullLimitH - 0.2
    };

    return (
      <Layout paddingApp={true}>
        <Header paddingApp={true} title="COMM" ref={_dom => this.refs.header = _dom}></Header>
        <div style={loadingStyleContainer} class={style.refresh} ref={_dom => this.refs.refreshDom = _dom}>
          <div class={style.inner} style={loadingStyleInner}>❅</div>
        </div>
        <div class={style.home + ' touch_scroll'} ref={_dom => this.refs.home = _dom}>
            {res.reverse().map((item) => item)}
        </div>
        <Footer></Footer>
      </Layout>
    );
  }
}
