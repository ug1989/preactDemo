import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './header.less';

export default class Header extends Component {

  componentDidMount() {
		const {backUrl} = this.props;
		const backDom = this.base.querySelector(`.${style.back}`);
		backDom.style.display = backUrl ? 'block' : 'none';
		backDom.addEventListener('click', (e) => backUrl && route(backUrl));
    this.base.addEventListener('touchmove', e => e.preventDefault());
  }

  render({paddingApp, title, backUrl}) {

    const headerClass = [
      style.header,
      paddingApp && style.paddingApp || ''
    ].join(' ');

    return (
      <div class={headerClass}>
				<div class={style.back}></div>
				{title}
			</div>
      );
  }
}
