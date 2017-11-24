import { h } from 'preact';
import { hookComponent, watch, notify } from './hookComponent.js';
import shareArr from './shareA.js';
import shareObj from './shareB.js';

export default class One extends hookComponent {

  constructor() {
    super();
    this.aa = 123;
  }

  componentDidMount() {
    setInterval(() => {
      notify(shareArr, () => {
        shareArr.push(Math.random());
      });
    }, 2000);
  }

  // @watch(shareArr)
  // @watch(shareObj)
  render() {
    console.log('render One');
    return (
      <div>
        <h2>One Here</h2>
        <p>{shareArr.length + ' ' + shareObj.name}</p>
      </div>
    );
  }
}
