import { h, Component } from 'preact';
import style from './index.less';

export default class Layout extends Component {

	shouldComponentUpdate() {
		return false;
	}

  render({paddingApp, hideHeader, hideFooter, children}) {

    const layoutClass = [
      style.layout,
      !hideHeader && style.paddingTop || '',
      !hideFooter && style.paddingBottom || '',
      paddingApp && (hideHeader ? style.paddingApp : style.paddingAppHeader) || ''
    ].join(' ');

		console.log(layoutClass);

    return (
      <div class={layoutClass}>
				{children}
				<div class={style.hookAnchor + ' layoutHookAnchor'}></div>
			</div>
      );
  }
}
