import { h, Component } from 'preact';
import { route } from 'preact-router';
import style from './footer.less';

const haddleNav = (e) => {
  const navHref = e.target.getAttribute('to');
  navHref ? route(navHref) : location.reload();
};

export default class Footer extends Component {

  componentDidMount() {
    this.base.addEventListener('touchmove', e => e.preventDefault());
  }

  render() {
    return (
      <div class={style.footer} onClick={haddleNav}>
				<div to="/">Ho</div>
				<div to="/discovery">Dis</div>
				<div>+</div>
				<div to="/assistant">Ass</div>
				<div to="/my">My</div>
			</div>
      );
  }
}
