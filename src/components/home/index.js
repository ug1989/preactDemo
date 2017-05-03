import { h, Component } from 'preact';
import style from './style.less';

export default class Home extends Component {

	componentDidMount() {
		console.log(style);
	}

	render() {
		return (
			<div class={style.home}>
				<div className={style.class}>
					Let me see .
				</div>
				<div class={style.cycle}></div>
			</div>
		);
	}
}
