import { h } from 'preact';
import { hookComponent, watch, notify } from './hookComponent.js';
import shareArr from './shareA.js';
import shareObj from './shareB.js';

let i = 0;

@watch(shareObj)
@watch(shareArr)
export default class Two extends hookComponent {
  componentDidMount() {
    this.timer = setInterval(() => {
      notify(shareObj, () => {
        shareObj.name = 'test' + ++i;
      });
    }, 1300);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render(props) {
    return (
      <div>
        <h2>{props.title}</h2>
        <p>{`${shareArr.length} --- ${shareObj.name}`}</p>
      </div>
    );
  }
}

