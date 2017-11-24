import { h } from 'preact';
import { Component } from 'react';

// const hookRender = {};
// const renderUnHookKey = `__${Math.random().toString(16).substr(2)}__`;

const dataDependOn = {};
const componentList = [];

// 用于释放 unmount 组件的渲染
class hookComponent extends Component {
    constructor() {
        super()
        // const _render = this.render;
        // const unHookIndexs = this.render[renderUnHookKey];
        // unHookIndexs && unHookIndexs.forEach(index => {
        //     hookRender[index].forEach((_render, _index) => {
        //         _render == this.render && (console.log('matched'), 1) && hookRender[index].splice(_index, 1, [this.render.bind(this)])
        //     });
        // });
    }
    componentWillUnmount() {
        // const unHookIndexs = this.render[renderUnHookKey];
        // unHookIndexs && unHookIndexs.forEach(index => {
        //     hookRender[index].forEach((_render, _index) => {
        //         _render == this.render && hookRender[index].splice(_index, 1)
        //     });
        // });
        // delete this.render[renderUnHookKey];
    }
}

// 标记某个组件与那个变量绑定了
function watch(bindData) {
    // 观察数据列表
    hookDataList.indexOf(bindData) === -1 && hookDataList.push(bindData);
    const hookIndex = hookDataList.indexOf(bindData);
    // 修改render函数
    return (target) => {
        componentList.indexOf(target) == -1 && componentList.push(target);
        hookComponents[hookIndex] = hookComponents[hookIndex] = [];

        console.log(bindData, target.name)

        // configOption.value = function() {
        //     console.log('renderd')
        //     _render();
        // }
        // if (!_render || typeof _render !== 'function') return;
        // const dataHooks = hookRender[hookIndex] = hookRender[hookIndex] || [];
        // dataHooks.indexOf(_render) === -1 && dataHooks.push(_render);
        // _render[renderUnHookKey] = _render[renderUnHookKey] || [];
        // _render[renderUnHookKey].indexOf(hookIndex) == -1 && _render[renderUnHookKey].push(hookIndex);
    }
}

// 通知绑定对应变量的组件更新
function notify(bindData, updaterFn) {
    return;
    updaterFn();
    let bindDataIndex = hookDataList.indexOf(bindData);
    const renders = hookRender[bindDataIndex];
    renders && renders.forEach(_render => _render());
}

export {
    watch,
    notify,
    hookComponent
}