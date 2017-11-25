import { h, Component } from 'preact';
import { hookComponent, watch, notify } from './hookComponent.js';
import shareArr from './shareA.js';
import shareObj from './shareB.js';

let i = 0;

@watch(shareObj)
@watch(shareArr)
export default class Two extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      notify(shareObj, () => {
        shareObj.name = Math.random().toString(16).substr(4, 6) + (++i + 3);
      });
    }, 1300);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    super.componentWillUnmount();
  }

  render(props) {
    return (
      <div>
        <h2>{props.title}</h2>
        <p>{`${shareArr.length} ${shareObj.name} ${props.index}`}</p>
      </div>
    );
  }
}

