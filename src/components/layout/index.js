import { h, Component } from 'preact';
import style from './index.less';
import { notify } from '../../lib/hookComponent.js';
import appInfo from '../../utils/app.js';

let index = 1;

export default class Layout extends Component {

  addIndex() {
    appInfo.index = index++;
    notify(appInfo);
  }

  render({ paddingApp, hideHeader, hideFooter, children }) {

    const layoutClass = [
      style.layout,
      !hideHeader && style.paddingTop || '',
      !hideFooter && style.paddingBottom || '',
      paddingApp && (hideHeader ? style.paddingApp : style.paddingAppHeader) || ''
    ].join(' ');

    return (
      <div class={layoutClass} onClick={this.addIndex}>
        {children}
      </div>
    );
  }
}
