import { getInfo, setInfo, clearInfo } from './base.js';
import paths from './apiPath.js';

const extendPath = () => {
  const sessionId = getInfo('session') && getInfo('session').result || '';
  const extroStr = [`sessionId=${sessionId}`, 'device=web', 'version=1.0.0'].join('&');
  for (let key in paths) {
    paths[key] = extendPath.extroStr ? paths[key].replace(extendPath.extroStr, extroStr) : paths[key] + '?' + extroStr
  }
  extendPath.extroStr = extroStr;
};

const _setInfo = (key, value) => {
  setInfo(key, value);
  key == 'session' && extendPath();
};

const appInfo = {
  apiPath: paths,
  getInfo: getInfo,
  setInfo: _setInfo,
  clearInfo: clearInfo
};

extendPath(); // 根据本地 session 初始化 apiPath 参数

export default appInfo
