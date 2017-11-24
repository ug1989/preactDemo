import { h } from 'preact';
import { hookComponent, watch, notify } from './hookComponent.js';
import shareArr from './shareA.js';
import shareObj from './shareB.js';

@watch(shareObj)
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
    }, 5000);
  }

  // @watch(shareArr)
  render() {
    console.log('render Two');
    return (
      <div>
        {/* <h2>{this.props && this.props.title}</h2> */}
        <p>{`${shareArr.push(shareArr.length)} --- ${shareObj.name}`}</p>
      </div>
    );
  }
}

