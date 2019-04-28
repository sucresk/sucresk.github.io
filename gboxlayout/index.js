/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./App.ts":
/*!****************!*\
  !*** ./App.ts ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AppConst_1 = __webpack_require__(/*! AppConst */ "./AppConst.ts");
const InitialCommand_1 = __webpack_require__(/*! command/InitialCommand */ "./command/InitialCommand.ts");
class App {
    static start() {
        gmvc.controller.register(AppConst_1.CommandNoti.INIT, InitialCommand_1.default);
        gmvc.context.sendNotification(AppConst_1.CommandNoti.INIT, null, null);
    }
}
App.historyController = gmvc.HistoryController.getInstance(gmvc.HistoryController);
App.shortcutController = gmvc.ShortcutController.getInstance(gmvc.ShortcutController);
App.isDebug = true;
exports.default = App;


/***/ }),

/***/ "./AppConst.ts":
/*!*********************!*\
  !*** ./AppConst.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CommandNoti;
(function (CommandNoti) {
    CommandNoti[CommandNoti["INIT"] = 100] = "INIT";
    CommandNoti[CommandNoti["SHORTCUT"] = 101] = "SHORTCUT";
    CommandNoti[CommandNoti["LOAD_PARTICLE"] = 102] = "LOAD_PARTICLE";
    CommandNoti[CommandNoti["OPEN_VIEW"] = 103] = "OPEN_VIEW";
    CommandNoti[CommandNoti["RESET_VIEW"] = 104] = "RESET_VIEW";
    CommandNoti[CommandNoti["RIGHT_MENU"] = 105] = "RIGHT_MENU";
})(CommandNoti = exports.CommandNoti || (exports.CommandNoti = {}));
var ShortcutType;
(function (ShortcutType) {
    ShortcutType[ShortcutType["UNDO"] = 200] = "UNDO";
    ShortcutType[ShortcutType["REDO"] = 201] = "REDO";
})(ShortcutType = exports.ShortcutType || (exports.ShortcutType = {}));
var DataNoti;
(function (DataNoti) {
    DataNoti[DataNoti["LAYOUT_CHANGE"] = 300] = "LAYOUT_CHANGE";
})(DataNoti = exports.DataNoti || (exports.DataNoti = {}));


/***/ }),

/***/ "./AppModel.ts":
/*!*********************!*\
  !*** ./AppModel.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LayoutPanel_1 = __webpack_require__(/*! panels/LayoutPanel */ "./panels/LayoutPanel.tsx");
