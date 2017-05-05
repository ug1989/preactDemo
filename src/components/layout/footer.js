import { h, Component } from 'preact';
import { route } from 'preact-router';
import Portal from 'preact-portal';
import style from './footer.less';

const hookSelector = '.bodyHookAnchor';
const hookDom = document.querySelector(hookSelector);

const SubMenu = ({open}) => {
  hookDom.style.zIndex = (open ? 1 : -1);
  return open && <Portal into={hookSelector}>
		<div class={style.innerMenu} onClick={(e) => {e.stopPropagation()}}>
			<div>1</div>
			<div>2</div>
			<div>3</div>
			<div>4</div>
		</div>
	</Portal> || null;
};


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

  render({}, {showInnerMenu}) {
    return (
      <div class={style.footer}>
				<div onClick={this.routePath.bind(this, '/')}>Ho</div>
				<div onClick={this.routePath.bind(this, '/discovery')}>Dis</div>
				<div onClick={this.toggleInnerMenu.bind(this)}>+</div>
				<div onClick={this.routePath.bind(this, '/assistant')}>Ass</div>
				<div onClick={this.routePath.bind(this, '/my')}>My</div>
				<SubMenu open={showInnerMenu}/>
			</div>
      );
  }
}
