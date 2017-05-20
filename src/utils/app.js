import { getInfo, setInfo, clearInfo } from './base.js';
import paths from './path.js';

const getPathExtro = () => {
  return {
    sessionId: getInfo('sessionId') || ''
  }
};

const _extendPath = () => {
  const _extro = [];
  const obj = getPathExtro();
  for (let key in obj) {
    _extro.push(key + '=' + obj[key]);
  }
  const extorStr = _extro.join('&');
  for (let key in paths) {
    let _path = paths[key].replace(_extendPath.extorStr, '');
    let _query = _path.indexOf('?') != -1;
    paths[key] = _path + (_query ? '&' : '?') + extorStr;
  }
  _extendPath.extorStr = extorStr;
};

const injectSet = (key, value) => {
  setInfo(key, value);
  key == 'sessionId' && _extendPath();
};

_extendPath(); //  根据 localStorage 初始化 apiPath 参数

const appInfo = {
  apiPath: paths,
  getInfo: getInfo,
  setInfo: injectSet,
  clearInfo: clearInfo
};

export default appInfo
