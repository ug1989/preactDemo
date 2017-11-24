import { h } from 'preact';
import { hookComponent, watch, notify } from './hookComponent.js';
import shareArr from './shareA.js';
import shareObj from './shareB.js';

@watch(shareObj)
@watch(shareArr)
export default class Two extends hookComponent {

  constructor() {
    super();
    this.aa = 321;
  }

  componentDidMount() {
    setInterval(() => {
      notify(shareObj, () => {
        shareObj.name = 'test' + Math.random().toString(16).substr(8);
      });
    }, 3000);
  }

  render(props) {
    // console.log('render Two');
    return (
      <div>
        <h2>{props.title}</h2>
        <p>{`${shareArr.push(shareArr.length)} --- ${shareObj.name}`}</p>
      </div>
    );
  }
}

