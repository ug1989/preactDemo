import { h, Component } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';

import G from '!url-loader!../index/images/bg.jpg'

import { get, post } from '../../utils/http.js';
import appInfo from '../../utils/app.js';

export default class Home extends Component {

  componentDidMount() {}

  render() {
    return (
      <Layout paddingApp={!true}>
        <Header paddingApp={!true} title="DISC" backUrl="/"></Header>
        <div class={style.body + ' touch_scroll'}>
          <img src={G} alt=""/>
          <img src={G} alt=""/>
          <img src={G} alt=""/>
          <img src={G} alt=""/>
          <img src={G} alt=""/>
          <img src={G} alt=""/>
          <img src={G} alt=""/>
        </div>
        <Footer></Footer>
      </Layout>
      );
  }
}
