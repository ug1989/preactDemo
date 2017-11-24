import {h, Component} from 'preact';

const componentList = [];
const componentData = {};

const dataDependsOn = [];
const dataHooks = {};

// 用于释放 unmount 组件的渲染
class hookComponent extends Component {
    constructor() {
        super()
        const _classIndex = componentList.indexOf(this.constructor);
        _classIndex != -1 && componentData[_classIndex].forEach((dataDepend, index) => {
            const dataDependIndex = dataDependsOn.indexOf(dataDepend);
            if (dataDependIndex == -1) return;
            const _hooks = dataHooks[dataDependIndex] = dataHooks[dataDependIndex] || [];
            _hooks.push(this);
        });
    }
    componentWillUnmount() {

    }
}

// 标记某个组件与那个变量绑定了
function watch(bindData) {
    // 依赖数据数组
    dataDependsOn.indexOf(bindData) == -1 && dataDependsOn.push(bindData);
    return (classFn) => {
        // 收集组件 class 
        componentList.indexOf(classFn) == -1 && componentList.push(classFn);
        const classFnIndex = componentList.indexOf(classFn);
        const classFnData = componentData[classFnIndex] = componentData[classFnIndex] || [];
        classFnData.indexOf(bindData) == -1 && classFnData.push(bindData);
    }
}

// 通知绑定对应变量的组件更新
function notify(bindData, updaterFn) {
    updaterFn();
    let bindDataIndex = dataDependsOn.indexOf(bindData);
    const renders = dataHooks[bindDataIndex];
    renders && renders.forEach(_render => {
        console.log('notify render', _render.setState({}));
        _render.constructor.prototype.render.call(_render, _render.props)
        
    });
}

export {watch, notify, hookComponent}
