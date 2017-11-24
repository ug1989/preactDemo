import { h, Component } from 'preact';
import One from './One.js';
import Two from './Two.js';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      showTwoNum: 0
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        showTwoNum: (this.state.showTwoNum % 4) + 1
      });
    }, 900);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    let showTwoNum = this.state.showTwoNum || 1;
    const Twos = [];
    while(showTwoNum--) {
      let _title = "SHAME".substr(showTwoNum);
      Twos.push(<Two key={_title} title={_title} />);
    }
    return (
				<div>
					<h1>TEST</h1>
          <One />
          {Twos}
				</div>
      );
  }
}
