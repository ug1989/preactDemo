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
    }, 3400);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    let showTwoNum = this.state.showTwoNum || 5;
    const Twos = [];
    while(showTwoNum--) {
      let _title = "SHAME".substr(showTwoNum);
      Twos.push(<Two key={_title} title={_title} index={showTwoNum} />);
    }
    return (
				<div>
          <One />
          {Twos}
				</div>
      );
  }
}
