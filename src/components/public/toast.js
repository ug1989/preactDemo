import style from './toast.less';

window.toast = function toast(msg, showTime) {
  if (!msg) return;

  const _bodyWidth = document.body.clientWidth;
  const _baseFontSize = parseFloat(document.documentElement.style.fontSize) || 20;
  const _limitW = _bodyWidth - 2 * _baseFontSize;
  const _dom = document.createElement('div');
  const _span = document.createElement('span');

  _span.style.display = 'inline-block';
  _span.style.wordWrap = 'break-word';
  _span.style.maxWidth = _limitW + 'px';
  _span.innerText = '' + msg;

  document.body.appendChild(_span);
  const _inner_ = getComputedStyle(_span);
  const _innerW = parseInt(_inner_.width);
  const _innerH = parseInt(_inner_.height);

  const _width = (_innerW > _limitW ? _limitW : _innerW) + 2;

  _span.style.width = _width + 'px';
  _span.style.height = _innerH + 'px';

  _dom.classList.add(style.toast);
  _dom.appendChild(_span);
  document.body.appendChild(_dom);

  setTimeout(() => {
    _dom.parentElement.removeChild(_dom);
  }, showTime || 1800);
}
