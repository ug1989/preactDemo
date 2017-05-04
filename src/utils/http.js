let _tipTime = 0;

const _fetch = (url, options) => {
  _fetch[reqTimeoutHash] = 1;

  const reqTimeoutHash = (+new Date) + '' + Math.random();
  const netWeakWait = 10 * 1000; // 超时等待时间

  // 超时提醒，提醒间隔为超时等待时间, POST 等待时间为GET请求的两倍
  setTimeout(() => {
    const nowTime = +new Date;
    if (!_fetch[reqTimeoutHash]) return;
    (nowTime - _tipTime > netWeakWait) && alert('您的网络似乎有点问题');
    delete _fetch[reqTimeoutHash];
    _tipTime = nowTime - _tipTime > netWeakWait ? nowTime : _tipTime;
  }, netWeakWait * (options.method == 'POST' ? 2 : 1));

  return fetch(url, options).then(function(res) {
    delete _fetch[reqTimeoutHash];
    return res;
  }).then((res) => {
		return res.json();
	})
}

export function get(url) {
  return _fetch(url, {
    method: 'GET'
  });
}

export function post(url, data, noForm) {
  data = data || {};
  const formData = new FormData();
  if (!noForm) {
    for (const key in data) {
      formData.append(key, data[key]);
    }
  }
  return _fetch(url, {
    method: 'POST',
    body: noForm && JSON.stringify(data) || formData
  });
}
