import { h, Component } from 'preact';
import { hookComponent, watch, notify } from './hookComponent.js';
import shareArr from './shareA.js';
import shareObj from './shareB.js';

@watch(shareObj)
@watch(shareArr)
export default class One extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      notify(shareArr, () => {
        shareArr.push(Math.random());
      });
    }, 1700);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <h2>One Here</h2>
        <p>{shareArr.length + ' ' + shareObj.name}</p>
      </div>
    );
  }
}