const AppConst_1 = __webpack_require__(/*! AppConst */ "./AppConst.ts");
class AppModel extends gmvc.Model {
    constructor() {
        super(...arguments);
        this.boxNum = 1;
        this.panelNum = 1;
    }
    applyCurData() {
        this.boxLayout.setData(this.layoutData);
    }
    addPanel(box, position) {
        this.updateLayoutData();
        let boxName = box.name;
        let boxData = this.findBox(boxName, this.layoutData);
        let boxW = box.explicitWidth;
        let boxH = box.explicitHeight;
        if (boxData) {
            let panelName = boxData.panels[0];
            boxData.panels.length = 0;
            let boxData1 = this.createBox(panelName);
            let panelName2 = 'panel' + this.panelNum++;
            let boxData2 = this.createBox(panelName2);
            this.boxLayout.registPanel(panelName2, new LayoutPanel_1.default(panelName2));
            switch (position) {
                case gboxLayout.GDragPosition.TOP:
                    boxData.isVertical = true;
                    boxData1.height = boxH / 2;
                    boxData1.width = boxW;
                    boxData2.height = boxH / 2;
                    boxData2.width = boxW;
                    boxData.children = [boxData2, boxData1];
                    break;
                case gboxLayout.GDragPosition.BOTTOM:
                    boxData1.height = boxH / 2;
                    boxData1.width = boxW;
                    boxData2.height = boxH / 2;
                    boxData2.width = boxW;
                    boxData.children = [boxData1, boxData2];
                    boxData.isVertical = true;
                    break;
                case gboxLayout.GDragPosition.LEFT:
                    boxData1.height = boxH;
                    boxData1.width = boxW / 2;
                    boxData2.height = boxH;
                    boxData2.width = boxW / 2;
                    boxData.children = [boxData2, boxData1];
                    boxData.isVertical = false;
                    break;
                case gboxLayout.GDragPosition.RIGHT:
                    boxData1.height = boxH;
                    boxData1.width = boxW / 2;
                    boxData2.height = boxH;
                    boxData2.width = boxW / 2;
                    boxData.children = [boxData1, boxData2];
                    boxData.isVertical = false;
                    break;
            }
            this._sendNotification(AppConst_1.DataNoti.LAYOUT_CHANGE);
        }
    }
    removePanel(panel) {
        panel.dispose();
        this.boxLayout.removePanel(panel);
        this.updateLayoutData();
    }
    updateLayoutData() {
        this.layoutData = this.boxLayout.getData();
    }
    findBox(name, boxData) {
        if (boxData.name == name) {
            return boxData;
        }
        if (boxData.children) {
            for (let i = 0, len = boxData.children.length; i < len; i++) {
                let child1 = boxData.children[i];
                let childBoxData = this.findBox(name, child1);
                if (childBoxData) {
                    return childBoxData;
                }
            }
        }
        return null;
    }
    findBoxParent(name, boxData) {
        if (boxData.children) {
            for (let i = 0, len = boxData.children.length; i < len; i++) {
                let childBoxData = boxData.children[i];
                if (childBoxData) {
                    if (childBoxData.name == name) {
                        return boxData;
                    }
                    else {
                        this.findBoxParent(name, childBoxData);
                    }
                }
            }
        }
        return null;
    }
    createBox(panelName) {
        let name = 'box' + this.boxNum++;
        return {
            "name": name,
            "isVertical": false,
            "mainIndex": 0,
            "width": 1806,
            "height": 842,
            "children": [],
            "panels": [panelName],
            "panelIndex": 0
        };
    }
}
exports.default = AppModel;


/***/ }),

/***/ "./command/InitAlreadyCommand.ts":
/*!***************************************!*\
  !*** ./command/InitAlreadyCommand.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class InitAlreadyCommand extends gmvc.Command {
    execute() {
        console.log("Already go!!");
    }
}
exports.default = InitAlreadyCommand;


/***/ }),

/***/ "./command/InitDataCommand.ts":
/*!************************************!*\
  !*** ./command/InitDataCommand.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __webpack_require__(/*! App */ "./App.ts");
const AppModel_1 = __webpack_require__(/*! AppModel */ "./AppModel.ts");
class InitDataCommand extends gmvc.Command {
    execute() {
        App_1.default.model = new AppModel_1.default();
        App_1.default.model.layoutData = {
            "name": "main",
            "isVertical": false,
            "mainIndex": 0,
            "width": 1806,
            "height": 842,
            "children": [],
            "panels": ["test"],
            "panelIndex": 0
        };
    }
}
exports.default = InitDataCommand;


/***/ }),

/***/ "./command/InitHistoryCommand.ts":
/*!***************************************!*\
  !*** ./command/InitHistoryCommand.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AppConst_1 = __webpack_require__(/*! AppConst */ "./AppConst.ts");
const App_1 = __webpack_require__(/*! App */ "./App.ts");
class InitHistoryCommand extends gmvc.Command {
    execute() {
        let curHistory = new gmvc.History(AppConst_1.ShortcutType.REDO, AppConst_1.ShortcutType.UNDO);
        App_1.default.historyController.setHistory(curHistory);
    }
}
exports.default = InitHistoryCommand;


/***/ }),

/***/ "./command/InitLayoutCommand.ts":
/*!**************************************!*\
  !*** ./command/InitLayoutCommand.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LayoutPanel_1 = __webpack_require__(/*! panels/LayoutPanel */ "./panels/LayoutPanel.tsx");
