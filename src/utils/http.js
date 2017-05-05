let _tipTime = 0;

const _fetch = (url, options) => {

  const reqTimeoutHash = (+new Date) + '' + Math.random();
  const netWeakWait = 10 * 1000; // 超时等待时间

  _fetch[reqTimeoutHash] = 1;

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
		return res.text().then((resText) => {
			let jsonRes;
			let resError = false;
			const failRes = {
				status: 'ERROR',
				message: 'Response Error'
			};
			try {
				jsonRes = JSON.parse(resText);
				// 设定后台返回 status 只会是 'OK' or 'ERROR'
				resError = typeof jsonRes.status == 'number';
				failRes.message += resError && ': http status code ' || '';
			} catch(e) {
				resError = true;
				failRes.message += ': not json type';
			}
			return resError ? failRes : jsonRes;
		});
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
