import { h, Component } from 'preact';
import appInfo from '../../utils/app.js';
import { watch, notify } from '../../lib/hookComponent.js';

export default class T extends Component {

  constructor() {
    super();
  }

  componentDidMount() {
    this.setAppInfoData();
  }

  setAppInfoData() {
    appInfo.badMsg = Math.random();
    notify(appInfo);
    this.timer = setTimeout(this.setAppInfoData.bind(this));
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return (
        <p>{appInfo.badMsg}</p>
      );
  }
}
