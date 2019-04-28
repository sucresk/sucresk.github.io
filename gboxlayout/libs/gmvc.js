var gmvc;
(function (gmvc) {
    class BaseObject {
        constructor() {
            this.id = BaseObject._hashCode++;
        }
        static toString() {
            throw new Error();
        }
        static getInstance(clazz) {
            const classType = String(clazz);
            let instance = BaseObject.instances[classType];
            if (!instance) {
                instance = BaseObject.instances[classType] = BaseObject.create(clazz);
            }
            return instance;
        }
        static create(clazz) {
            const pool = BaseObject.poolsMap[String(clazz)];
            if (pool && pool.length > 0) {
                const object = pool.pop();
                return object;
            }
            const object = new clazz();
            object._onClear();
            return object;
        }
        static setMaxCount(clazz, maxCount) {
            if (maxCount < 0 || maxCount !== maxCount) {
                maxCount = 0;
            }
            if (clazz) {
                const classType = String(clazz);
                BaseObject.maxCountMap[classType] = maxCount;
                const pool = BaseObject.poolsMap[classType];
                if (pool && pool.length > maxCount) {
                    pool.length = maxCount;
                }
            }
            else {
                BaseObject.defaultMaxCount = maxCount;
                for (let classType in BaseObject.poolsMap) {
                    if (!BaseObject.maxCountMap[classType]) {
                        continue;
                    }
                    BaseObject.maxCountMap[classType] = maxCount;
                    const pool = BaseObject.poolsMap[classType];
                    if (pool.length > maxCount) {
                        pool.length = maxCount;
                    }
                }
            }
        }
        static clearPool(clazz) {
            if (clazz) {
                const pool = BaseObject.poolsMap[String(clazz)];
                if (pool && pool.length) {
                    pool.length = 0;
                }
            }
            else {
                for (let k in BaseObject.poolsMap) {
                    const pool = BaseObject.poolsMap[k];
                    pool.length = 0;
                }
            }
        }
        static _returnToPool(object) {
            const classType = String(object.constructor);
            const maxCount = classType in BaseObject.maxCountMap ? BaseObject.defaultMaxCount : BaseObject.maxCountMap[classType];
            const pool = BaseObject.poolsMap[classType] = BaseObject.poolsMap[classType] || [];
            if (pool.length < maxCount) {
                console.assert(pool.indexOf(object) < 0);
                pool.push(object);
            }
        }
        returnToPool() {
            this._onClear();
            BaseObject._returnToPool(this);
        }
        dispose() {
            this._onClear();
        }
    }
    BaseObject.defaultMaxCount = 5000;
    BaseObject.instances = {};
    BaseObject.maxCountMap = {};
    BaseObject.poolsMap = {};
    BaseObject._hashCode = 0;
    gmvc.BaseObject = BaseObject;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class Event extends gmvc.BaseObject {
        constructor() {
            super(...arguments);
            this.type = "";
            this.data = null;
        }
        static toString() {
            return "[class Event]";
        }
        _onClear() {
            this.type = "";
            this.data = null;
        }
        toString() {
            return "[object Event Type " + this.type + " Data " + this.data + "]";
        }
        copyFrom(value) {
            this.type = value.type;
            this.data = value.data;
            this.target = value.target;
            return this;
        }
    }
    gmvc.Event = Event;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class EventDispatcher extends gmvc.BaseObject {
        constructor() {
            super();
            this._dipatchLevel = 0;
            this._listenerBins = {};
        }
        static toString() {
            return "[class EventDispatcher]";
        }
        _onClear() {
            for (let i in this._listenerBins) {
                delete this._listenerBins[i];
            }
            this._dipatchLevel = 0;
        }
        _isSameListener(a, b) {
            return a === b;
        }
        hasEventListener(type) {
            if (this._listenerBins[type]) {
                return type in this._listenerBins[type];
            }
            return false;
        }
        addEventListener(type, listener, thisTarget, data = null, priority = 0) {
            this.removeEventListener(type, listener);
            let listenerBins = this._listenerBins[type];
            if (listenerBins) {
                if (this._dipatchLevel !== 0) {
                    this._listenerBins[type] = listenerBins = listenerBins.concat();
                }
            }
            else {
                this._listenerBins[type] = listenerBins = [];
            }
            listenerBins.push({ listener: listener, thisTarget: thisTarget, data: data, priority: priority });
            // sort
        }
        removeEventListener(type, listener, data = null) {
            let listenerBins = this._listenerBins[type];
            if (listenerBins) {
                if (this._dipatchLevel !== 0) {
                    this._listenerBins[type] = listenerBins = listenerBins.concat();
                }
                for (let i = 0, l = listenerBins.length; i < l; ++i) {
                    const listenerBin = listenerBins[i];
                    if (listenerBin.listener === listener && this._isSameListener(listenerBin.data, data)) {
                        listenerBins.splice(i, 1);
                    }
                }
            }
        }
        removeAllEventListener(type) {
            if (type) {
                delete this._listenerBins[type];
            }
            else {
                for (let i in this._listenerBins) {
                    delete this._listenerBins[i];
                }
            }
        }
        dispatchEvent(event) {
            const type = event.type;
            const listenerBins = this._listenerBins[type];
            if (listenerBins) {
                event.target = this;
                if (!event.currentTarget) {
                    event.currentTarget = event.target;
                }
                this._dipatchLevel++;
                for (let listenerBin of listenerBins) {
                    listenerBin.listener.call(listenerBin.thisTarget, event, listenerBin.data);
                }
                this._dipatchLevel--;
            }
        }
        dispatchEventWidth(type, data) {
            const event = gmvc.Event.create(gmvc.Event);
            event.type = type;
            event.data = data;
            this.dispatchEvent(event);
            event.returnToPool();
        }
    }
    gmvc.EventDispatcher = EventDispatcher;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class Model extends gmvc.BaseObject {
        /**
         * 发送通知。
         */
        _sendNotification(type, data = null) {
            gmvc.context.sendNotification(type, data, this);
        }
        _onClear() {
        }
    }
    gmvc.Model = Model;
})(gmvc || (gmvc = {}));
/// <reference path="../mvc/Model.ts" />
var gmvc;
(function (gmvc) {
    /**
     * 历史状态基类。
     */
    class BaseState extends gmvc.Model {
        constructor() {
            super(...arguments);
            /**
             * 执行此状态时是否需要触发事件，并做为事件自定义参数。
             */
            this.data = null;
            /**
             * 防止重复执行。
             */
            this._isDone = false;
        }
        _onClear() {
        }
        /**
         * 撤销。
         */
        revert() {
            if (this._isDone) {
                this._isDone = false;
                return true;
            }
            return false;
        }
        /**
         * 执行。
         */
        execute() {
            if (this._isDone) {
                return false;
            }
            this._isDone = true;
            return true;
        }
        merge(nextState) {
            return false;
        }
    }
    gmvc.BaseState = BaseState;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    /**
     * 历史记录。
     */
    class History extends gmvc.BaseState {
        constructor(shorcutRedo = null, shortcutUndo = null) {
            super();
            /**
             * 事件生成器，当历史状态激活时，触发事件。
             */
            this.dispatcher = null;
            /**
             * 当历史记录正在变更时，防止因外部逻辑错误破坏历史记录。
             * 未锁，锁定，锁定，锁定
             */
            this._locked = 0;
            /**
             * 历史记录当前的位置。
             */
            this._index = -1;
            /**
             * 状态列表。
             */
            this._states = [];
            /**
             * 批次列表。
             */
            this._batchs = [];
            this.shortcutRedo = shorcutRedo;
            this.shortcutUndo = shortcutUndo;
        }
        static toString() {
            return "[class History]";
        }
        /**
         * 当历史记录在中间执行出现分支时，废弃前一个分支。
         */
        _free() {
            if (this._states.length > this._index + 1) {
                this._states.length = this._index + 1;
                if (this.dispatcher !== null) {
                    this.dispatcher.dispatchEventWidth(gmvc.HistoryEventType[gmvc.HistoryEventType.HistoryFree], null);
                }
            }
        }
        /**
         * 执行或撤销状态。
         */
        _doState(state, isUndo) {
            if (isUndo) {
                state.revert();
            }
            else {
                state.execute();
            }
            if (this.dispatcher !== null && state.data) {
                const data = { isUndo: isUndo, data: state.data };
                this.dispatcher.dispatchEventWidth(gmvc.HistoryEventType[gmvc.HistoryEventType.HistoryState], data);
            }
        }
        /**
         *
         */
        _getStateByObject(history, object, key, link = null) {
            let i = history._states.length;
            while (i--) {
                const state = history._states[i];
                if (state instanceof gmvc.ModifyObjectState) {
                    if ((link === null || state !== link) && state.object === object && state.key === key) {
                        return state;
                    }
                }
                else if (state instanceof History) {
                    const subState = this._getStateByObject(state, object, key, link);
                    if (subState !== null) {
                        return subState;
                    }
                }
            }
            return null;
        }
        /**
         * 撤销到历史头。
         */
        revert() {
            if (this._batchs.length > 0) {
                return false;
            }
            return this.go(-1);
        }
        /**
         * 执行到历史尾。
         */
        execute() {
            if (this._batchs.length > 0) {
                return false;
            }
            return this.go(this._states.length - 1);
        }
        /**
         * 回退一个状态。
         */
        back() {
            //如果有分支，只能回退分支里的内容。
            let batchLen = this._batchs.length;
            if (batchLen > 0) {
                let curHistory = this._batchs[batchLen - 1];
                if (curHistory) {
                    return curHistory.back();
                }
            }
            if (this._index < 0) {
                return false;
            }
            if (this._batchs.length > 0) {
                return false;
            }
            this._locked |= 1;
            this._doState(this._states[this._index--], true);
            this._locked &= 2;
            return true;
        }
        /**
         * 前进一个状态。
         */
        forward() {
            //如果有分支，只能重做分支里的内容。
            let batchLen = this._batchs.length;
            if (batchLen > 0) {
                let curHistory = this._batchs[batchLen - 1];
                if (curHistory) {
                    return curHistory.forward();
                }
            }
            if (this._index >= this._states.length - 1) {
                return false;
            }
            if (this._batchs.length > 0) {
                return false;
            }
            this._locked |= 1;
            this._doState(this._states[++this._index], false);
            this._locked &= 2;
            return true;
        }
        /**
         * 跳转到指定状态。
         */
        go(index) {
            if (this._batchs.length > 0) {
                return false;
            }
            let result = false;
            if (this._index < index) {
                while (this._index !== index && this.forward()) {
                    result = true;
                }
            }
            else {
                while (this._index !== index && this.back()) {
                    result = true;
                }
            }
            return result;
        }
        /**
         * 添加并执行状态。
         */
        add(state) {
            if (this._locked !== 0) {
                return;
            }
            if (this._batchs.length > 0) { // 批次添加中。
                const batch = this._batchs[this._batchs.length - 1];
                batch.add(state);
            }
            else {
                this._states[this._index + 1] = state;
                if (this.dispatcher !== null) {
                    this.dispatcher.dispatchEventWidth(gmvc.HistoryEventType[gmvc.HistoryEventType.HistoryAdd], state);
                }
                this.forward();
                this._free();
            }
        }
        /**
         * 添加并批次。
         */
        addBatch(...args) {
            if (this._locked !== 0) {
                return null;
            }
            const batch = History.create(History);
            batch.dispatcher = this.dispatcher;
            for (const state of args) {
                batch.add(state);
            }
            this.add(batch);
            return batch;
        }
        /**
         * 开始批次。
         */
        beginBatch() {
            const batch = History.create(History);
            batch.dispatcher = this.dispatcher;
            this._batchs.push(batch);
            return batch;
        }
        abandonBatch() {
            if (this._batchs.length > 0) {
                this._batchs.pop();
                return true;
            }
            return false;
        }
        /**
         * 结束批次。
         */
        endBatch(data = null) {
            if (this._batchs.length < 1) { // 已经没有进行的批次。
                return;
            }
            const batch = this._batchs.pop();
            if (batch.count < 1) { // 空批次。
                return;
            }
            batch._mergeAll();
            batch.dispatcher = this.dispatcher;
            batch.data = data;
            batch._locked |= 2;
            if (this._batchs.length > 0) {
                this._batchs[this._batchs.length - 1].add(batch);
            }
            else {
                this.add(batch);
            }
        }
        /**
         * 合并会把在一个batch内的所有同类型按顺序合并，例如
         * [命令类型1，命令类型2，命令类型2，命令类型1]
         * 合并结果为
         * [命令类型1，命令类型2]
         */
        _mergeAll() {
            let i = 0;
            let j = 0;
            let len = this._states.length;
            let curState;
            let nextState;
            if (len > 0) {
                for (j = 0; j < len - 1; j++) {
                    curState = this._states[j];
                    for (i = j + 1; i < len; i++) {
                        nextState = this._states[i];
                        if (curState.merge(nextState)) {
                            this._states.splice(i, 1);
                            i--;
                            len--;
                        }
                    }
                }
                this._index = len - 1;
            }
        }
        /**
         *
         */
        linkObjectState(object, key) {
            const currentState = this._getStateByObject(this, object, key);
            if (currentState !== null) {
                const prevState = this._getStateByObject(this, object, key, currentState);
                if (prevState !== null) {
                    currentState.fromValue = prevState.toValue;
                }
            }
        }
        /**
         * 获取指定状态。
         */
        getState(index) {
            return this._states[index];
        }
        /**
         * 当前指定标识。
         */
        get locked() {
            return this._locked !== 0;
        }
        set locked(value) {
            if (value) {
                this._locked |= 1;
            }
            else {
                this._locked &= 2;
            }
        }
        /**
         * 当前指定标识。
         */
        get index() {
            return this._index;
        }
        /**
         * 总状态数。
         */
        get count() {
            return this._states.length;
        }
    }
    gmvc.History = History;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    /**
     * 单纯控制器。
     */
    class Controller extends gmvc.EventDispatcher {
        /**
         * 转发通知。
         */
        _notificationHandler(event, listener) {
            listener.call(this, event.data);
        }
        /**
         * 初始化。
         */
        _initialize() {
        }
        /**
         * 侦听通知。
         */
        _addNotification(type, listener) {
            gmvc.context.addEventListener(String(type), this._notificationHandler, this, listener);
        }
        /**
         * 取消侦听通知。
         */
        _removeNotification(type, listener) {
            gmvc.context.removeEventListener(String(type), this._notificationHandler, listener);
        }
        /**
         * 发送通知。
         */
        _sendNotification(type, data = null) {
            gmvc.context.sendNotification(type, data, this);
        }
        _hasEventListener(type) {
            return gmvc.context.hasEventListener(String(type));
        }
        /**
         * 初始化。
         */
        init(model) {
            this.model = model;
            this._initialize();
        }
    }
    gmvc.Controller = Controller;
})(gmvc || (gmvc = {}));
/// <reference path="../mvc/Controller.ts" />
var gmvc;
(function (gmvc) {
    class HistoryController extends gmvc.Controller {
        constructor() {
            super();
            HistoryController._instance = this;
        }
        static toString() {
            return "[class render.controller.HistoryController]";
        }
        static get instance() {
            return HistoryController._instance;
        }
        _initialize() {
            this.setHistory(this.model);
        }
        setHistory(history) {
            if (this._history) {
                this._history.dispatcher = null;
            }
            else {
                gmvc.context.addEventListener(gmvc.HistoryEventType[gmvc.HistoryEventType.HistoryState], (event) => {
                    const historyEventData = event.data;
                    const historyData = historyEventData.data;
                    gmvc.context.sendNotification(historyData.type, historyData.data, historyData.target);
                }, null);
            }
            this._history = history;
            this._history.dispatcher = gmvc.context;
            if (this._history) {
                this.addListener();
            }
            else {
                this.removeListener();
            }
        }
        redo() {
            this.onRedo();
        }
        undo() {
            this.onUndo();
        }
        addListener() {
            const shortcut = gmvc.ShortcutController.instance;
            if (this._history.shortcutRedo) {
                this.shortcutRedo = this._history.shortcutRedo;
                shortcut.addRegister(this.shortcutRedo, this.onRedo.bind(this));
            }
            if (this._history.shortcutUndo) {
                this.shortcutUndo = this._history.shortcutUndo;
                shortcut.addRegister(this.shortcutUndo, this.onUndo.bind(this));
            }
        }
        removeListener() {
            const shortcut = gmvc.ShortcutController.instance;
            if (this.shortcutRedo) {
                shortcut.removeRegister(this.shortcutRedo, this.onRedo.bind(this));
            }
            if (this.shortcutUndo) {
                shortcut.removeRegister(this.shortcutUndo, this.onUndo.bind(this));
            }
        }
        beginBatch() {
            if (this._history) {
                this._history.beginBatch();
            }
        }
        /**
         * 结束批次。
         */
        endBatch(data = null) {
            if (this._history) {
                this._history.endBatch(data);
            }
        }
        abandonBatch(data = null) {
            if (this._history) {
                this._history.abandonBatch();
            }
        }
        onRedo() {
            let redo = this._history.forward();
        }
        onUndo() {
            let undo = this._history.back();
        }
        add(state) {
            if (this._history) {
                this._history.add(state);
            }
        }
    }
    HistoryController.silence = false;
    gmvc.HistoryController = HistoryController;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    /**
     * 事件枚举。
     */
    let HistoryEventType;
    (function (HistoryEventType) {
        HistoryEventType[HistoryEventType["HistoryState"] = 0] = "HistoryState";
        HistoryEventType[HistoryEventType["HistoryAdd"] = 1] = "HistoryAdd";
        HistoryEventType[HistoryEventType["HistoryFree"] = 2] = "HistoryFree";
    })(HistoryEventType = gmvc.HistoryEventType || (gmvc.HistoryEventType = {}));
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class ModifyArrayState extends gmvc.BaseState {
        constructor() {
            super(...arguments);
            this.index = -1;
            this.fromValue = null;
            this.toValue = null;
        }
        static createState(array, index, value, data = null) {
            if (index < 0) {
                if (array.length > 0) {
                    index = array.length - 1;
                }
                else {
                    index = 0;
                }
            }
            const state = new ModifyArrayState();
            state.array = array;
            state.index = index;
            state.data = data;
            if (value) {
                state.toValue = value;
            }
            else {
                state.fromValue = state.array[state.index];
            }
            return state;
        }
        revert() {
            if (super.revert()) {
                if (this.fromValue) {
                    this.array.splice(this.index, 0, this.fromValue);
                }
                else {
                    this.array.splice(this.index, 1);
                }
                return true;
            }
            return false;
        }
        execute() {
            if (super.execute()) {
                if (this.toValue) {
                    this.array.splice(this.index, 0, this.toValue);
                }
                else {
                    this.array.splice(this.index, 1);
                }
                return true;
            }
            return false;
        }
    }
    gmvc.ModifyArrayState = ModifyArrayState;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class ModifyObjectState extends gmvc.BaseState {
        constructor() {
            super(...arguments);
            this.fromValue = null;
            this.toValue = null;
        }
        static createState(object, key, value, data = null) {
            const state = new ModifyObjectState();
            state.object = object;
            state.key = key;
            state.data = data;
            state.fromValue = (state.key in state.object) ? state.object[state.key] : undefined;
            state.toValue = value;
            if (state.fromValue === state.toValue) {
                return null;
            }
            return state;
        }
        merge(nextState) {
            if (nextState instanceof ModifyObjectState) {
                if (this.object == nextState.object &&
                    this.key == nextState.key) {
                    this.toValue = nextState.toValue;
                    return true;
                }
            }
            return false;
        }
        revert() {
            if (super.revert()) {
                if (this.fromValue !== undefined) {
                    this.object[this.key] = this.fromValue;
                }
                else {
                    delete this.object[this.key];
                }
                return true;
            }
            return false;
        }
        execute() {
            if (super.execute()) {
                if (this.toValue !== undefined) {
                    this.object[this.key] = this.toValue;
                }
                else {
                    delete this.object[this.key];
                }
                return true;
            }
            return false;
        }
    }
    gmvc.ModifyObjectState = ModifyObjectState;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class ModifyPointState extends gmvc.BaseState {
        static createState(point, newX, newY) {
            const state = new ModifyPointState();
            state.point = point;
            state.oldX = point.x;
            state.oldY = point.y;
            state.newX = newX;
            state.newY = newY;
            return state;
        }
        revert() {
            if (super.revert()) {
                this.point.x = this.oldX;
                this.point.y = this.oldY;
                return true;
            }
            return false;
        }
        execute() {
            if (super.execute()) {
                this.point.x = this.newX;
                this.point.y = this.newY;
                return true;
            }
            return false;
        }
    }
    gmvc.ModifyPointState = ModifyPointState;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    /**
     * 命令。
     */
    class Command extends gmvc.BaseObject {
        constructor() {
            super(...arguments);
            /**
             * 命令的数据输出。
             */
            this.result = null;
            /**
             * 是否被持有。（异步命令防止被垃圾回收）
             */
            this._isRetained = false;
            /**
             * 命令的所属队列。（异步命令需要异步通知队列继续，在释放调用中通知队列）
             */
            this._queue = null;
        }
        static toString() {
            return "[class Command]";
        }
        _onClear() {
        }
        /**
         * 发送通知。
         */
        _sendNotification(type, data) {
            gmvc.context.sendNotification(type, data, null);
        }
        /**
         * 持有。
         */
        _retain() {
            this._isRetained = true;
            gmvc.controller.retain(this);
        }
        /**
         * 释放。
         */
        _release(isSuccessed) {
            if (this._queue) {
                if (isSuccessed) {
                    this._queue._next(this.notification.data);
                }
            }
            this._isRetained = false;
            gmvc.controller.release(this);
        }
        /**
         * 执行命令。
         */
        execute() {
        }
        /**
         * 是否被持有。（异步命令防止被垃圾回收）
         */
        get isRetained() {
            return this._isRetained;
        }
        /**
         * 命令的数据输入。
         */
        get data() {
            return this.notification.data;
        }
    }
    gmvc.Command = Command;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    /**
     * 命令控制器。
     */
    class CommandManager extends gmvc.BaseObject {
        constructor() {
            super(...arguments);
            /**
             * 被持有的命令。（防止垃圾回收）
             */
            this._commands = [];
        }
        static toString() {
            return "[class CommandManager]";
        }
        /**
         * 收到通知并执行命令。
         */
        _notificationHandler(event, commandBin) {
            const command = this.create(commandBin);
            this.execute(command, event.data, commandBin);
        }
        _onClear() {
        }
        /**
         * 注册命令。
         */
        register(type, commandClass, guard = null, hook = null) {
            const commandBin = { commandClass: commandClass, guard: guard, hook: hook };
            gmvc.context.addEventListener(String(type), this._notificationHandler, this, commandBin);
        }
        /**
         * 取消注册的命令。
         */
        unregister(type, command) {
            gmvc.context.removeEventListener(String(type), this._notificationHandler, command);
        }
        /**
         * 生成一个命令。
         */
        create(commandBin) {
            const command = gmvc.Command.create(commandBin.commandClass);
            return command;
        }
        /**
         * 执行命令。
         */
        execute(command, notifycation, commandBin) {
            command.notification = notifycation;
            if (commandBin.guard !== null) {
                commandBin.guard(command);
            }
            command.execute();
            if (commandBin.hook !== null) {
                commandBin.hook(command);
            }
        }
        /**
         * 持有命令。（防止被垃圾回收）
         */
        retain(command) {
            if (this._commands.indexOf(command) < 0) {
                this._commands.push(command);
            }
        }
        /**
         * 释放命令。
         */
        release(command) {
            const index = this._commands.indexOf(command);
            if (index >= 0) {
                this._commands.splice(index, 1);
            }
        }
    }
    gmvc.CommandManager = CommandManager;
    /**
     * 控制器实例。
     */
    gmvc.controller = CommandManager.getInstance(CommandManager);
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class Context extends gmvc.EventDispatcher {
        static toString() {
            return "[class Context]";
        }
        /**
         * 判断是否注册命令（侦听器）的依据。
         */
        _isSameListener(a, b) {
            if (a && a.commandClass && b) {
                return a.commandClass === b;
            }
            return super._isSameListener(a, b);
        }
        /**
         * 发送通知。
         */
        sendNotification(type, data, target = null) {
            // console.log("sendNotification", type, data, target);
            //console.log("sendNotification", type);
            this.dispatchEventWidth(String(type), { type: type, data: data, target: target });
        }
    }
    gmvc.Context = Context;
    gmvc.context = Context.getInstance(Context);
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class ModelController extends gmvc.Model {
        _addNotification(type, listener) {
            gmvc.context.addEventListener(String(type), this._notificationHandler, this, listener);
        }
        /**
         * 取消侦听通知。
         */
        _removeNotification(type, listener) {
            gmvc.context.removeEventListener(String(type), this._notificationHandler, listener);
        }
        _hasEventListener(type) {
            return gmvc.context.hasEventListener(String(type));
        }
        _notificationHandler(event, listener) {
            listener.call(this, event.data);
        }
    }
    gmvc.ModelController = ModelController;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    /**
     * 命令队列。
     */
    class QueueCommand extends gmvc.Command {
        constructor() {
            super(...arguments);
            /**
             * 存储每个命令的初始化数据。
             */
            this._commandBins = [];
        }
        static toString() {
            return "[class QueueCommand]";
        }
        /**
         * 添加命令。
         */
        _addCommand(commandClass, guard = null, hook = null) {
            const commandBin = { commandClass: commandClass, guard: guard, hook: hook };
            this._commandBins.push(commandBin);
        }
        /**
         * 执行命令队列。
         */
        execute() {
            this._initialize();
            this._next(this.notification.data);
        }
        /**
         * 下一个命令。
         */
        _next(data) {
            if (this._commandBins.length > 0) {
                const commandBin = this._commandBins.shift();
                if (commandBin) {
                    this._currentCommand = gmvc.controller.create(commandBin);
                    this._currentCommand._queue = this;
                    gmvc.controller.execute(this._currentCommand, { type: 0, data: data, target: null }, commandBin); //
                    if (!this._currentCommand.isRetained) {
                        this._next(this._currentCommand.result);
                    }
                }
            }
        }
    }
    gmvc.QueueCommand = QueueCommand;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    /**
     * 视图控制器。
     */
    class ViewController extends gmvc.Controller {
        initialize(model, component) {
            this.model = model;
            this.component = component;
            this._initialize();
            this.update();
        }
        /**
         * 更新视图。
         */
        update() {
        }
    }
    gmvc.ViewController = ViewController;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    // export enum ShortcutType{
    //     CANCEL = 'canel',
    //     DELETE = 'delete',
    //     UNDO = 'undo',
    //     REDO = 'redo'
    // }
    class Shortcut extends gmvc.Model {
        constructor(shortcutConfig) {
            super();
            this._defs = [];
            if (shortcutConfig) {
                for (let i = 0, len = shortcutConfig.length; i < len; i++) {
                    this.addShortcut(shortcutConfig[i].keycodes, shortcutConfig[i].type);
                }
            }
            // this.addShortcut([27], ShortcutType.CANCEL);
            // this.addShortcut([46], ShortcutType.DELETE);
            // this.addShortcut([this.CTRL, this.Z], ShortcutType.UNDO);
            // this.addShortcut([this.CTRL, this.Y], ShortcutType.REDO);
        }
        matchShortcut(keycodes) {
            var type = this.getShortcut(keycodes);
            if (type) {
                this._sendNotification(type, null);
            }
        }
        addShortcut(keycodes, type) {
            if (!this.hasShortcut(keycodes, type)) {
                keycodes.sort();
                this._defs.push({ keycodes: keycodes, type: type });
            }
        }
        hasShortcut(keycodes, type) {
            let i = 0;
            let len = 0;
            for (i = 0, len = this._defs.length; i < len; i++) {
                if (this._defs[i].type === type &&
                    this.keycodeEqual(this._defs[i].keycodes, keycodes)) {
                    return true;
                }
            }
            return false;
        }
        keycodeEqual(keycodes1, keycodes2) {
            if (keycodes1.length == keycodes2.length) {
                let i = 0;
                let len = keycodes1.length;
                for (i = 0; i < len; i++) {
                    if (keycodes1[i] != keycodes2[i]) {
                        return false;
                    }
                }
                return true;
            }
            return false;
        }
        getShortcut(keycodes) {
            let i = 0;
            let len = 0;
            for (i = 0, len = this._defs.length; i < len; i++) {
                if (this.keycodeEqual(this._defs[i].keycodes, keycodes)) {
                    return this._defs[i].type;
                }
            }
            return null;
        }
    }
    Shortcut.ESC = 27;
    Shortcut.DEL = 46;
    Shortcut.CTRL = 17;
    Shortcut.Z = 90;
    Shortcut.Y = 89;
    gmvc.Shortcut = Shortcut;
})(gmvc || (gmvc = {}));
var gmvc;
(function (gmvc) {
    class ShortcutController extends gmvc.Controller {
        constructor() {
            super();
            this._entries = [];
            this._keyPress = [];
            this._shortcutMap = new Map();
            ShortcutController._instance = this;
        }
        static toString() {
            return "[class shortcut.ShortcutController]";
        }
        static get instance() {
            return ShortcutController._instance;
        }
        _initialize() {
            this.registWindow(window);
        }
        registWindow(window) {
            window.addEventListener("keydown", this.onKeyDown.bind(this));
            window.addEventListener("keyup", this.onKeyUp.bind(this));
        }
        onKeyDown(e) {
            if ((e.keyCode == 90 || e.keyCode == 89) && e.ctrlKey) {
                //屏蔽系统的ctrl+z， ctrl+y；
                e.stopImmediatePropagation();
                e.preventDefault();
            }
            let code = e.keyCode;
            if (this._keyPress.indexOf(code) == -1) {
                this._keyPress.push(code);
                this._keyPress.sort();
            }
            this.model.matchShortcut(this._keyPress);
        }
        onKeyUp(e) {
            let code = e.keyCode;
            let i = this._keyPress.indexOf(code);
            if (i >= 0) {
                this._keyPress.splice(i, 1);
            }
        }
        clear() {
            this._keyPress.length = 0;
        }
        addRegister(type, callback, focus = null) {
            if (!this.hasRegister(type, callback, focus)) {
                var entry = { type: type, callback: callback, focus: focus };
                this._entries.push(entry);
                var entries = this._shortcutMap.get(type);
                if (entries == undefined) {
                    entries = [];
                    this._shortcutMap.set(type, entries);
                }
                entries.push(entry);
                if (!this._hasEventListener(type)) {
                    this._addNotification(type, this.onShorcut);
                }
            }
        }
        removeRegister(type, callback, focus = null) {
            let i = 0;
            let len = 0;
            for (i = 0, len = this._entries.length; i < len; i++) {
                if (this._entries[i].type === type &&
                    this._entries[i].callback === callback &&
                    this._entries[i].focus === focus) {
                    this._entries.splice(i, 1);
                    let entries = this._shortcutMap.get(type);
                    if (entries != undefined) {
                        let index = entries.indexOf(this._entries[i]);
                        if (index >= 0) {
                            entries.splice(index, 1);
                        }
                        if (entries.length == 0) {
                            this._removeNotification(type, this.onShorcut);
                        }
                    }
                    return;
                }
            }
        }
        hasRegister(type, callback, focus = null) {
            let i = 0;
            let len = 0;
            for (i = 0, len = this._entries.length; i < len; i++) {
                if (this._entries[i].type === type &&
                    this._entries[i].callback === callback &&
                    this._entries[i].focus === focus) {
                    return true;
                }
            }
            return false;
        }
        onShorcut(type) {
            let sc = (type.type);
            let entries = this._shortcutMap.get(sc);
            if (entries) {
                let i = 0;
                let len = 0;
                for (i = 0, len = entries.length; i < len; i++) {
                    entries[i].callback();
                }
            }
        }
    }
    gmvc.ShortcutController = ShortcutController;
})(gmvc || (gmvc = {}));
//# sourceMappingURL=gmvc.js.map