const App_1 = __webpack_require__(/*! App */ "./App.ts");
const ToolBar_1 = __webpack_require__(/*! panels/ToolBar */ "./panels/ToolBar.tsx");
class InitLayoutCommand extends gmvc.Command {
    execute() {
        let appContainer = document.getElementById('container');
        let layout4Str = `{
            "name": "main",
            "isVertical": false,
            "mainIndex": 0,
            "width": 1806,
            "height": 842,
            "children": [],
            "panels":["test"],
            "panelIndex": 0
        }`;
        let layout4 = JSON.parse(layout4Str);
        if (appContainer) {
            let layout = new gboxLayout.GBoxLayout();
            layout.registPanel('test', new LayoutPanel_1.default('panel0'));
            layout.setContainer(appContainer);
            layout.setData(layout4);
            App_1.default.model.boxLayout = layout;
        }
        let toolbarContainer = document.getElementById('toolbar');
        if (toolbarContainer) {
            let toolbar = new ToolBar_1.default();
            toolbar.setContainer(toolbarContainer);
        }
    }
}
exports.default = InitLayoutCommand;


/***/ }),

/***/ "./command/InitShortcutCommand.ts":
/*!****************************************!*\
  !*** ./command/InitShortcutCommand.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AppConst_1 = __webpack_require__(/*! AppConst */ "./AppConst.ts");
const App_1 = __webpack_require__(/*! App */ "./App.ts");
class InitShortcutCommand extends gmvc.Command {
    execute() {
        let shortcutConfig = [
            { keycodes: [gmvc.Shortcut.CTRL, gmvc.Shortcut.Z], type: AppConst_1.ShortcutType.UNDO },
            { keycodes: [gmvc.Shortcut.CTRL, gmvc.Shortcut.Y], type: AppConst_1.ShortcutType.REDO },
        ];
        let shortcutModel = new gmvc.Shortcut(shortcutConfig);
        App_1.default.shortcutController.init(shortcutModel);
        // document.addEventListener("mousemove",(e)=>{
        //     e.preventDefault();
        // })
    }
}
exports.default = InitShortcutCommand;


/***/ }),

/***/ "./command/InitialCommand.ts":
/*!***********************************!*\
  !*** ./command/InitialCommand.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const InitShortcutCommand_1 = __webpack_require__(/*! ./InitShortcutCommand */ "./command/InitShortcutCommand.ts");
const InitHistoryCommand_1 = __webpack_require__(/*! ./InitHistoryCommand */ "./command/InitHistoryCommand.ts");
const InitLayoutCommand_1 = __webpack_require__(/*! ./InitLayoutCommand */ "./command/InitLayoutCommand.ts");
const InitAlreadyCommand_1 = __webpack_require__(/*! ./InitAlreadyCommand */ "./command/InitAlreadyCommand.ts");
const InitDataCommand_1 = __webpack_require__(/*! ./InitDataCommand */ "./command/InitDataCommand.ts");
class InitialCommand extends gmvc.QueueCommand {
    _initialize() {
        this._addCommand(InitDataCommand_1.default);
        this._addCommand(InitShortcutCommand_1.default);
        this._addCommand(InitHistoryCommand_1.default);
        this._addCommand(InitLayoutCommand_1.default);
        this._addCommand(InitAlreadyCommand_1.default);
    }
}
exports.default = InitialCommand;


/***/ }),

/***/ "./index.tsx":
/*!*******************!*\
  !*** ./index.tsx ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __webpack_require__(/*! App */ "./App.ts");
App_1.default.start();


/***/ }),

