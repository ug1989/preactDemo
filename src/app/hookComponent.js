import {h, Component} from 'preact';

const decoratorClassList = [];  // class constructor list
const classWatchedData = {};    // data class care

const dataWatched = [];         // all data watched
const componentsDataCare = {};  // components data care

// 纪录依赖自身state之外需要更新的组件
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
        });
    }
}

// 标记组件构造器与依赖变量的关系，方便 hookComponent 安排依赖组建位置
function watch(bindData) {
    dataWatched.indexOf(bindData) == -1 && dataWatched.push(bindData);
    return (classFn) => {
        decoratorClassList.indexOf(classFn) == -1 && decoratorClassList.push(classFn);
        const classFnIndex = decoratorClassList.indexOf(classFn);
        const classFnData = classWatchedData[classFnIndex] = classWatchedData[classFnIndex] || [];
        classFnData.indexOf(bindData) == -1 && classFnData.push(bindData);
    }
}

// 通知变量更新，同步更新组件
function notify(bindData, updaterFn) {
    updaterFn();
    const dataIndex = dataWatched.indexOf(bindData);
    if (dataIndex == -1) return;
    const componentsList = componentsDataCare[dataIndex];
    (componentsList || []).forEach(component => {
        component.forceUpdate();
    });
}

export {watch, notify, hookComponent}
