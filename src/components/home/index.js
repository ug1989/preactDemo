import { h, Component } from 'preact';
import style from './style.less';

export default class Home extends Component {

  componentDidMount() {}

  render() {
    return (
      <div class={style.home}>
				<input type="text" placeholder="touch me"/>
				<div class={style.cycle}></div>
			</div>
      );
  }
}
