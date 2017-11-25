import { h, Component } from 'preact';
import { route } from 'preact-router';
import Portal from 'preact-portal';
import style from './footer.less';
import { watch, notify } from '../../lib/hookComponent.js';
import appInfo from '../../utils/app.js';


const hookSelector = '.bodyHookAnchor';
const hookDom = document.querySelector(hookSelector);

const SubMenu = ({ open }) => {
  const haddleClick = url => () => route(url);
  const portalMenu = <Portal into={hookSelector}>
    <div class={style.subMenuLayer}>
      <div class={style.innerMenu} onClick={(e) => { e.stopPropagation() }}>
        <div onClick={haddleClick('new/abc')}>1</div>
        <div onClick={haddleClick('new/bca')}>2</div>
        <div onClick={haddleClick('new/cab')}>3</div>
        <div onClick={haddleClick('new/cba')}>4</div>
      </div>
    </div>
  </Portal>
  return open ? portalMenu : null;
};

@watch(appInfo.state)
export default class Footer extends Component {

  constructor() {
    super();
    this.state = {
      showInnerMenu: false
    };
  }

  routePath(path) {
    path && route(path);
    this.setState({
      showInnerMenu: false
    });
  }

  toggleInnerMenu() {
    this.setState({
      showInnerMenu: !this.state.showInnerMenu
    });
  }

  componentDidMount() {
    hookDom.addEventListener('click', () => {
      this.setState({
        showInnerMenu: false
      });
    });
    this.base.addEventListener('touchmove', e => e.preventDefault());
  }

  render({ }, { showInnerMenu }) {
    return (
      <div class={style.footer}>
        <div onClick={this.routePath.bind(this, '/')}>Ho</div>
        <div onClick={this.routePath.bind(this, '/discovery')}>Dis</div>
        <div onClick={this.toggleInnerMenu.bind(this)}>{appInfo.state.name}</div>
        <div onClick={this.routePath.bind(this, '/assistant')}>Ass</div>
        <div onClick={this.routePath.bind(this, '/my')}>My</div>
        <SubMenu open={showInnerMenu} />
      </div>
    );
  }
}
