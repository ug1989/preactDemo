/* * *
 * 全局共享变量: appData
 * setInfo: 默认记录在内存中，第三个参数为真时存储到 localStorage
* * */

const appData = {};
const _lsEnable = localStorage && localStorage.getItem;

// init cached data from localStorage
if (_lsEnable) {
  for (let key in localStorage) {
    appData[key] = JSON.parse(localStorage.getItem(key));
  }
}

export function setInfo(key, value) {
  let strValue;
  if (_lsEnable) {
    strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
  }
  appData[key] = strValue ? JSON.parse(strValue) : value;
  return appData[key];
}

export function getInfo(key) {
  return appData[key];
}

export function clearInfo(key) {
  _lsEnable && localStorage.removeItem(key);
  delete appData[key];
}
