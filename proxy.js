export function reqProxy(req, res, option) {

  const delay = (1 + Math.random) * 5000;
  const matchReq = req.url.split('?')[0];

  const resObjs = {
    '/api-front/session/create': {
      data: 'haha, ...'
    },
    '/api-502': {
      time: +new Date,
      status: 'OK',
      result: {
        data: [1, 2, 3, 4, 5],
      }
    }
  };

  const resJson = resObjs[matchReq];

  if (!resJson) {
    return '/index/html';
  }

  setTimeout(() => {
    res.json(resJson);
  }, delay);
}