/***/ "./panels/LayoutPanel.tsx":
/*!********************************!*\
  !*** ./panels/LayoutPanel.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 必须写成下面的import形式，上面的这种webpack打包后会出现react.default.xxx导致报错。
// import ReactDOM from "react-dom";
// import React from "react";
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const antd_1 = __webpack_require__(/*! antd */ "antd");
const App_1 = __webpack_require__(/*! App */ "./App.ts");
const AppConst_1 = __webpack_require__(/*! AppConst */ "./AppConst.ts");
const RadioGroup = antd_1.Radio.Group;
class LayoutPanel extends gboxLayout.GPanel {
    renderLabel() {
        if (this.name == null) {
            this.name = '一个选项页';
        }
        if (this.labelElement == null) {
            this.labelElement = document.createElement('span');
        }
        this.labelElement.innerHTML = this.name;
        // super.renderLabel();
    }
    renderElement() {
        // this.renderLabel();
        if (this.contentElement == null) {
            this.contentElement = document.createElement('div');
        }
        if (this.toolBarElement == null) {
            this.toolBarElement = document.createElement('div');
        }
        let props = {
            box: this.parent,
            panel: this,
        };
        ReactDOM.render(React.createElement(LayoutComponent, Object.assign({}, props)), this.contentElement);
    }
}
exports.default = LayoutPanel;
class LayoutController extends gmvc.ViewController {
    constructor() {
        super(...arguments);
        this.removePanel = (panel) => {
            let appModel = App_1.default.model;
            if (panel) {
                appModel.removePanel(panel);
            }
        };
        this.addBox = (box, pos) => {
            let position = gboxLayout.GDragPosition.RIGHT;
            switch (pos) {
                case 0:
                    console.log('add top');
                    position = gboxLayout.GDragPosition.TOP;
                    break;
                case 1:
                    console.log('add bottom');
                    position = gboxLayout.GDragPosition.BOTTOM;
                    break;
                case 2:
                    console.log('add left');
                    position = gboxLayout.GDragPosition.LEFT;
                    break;
                case 3:
                    console.log('add right');
                    position = gboxLayout.GDragPosition.RIGHT;
                    break;
            }
            let appModel = App_1.default.model;
            if (box) {
                appModel.addPanel(box, position);
            }
        };
        this.onLayoutChange = (e) => {
            console.log('onLayoutChange', e);
            let appModel = App_1.default.model;
            appModel.applyCurData();
        };
        this.changeName = (panel, name) => {
            panel.name = name;
            panel.renderLabel();
        };
        this.changeMaxW = (box, value) => {
            if (!isNaN(value)) {
                box.maxWidth = value;
            }
        };
        this.changeMinW = (box, value) => {
            if (!isNaN(value)) {
                box.minWidth = value;
            }
        };
        this.changeMaxH = (box, value) => {
            if (!isNaN(value)) {
                box.maxHeight = value;
            }
        };
        this.changeMinH = (box, value) => {
            if (!isNaN(value)) {
                box.minHeight = value;
            }
        };
        this.setMain = (box, panel) => {
            if (box && panel) {
                box.isMain = true;
                if (box.brother) {
                    box.brother.isMain = false;
                }
            }
        };
        this.changeType = (box, panel, value) => {
            if (box && panel) {
                if (value == 1) {
                    panel.type = gboxLayout.GPanelType.TAB;
                }
                else {
                    panel.type = gboxLayout.GPanelType.BLOCK;
                }
                box.renderElement();
            }
        };
    }
    static toString() {
        return "[class view.LayoutController]";
    }
    _initialize() {
        this._addNotification(AppConst_1.DataNoti.LAYOUT_CHANGE, this.onLayoutChange);
    }
}
exports.LayoutController = LayoutController;
class LayoutComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.componentDidUpdate = () => {
            let newProps = this.props;
            if (newProps) {
                this.box = newProps.box;
                this.panel = newProps.panel;
            }
        };
        this.render = () => {
            let type = 1;
            let name = '';
            if (this.props) {
                name = this.props.panel.name;
            }
            if (this.props && this.panel) {
                if (this.panel.type == gboxLayout.GPanelType.BLOCK) {
                    type = 2;
                }
            }
            return (React.createElement("div", null,
                React.createElement(antd_1.Button, { onClick: this.onAddTop }, "\u5728\u4E0A\u9762\u6DFB\u52A0\u4E00\u4E2A\u9875\u9762"),
                React.createElement(antd_1.Button, { onClick: this.onAddBottom }, "\u5728\u4E0B\u9762\u6DFB\u52A0\u4E00\u4E2A\u9875\u9762"),
                React.createElement(antd_1.Button, { onClick: this.onAddLeft }, "\u5728\u5DE6\u9762\u6DFB\u52A0\u4E00\u4E2A\u9875\u9762"),
                React.createElement(antd_1.Button, { onClick: this.onAddRight }, "\u5728\u53F3\u9762\u6DFB\u52A0\u4E00\u4E2A\u9875\u9762"),
                React.createElement(antd_1.Button, { onClick: this.onDelete }, "\u5220\u9664\u5F53\u524D\u9875"),
                React.createElement("div", null,
                    React.createElement("span", null, "\u540D\u79F0"),
                    React.createElement(antd_1.Input, { defaultValue: name, onChange: this.onChangeName, style: { width: '200px' } })),
                React.createElement("div", null,
                    React.createElement("span", null, "\u7C7B\u578B"),
                    React.createElement(RadioGroup, { onChange: this.onChangeType, value: type },
                        React.createElement(antd_1.Radio, { value: 1 }, "\u6807\u7B7E\u9875"),
                        React.createElement(antd_1.Radio, { value: 2 }, "\u5355\u9875"))),
                this.renderH(),
                this.renderV(),
                this.renderMain()));
        };
        this.renderH = () => {
            if (this.props.box && !this.props.box.isVertical) {
                let maxW = this.props.box.maxWidth;
                let minW = this.props.box.minWidth;
                return (React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("span", null, "\u6700\u5927\u5BBD"),
                        React.createElement(antd_1.InputNumber, { min: 10, value: maxW, onChange: this.onChangeMaxW }),
                        React.createElement(antd_1.Button, { onClick: this.onSetCurMaxW }, "\u8BBE\u7F6E\u5F53\u524D\u503C\u4E3A\u6700\u5927\u5BBD")),
                    React.createElement("div", null,
                        React.createElement("span", null, "\u6700\u5C0F\u5BBD"),
                        React.createElement(antd_1.InputNumber, { min: 10, value: minW, onChange: this.onChangeMinW }),
                        React.createElement(antd_1.Button, { onClick: this.onSetCurMinW }, "\u8BBE\u7F6E\u5F53\u524D\u503C\u4E3A\u6700\u5C0F\u5BBD"))));
            }
        };
        this.renderV = () => {
            if (this.props.box && this.props.box.isVertical) {
                let maxH = this.props.box.maxHeight;
                let minH = this.props.box.minHeight;
                return (React.createElement("div", null,
                    React.createElement("div", null,
                        React.createElement("span", null, "\u6700\u5927\u9AD8"),
                        React.createElement(antd_1.InputNumber, { min: 10, value: maxH, onChange: this.onChangeMaxH }),
                        React.createElement(antd_1.Button, { onClick: this.onSetCurMaxH }, "\u8BBE\u7F6E\u5F53\u524D\u503C\u4E3A\u6700\u5927\u5BBD")),
                    React.createElement("div", null,
                        React.createElement("span", null, "\u6700\u5C0F\u9AD8"),
                        React.createElement(antd_1.InputNumber, { min: 10, value: minH, onChange: this.onChangeMinH }),
                        React.createElement(antd_1.Button, { onClick: this.onSetCurMinH }, "\u8BBE\u7F6E\u5F53\u524D\u503C\u4E3A\u6700\u5C0F\u5BBD"))));
            }
        };
        this.renderMain = () => {
            if (this.props.box && this.props.box.brother) {
                return (React.createElement(antd_1.Tooltip, { title: "\u5F53\u7A97\u53E3\u5927\u5C0F\u53D8\u5316\u65F6\u4F18\u5148\u6EE1\u8DB3\u4E3B\u7A97\u53E3\u7684\u6700\u5927\u6700\u5C0F\u5BBD\u9AD8" },
                    React.createElement(antd_1.Button, { onClick: this.onSetMain }, "\u8BBE\u7F6E\u5F53\u524D\u503C\u4E3A\u4E3B\u7A97\u53E3")));
            }
        };
        this.onDelete = (e) => {
            this._controller.removePanel(this.panel);
        };
        this.addBox = (pos) => {
            this._controller.addBox(this.box, pos);
        };
        this.onAddTop = () => {
            this.addBox(0);
        };
        this.onAddBottom = () => {
            this.addBox(1);
        };
        this.onAddLeft = () => {
            this.addBox(2);
        };
        this.onAddRight = () => {
            this.addBox(3);
        };
        this.onChangeName = (e) => {
            let name = e.target.value;
            this._controller.changeName(this.panel, name);
        };
        this.onChangeType = (e) => {
            console.log('onChangeType', e.target.value);
            this._controller.changeType(this.box, this.panel, e.target.value);
        };
        this.onChangeMaxW = (e) => {
            console.log('onChangeMaxW', e);
            this._controller.changeMaxW(this.box, e);
            this.refresh();
        };
        this.onChangeMinW = (e) => {
            console.log('onChangeMinW', e);
            this._controller.changeMinW(this.box, e);
            this.refresh();
        };
        this.onSetCurMaxW = (e) => {
            let curW = this.box.explicitWidth;
            this._controller.changeMaxW(this.box, curW);
            this.refresh();
            console.log('setCurMaxW', curW);
        };
        this.onSetCurMinW = (e) => {
            let curW = this.box.explicitWidth;
            this._controller.changeMinW(this.box, curW);
            this.refresh();
            console.log('setCurMinW', curW);
        };
        this.onChangeMaxH = (e) => {
            console.log('onChangeMaxH', e);
            this._controller.changeMaxH(this.box, e);
            this.refresh();
        };
        this.onChangeMinH = (e) => {
            console.log('onChangeMinH', e);
            this._controller.changeMinH(this.box, e);
            this.refresh();
        };
        this.onSetCurMaxH = (e) => {
            let curH = this.box.explicitHeight;
            this._controller.changeMaxH(this.box, curH);
            this.refresh();
            console.log('setCurMaxH', curH);
        };
        this.onSetCurMinH = (e) => {
            let curH = this.box.explicitHeight;
            this._controller.changeMinH(this.box, curH);
            this.refresh();
            console.log('setCurMinH', curH);
        };
        this.onSetMain = (e) => {
            console.log('onSetMain', e);
            this._controller.setMain(this.box, this.panel);
        };
    }
    componentWillMount() {
        this._controller = LayoutController.getInstance(LayoutController);
        this._controller.initialize(null, this);
        // this.setState({x:0,y:0,scaleX:1,scaleY:1,rotate:0,  sleeve:100, leftArm: 0, rightArm: 0, belly: 0})
    }
    componentDidMount() {
        let newProps = this.props;
        if (newProps) {
            this.box = newProps.box;
            this.panel = newProps.panel;
        }
    }
    refresh() {
        this.setState({});
    }
}
exports.LayoutComponent = LayoutComponent;


