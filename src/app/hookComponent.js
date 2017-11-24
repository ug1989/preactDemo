import {h, Component} from 'preact';

const decoratorClassList = [];  // class constructor list
const classWatchedData = {};    // data class care

const dataWatched = [];         // all data watched
const componentsDataCare = {};  // components data care

// 用于释放 unmount 组件的渲染
class hookComponent extends Component {
    constructor() {
        super()
        const start = +new Date;
        const clasIndex = decoratorClassList.indexOf(this.constructor);
        if (clasIndex == -1) return;
        classWatchedData[clasIndex].forEach(dataClassCare => {
            const dataIndex = dataWatched.indexOf(dataClassCare);
            if (dataIndex == -1) return;
            (componentsDataCare[dataIndex] = componentsDataCare[dataIndex] || []).push(this);
            console.log(componentsDataCare[dataIndex].length);
        });
    }
    componentWillUnmount() {
        const start = +new Date;
        const clasIndex = decoratorClassList.indexOf(this.constructor);
        if (clasIndex == -1) return;
        classWatchedData[clasIndex].forEach(dataClassCare => {
            const dataIndex = dataWatched.indexOf(dataClassCare);
            if (dataIndex == -1) return;
            const componentsList = componentsDataCare[dataIndex];
            const thisIndex = componentsList.indexOf(this);
            if (thisIndex == -1) return;
            componentsList.splice(thisIndex, 1);
            console.log(componentsList.length);
        });
    }
}

// 标记某个组件与那个变量绑定了
function watch(bindData) {
    dataWatched.indexOf(bindData) == -1 && dataWatched.push(bindData);
    return (classFn) => {
        decoratorClassList.indexOf(classFn) == -1 && decoratorClassList.push(classFn);
        const classFnIndex = decoratorClassList.indexOf(classFn);
        const classFnData = classWatchedData[classFnIndex] = classWatchedData[classFnIndex] || [];
        classFnData.indexOf(bindData) == -1 && classFnData.push(bindData);
    }
}

// 通知绑定对应变量的组件更新
function notify(bindData, updaterFn) {
    updaterFn();
    let bindDataIndex = dataWatched.indexOf(bindData);
    const _hooks = componentsDataCare[bindDataIndex];
    _hooks && _hooks.forEach(_this => {
        _this.forceUpdate();
    });
}

export {watch, notify, hookComponent}
