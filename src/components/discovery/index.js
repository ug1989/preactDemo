import { h, Component } from 'preact';
import Layout from '../layout/index.js';
import Header from '../layout/header.js';
import Footer from '../layout/footer.js';
import style from './style.less';

export default class Home extends Component {

  componentDidMount() { }

  render() {
    return (
      <Layout paddingApp={!true}>
        <Header paddingApp={!true} title="DISC" backUrl="/"></Header>
        <div>DDSSCC</div>
        <Footer></Footer>
      </Layout>
    );
  }
}