/***/ }),

/***/ "./panels/ToolBar.tsx":
/*!****************************!*\
  !*** ./panels/ToolBar.tsx ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 必须写成下面的import形式，上面的这种webpack打包后会出现react.default.xxx导致报错。
// import ReactDOM from "react-dom";
// import React from "react";
Object.defineProperty(exports, "__esModule", { value: true });
const React = __webpack_require__(/*! react */ "react");
const ReactDOM = __webpack_require__(/*! react-dom */ "react-dom");
const antd_1 = __webpack_require__(/*! antd */ "antd");
const App_1 = __webpack_require__(/*! App */ "./App.ts");
const RadioGroup = antd_1.Radio.Group;
class ToolBar {
    setContainer(c) {
        this.contentElement = c;
        this.renderElement();
    }
    renderElement() {
        ReactDOM.render(React.createElement(ToolBarComponent, null), this.contentElement);
    }
}
exports.default = ToolBar;
class ToolBarController extends gmvc.ViewController {
    static toString() {
        return "[class view.ToolBarController]";
    }
    _initialize() {
    }
    saveToBoardClip() {
        let appModel = App_1.default.model;
        if (appModel && appModel.boxLayout) {
            let layoutData = appModel.boxLayout.getData();
            let layoutStr = JSON.stringify(layoutData);
            const input = document.createElement('input');
            document.body.appendChild(input);
            input.setAttribute('value', layoutStr);
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                console.log('复制成功');
                antd_1.message.info('已经把数据复制到了剪贴板！');
            }
            document.body.removeChild(input);
        }
    }
}
exports.ToolBarController = ToolBarController;
class ToolBarComponent extends React.Component {
    constructor() {
        super(...arguments);
        this.render = () => {
            return (React.createElement("div", null,
                React.createElement(antd_1.Button, { onClick: this.saveToBoarClip }, "\u4FDD\u5B58\u5230\u526A\u5207\u677F")));
        };
        this.saveToBoarClip = (e) => {
            this._controller.saveToBoardClip();
        };
    }
    componentWillMount() {
        this._controller = ToolBarController.getInstance(ToolBarController);
        this._controller.initialize(null, this);
    }
    refresh() {
        this.setState({});
    }
}
exports.ToolBarComponent = ToolBarComponent;


/***/ }),

/***/ 0:
/*!*********************!*\
  !*** multi ./index ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./index */"./index.tsx");


/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = antd;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ })

/******/ });
//# sourceMappingURL=index.js.map