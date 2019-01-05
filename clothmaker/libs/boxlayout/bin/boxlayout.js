var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var boxlayout_event;
(function (boxlayout_event) {
    var EventDispatcher = /** @class */ (function () {
        function EventDispatcher() {
            this.__z_e_listeners = {};
        }
        EventDispatcher.prototype.addEventListener = function (type, fun, thisObj, level) {
            if (level === void 0) { level = 0; }
            var list = this.__z_e_listeners[type];
            if (list === undefined) {
                list = [];
                this.__z_e_listeners[type] = list;
            }
            var item = {
                func: fun,
                context: thisObj,
                level: level
            };
            list.push(item);
            list.sort(function (a, b) {
                return b.level - a.level;
            });
        };
        ;
        EventDispatcher.prototype.removeEventListener = function (type, fun, thisObj) {
            var list = this.__z_e_listeners[type];
            if (list !== undefined) {
                var size = list.length;
                for (var i = 0; i < size; i++) {
                    var obj = list[i];
                    if (obj.func === fun && obj.context === thisObj) {
                        list.splice(i, 1);
                        return;
                    }
                }
            }
        };
        ;
        EventDispatcher.prototype.dispatchEvent = function (event) {
            var list = this.__z_e_listeners[event.type];
            if (list !== undefined) {
                var size = list.length;
                for (var i = 0; i < size; i++) {
                    var ef = list[i];
                    var fun = ef.func;
                    var context = ef.context;
                    if (context) {
                        fun.call(context, event);
                    }
                    else {
                        fun(event);
                    }
                }
            }
        };
        ;
        return EventDispatcher;
    }());
    boxlayout_event.EventDispatcher = EventDispatcher;
    var Event = /** @class */ (function () {
        function Event(type, data) {
            this.type = type;
            this.data = data;
        }
        return Event;
    }());
    boxlayout_event.Event = Event;
})(boxlayout_event || (boxlayout_event = {}));
/// <reference path="./data/EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    /**
     * 盒式布局，此容器作为盒式布局的根，可将盒式布局应用在任意指定区域
     * @author yangning
     */
    var BoxLayout = /** @class */ (function (_super) {
        __extends(BoxLayout, _super);
        function BoxLayout() {
            var _this = _super.call(this) || this;
            _this.cursorLock = false;
            _this.startMouseP = new boxlayout.Point();
            _this.startSize = new boxlayout.Point();
            ////
            ////面板信息缓存相关
            ////
            ////
            _this.closePanelInfoCache = {};
            _this.dragAreaElement = new boxlayout.DragArea();
            _this.maskElement = new boxlayout.Mask();
            _this.containerResizeHandle = _this.containerResizeHandle.bind(_this);
            _this.separatorHandle = _this.separatorHandle.bind(_this);
            _this.dragEventHandle = _this.dragEventHandle.bind(_this);
            return _this;
        }
        Object.defineProperty(BoxLayout.prototype, "rootLayoutElement", {
            //根布局元素
            get: function () {
                return this._rootLayoutElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayout.prototype, "config", {
            /**配置 */
            get: function () {
                return this._layoutConfig;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 初始化盒式布局
         * @param container 布局区域
         */
        BoxLayout.prototype.init = function (area, config) {
            this._area = area;
            this._area.style.position = "relative";
            this._area.style.zIndex = "0";
            boxlayout.HtmlElementResizeHelper.watch(this._area);
            this._area.addEventListener("resize", this.containerResizeHandle);
            this._layoutConfig = new boxlayout.LayoutConfig();
            if (config) {
                for (var key in config) {
                    this._layoutConfig[key] = config[key];
                }
            }
        };
        /**
         * 添加一个元素到跟节点
         * @param element 要添加的元素
         * @param position 位置
         */
        BoxLayout.prototype.addBoxElementToRoot = function (element, position) {
            if (position === void 0) { position = "right"; }
            if (!this.rootLayoutElement) {
                this._setMaxSize(null);
                this._rootLayoutElement = element;
                this.addToArea(this.rootLayoutElement);
                this.updateBoxElement();
                return;
            }
            this.addBoxElement(this.rootLayoutElement, element, position);
        };
        /**
         * 添加一个元素到另一个元素的旁边
         * @param target 目标元素
         * @param element 要添加的元素
         * @param position 位置
         */
        BoxLayout.prototype.addBoxElement = function (target, element, position) {
            if (position === void 0) { position = "right"; }
            if (target === element || element === this.rootLayoutElement) {
                return;
            }
            this._setMaxSize(null);
            //如果target为element的父级，那么在删除element的时候target的另一个子元素将占据target的位置，这里需要重新指定target
            if (element.parentContainer === target) {
                if (element === element.parentContainer.firstElement) {
                    target = element.parentContainer.secondElement;
                }
                else {
                    target = element.parentContainer.firstElement;
                }
            }
            //
            if (element.ownerLayout === target.ownerLayout) {
                var panels = [];
                this.getAllPanel(element, panels);
                panels.forEach(function (panel) {
                    panel.hold = true;
                });
            }
            //
            this.removeBoxElement(element);
            var newBox = new boxlayout.BoxLayoutContainer();
            switch (position) {
                case "bottom": newBox.isVertical = true;
                case "right":
                    newBox.secondElement = element;
                    break;
                case "top": newBox.isVertical = true;
                case "left":
                    newBox.firstElement = element;
                    break;
            }
            element.parentContainer = newBox;
            this.addToArea(newBox); //这里只添加新创建的元素，此刻target并没有链接到newBox中
            //
            if (element.ownerLayout === target.ownerLayout) {
                var panels = [];
                this.getAllPanel(element, panels);
                panels.forEach(function (panel) {
                    panel.hold = false;
                });
            }
            //
            if (target === this.rootLayoutElement) {
                this._rootLayoutElement = newBox;
            }
            else {
                if (target === target.parentContainer.firstElement) {
                    target.parentContainer.firstElement = newBox;
                }
                else {
                    target.parentContainer.secondElement = newBox;
                }
                newBox.parentContainer = target.parentContainer;
            }
            ////-----此段代码为了矫正尺寸增强交互体验，但不应该放在这里，应该融入布局机制中，暂时写在这
            newBox.width = target.width;
            newBox.height = target.height;
            element.width = target.width / 2;
            element.height = target.height / 2;
            target.width = target.width / 2;
            target.height = target.height / 2;
            ////-----
            target.parentContainer = newBox;
            switch (position) {
                case "bottom":
                case "right":
                    newBox.firstElement = target;
                    break;
                case "top":
                case "left":
                    newBox.secondElement = target;
                    break;
            }
            this.updateBoxElement();
        };
        /**
         * 删除一个元素
         * @param element 要删除的元素
         */
        BoxLayout.prototype.removeBoxElement = function (element) {
            if (!element.ownerLayout || element === this.rootLayoutElement) {
                return;
            }
            this._setMaxSize(null);
            //获取平级的另一个节点
            var parent = element.parentContainer;
            var anotherElement; //此节点会被挂接到新的节点上面
            var needUpdateElement;
            if (element === parent.firstElement) {
                anotherElement = parent.secondElement;
                parent.secondElement = null; //断开与anotherElement的链接
            }
            else {
                anotherElement = parent.firstElement;
                parent.firstElement = null; //断开与anotherElement的链接
            }
            if (parent === this.rootLayoutElement) {
                this._rootLayoutElement = anotherElement;
                anotherElement.parentContainer = null;
                needUpdateElement = anotherElement;
                this.rootLayoutElement.x = 0;
                this.rootLayoutElement.y = 0;
            }
            else {
                if (parent === parent.parentContainer.firstElement) {
                    parent.parentContainer.firstElement = anotherElement;
                }
                else {
                    parent.parentContainer.secondElement = anotherElement;
                }
                anotherElement.parentContainer = parent.parentContainer;
                needUpdateElement = anotherElement.parentContainer;
            }
            ////-----此段代码为了矫正尺寸增强交互体验，但不应该放在这里，应该融入布局机制中，暂时写在这
            anotherElement.width = parent.width;
            anotherElement.height = parent.height;
            ////----
            this.removeFromArae(parent); //此刻已断开与anotherElement的链接，所以anotherElement的render并没有被移除
            this._updateBoxElement(needUpdateElement);
        };
        BoxLayout.prototype.addToArea = function (element) {
            if (element) {
                element.ownerLayout = this;
                if (element instanceof boxlayout.BoxLayoutContainer) {
                    element.separator.render(this._area);
                    this.attachSeparatorOperateEvent(element.separator.root);
                    this.addToArea(element.firstElement);
                    this.addToArea(element.secondElement);
                }
                else {
                    element.render.render(this._area);
                    element.render.addEventListener(boxlayout.DragEvent.STARTDRAG, this.dragHandle, this);
                    element.render.addEventListener(boxlayout.TabGroupEvent.PANEL_REMOVING, this.panelHandle, this);
                    element.render.addEventListener(boxlayout.TabGroupEvent.PANEL_ADDED, this.panelHandle, this);
                    element.render.addEventListener(boxlayout.TabGroupEvent.PANEL_REMOVED, this.panelHandle, this);
                }
            }
        };
        BoxLayout.prototype.removeFromArae = function (element) {
            if (element) {
                if (element instanceof boxlayout.BoxLayoutContainer) {
                    element.separator.removeFromParent();
                    this.detachSeparatorOperateEvent(element.separator.root);
                    this.removeFromArae(element.firstElement);
                    this.removeFromArae(element.secondElement);
                }
                else {
                    element.render.removeFromParent();
                    element.render.removeEventListener(boxlayout.DragEvent.STARTDRAG, this.dragHandle, this);
                    element.render.removeEventListener(boxlayout.TabGroupEvent.PANEL_REMOVING, this.panelHandle, this);
                    element.render.removeEventListener(boxlayout.TabGroupEvent.PANEL_ADDED, this.panelHandle, this);
                    element.render.removeEventListener(boxlayout.TabGroupEvent.PANEL_REMOVED, this.panelHandle, this);
                }
                element.ownerLayout = null;
            }
        };
        Object.defineProperty(BoxLayout.prototype, "maxSizeElement", {
            get: function () {
                return this._maxSizeElement;
            },
            enumerable: true,
            configurable: true
        });
        BoxLayout.prototype.setMaxSize = function (v) {
            this._setMaxSize(v);
            this.updateBoxElement();
        };
        BoxLayout.prototype._setMaxSize = function (v) {
            if (this._maxSizeElement) {
                this._maxSizeElement.render.setMaxSize(false);
                this._maxSizeElement.width = this.cacheWidth;
                this._maxSizeElement.height = this.cacheHeight;
            }
            this._maxSizeElement = v;
            if (this._maxSizeElement) {
                this._maxSizeElement.render.setMaxSize(true);
                this.cacheWidth = this._maxSizeElement.width;
                this.cacheHeight = this._maxSizeElement.height;
            }
        };
        BoxLayout.prototype.updateBoxElement = function () {
            var element = this.maxSizeElement ? this.maxSizeElement : this.rootLayoutElement;
            element.x = 0;
            element.y = 0;
            element.width = this._area.offsetWidth;
            element.height = this._area.offsetHeight;
            this._updateBoxElement(element);
        };
        BoxLayout.prototype._updateBoxElement = function (element) {
            element.updateRenderDisplay();
        };
        BoxLayout.prototype.containerResizeHandle = function (e) {
            if (this.rootLayoutElement) {
                this.updateBoxElement();
            }
        };
        ////
        ////分割条操作逻辑
        ////
        BoxLayout.prototype.attachSeparatorOperateEvent = function (element) {
            element.addEventListener("mouseenter", this.separatorHandle);
            element.addEventListener("mouseleave", this.separatorHandle);
            element.addEventListener("mousedown", this.separatorHandle);
        };
        BoxLayout.prototype.detachSeparatorOperateEvent = function (element) {
            element.removeEventListener("mouseenter", this.separatorHandle);
            element.removeEventListener("mouseleave", this.separatorHandle);
            element.removeEventListener("mousedown", this.separatorHandle);
        };
        BoxLayout.prototype.separatorHandle = function (e) {
            var container = e.currentTarget["__owner"];
            switch (e.type) {
                case "mouseenter":
                    if (!this.cursorLock) {
                        if (container.isVertical) {
                            this._area.style.cursor = "row-resize";
                        }
                        else {
                            this._area.style.cursor = "col-resize";
                        }
                    }
                    break;
                case "mouseleave":
                    if (!this.cursorLock) {
                        this._area.style.cursor = "default";
                    }
                    break;
                case "mousedown":
                    this.cursorLock = true;
                    this.startMouseP.x = e.clientX;
                    this.startMouseP.y = e.clientY;
                    this.startSize.x = container.lockElement.width;
                    this.startSize.y = container.lockElement.height;
                    this.targetContainer = container;
                    window.addEventListener("mouseup", this.separatorHandle, true);
                    window.addEventListener("mousemove", this.separatorHandle, true);
                    break;
                case "mousemove":
                    e.stopPropagation();
                    e.preventDefault();
                    var vx = e.clientX - this.startMouseP.x;
                    var vy = e.clientY - this.startMouseP.y;
                    if (this.targetContainer.isVertical) {
                        if (this.targetContainer.lockElement === this.targetContainer.firstElement)
                            this.targetContainer.lockElement.height = this.startSize.y + vy;
                        else
                            this.targetContainer.lockElement.height = this.startSize.y - vy;
                    }
                    else {
                        if (this.targetContainer.lockElement === this.targetContainer.firstElement)
                            this.targetContainer.lockElement.width = this.startSize.x + vx;
                        else
                            this.targetContainer.lockElement.width = this.startSize.x - vx;
                    }
                    this._updateBoxElement(this.targetContainer);
                    break;
                case "mouseup":
                    e.stopPropagation();
                    e.preventDefault();
                    this.cursorLock = false;
                    this._area.style.cursor = "default";
                    window.removeEventListener("mousemove", this.separatorHandle, true);
                    window.removeEventListener("mouseup", this.separatorHandle, true);
                    break;
            }
        };
        BoxLayout.prototype.panelHandle = function (e) {
            switch (e.type) {
                case boxlayout.TabGroupEvent.PANEL_REMOVING:
                    this.cachePanelInfo(e.data['panel'], e.data['tabGroup']);
                case boxlayout.TabGroupEvent.PANEL_REMOVED:
                case boxlayout.TabGroupEvent.PANEL_ADDED:
                    this.dispatchEvent(new boxlayout.BoxLayoutEvent(e.type, e.data));
                    break;
            }
        };
        BoxLayout.prototype.cachePanelInfo = function (panel, group) {
            var link = [];
            this.getDirLink(group.ownerElement, link);
            this.closePanelInfoCache[panel.id] = link;
        };
        BoxLayout.prototype.getOldSpace = function (panelId) {
            var link = this.closePanelInfoCache[panelId];
            if (link) {
                var element = this.getElementByLink(link);
                if (element) {
                    return element.render;
                }
                var dir = link.pop();
                element = this.getElementByLink(link);
                if (!element && link.length === 0) {
                    element = this.rootLayoutElement;
                }
                if (element) {
                    var newElement = new boxlayout.BoxLayoutElement();
                    this.addBoxElement(element, newElement, dir);
                    return newElement.render;
                }
            }
            return null;
        };
        BoxLayout.prototype.getDirLink = function (element, result) {
            var parent = element.parentContainer;
            if (parent) {
                var isFirst = parent.firstElement === element;
                var isVertical = parent.isVertical;
                if (isFirst && isVertical) {
                    result.splice(0, 0, "top");
                }
                else if (!isFirst && isVertical) {
                    result.splice(0, 0, "bottom");
                }
                else if (isFirst && !isVertical) {
                    result.splice(0, 0, "left");
                }
                else if (!isFirst && !isVertical) {
                    result.splice(0, 0, "right");
                }
                this.getDirLink(parent, result);
            }
        };
        BoxLayout.prototype.getElementByLink = function (link) {
            if (link.length === 0)
                return null;
            var currentElement = this.rootLayoutElement;
            for (var i = 0; i < link.length; i++) {
                switch (link[i]) {
                    case "top":
                        if (currentElement instanceof boxlayout.BoxLayoutContainer && currentElement.isVertical === true) {
                            currentElement = currentElement.firstElement;
                        }
                        else {
                            return null;
                        }
                        break;
                    case "bottom":
                        if (currentElement instanceof boxlayout.BoxLayoutContainer && currentElement.isVertical === true) {
                            currentElement = currentElement.secondElement;
                        }
                        else {
                            return null;
                        }
                        break;
                    case "left":
                        if (currentElement instanceof boxlayout.BoxLayoutContainer && currentElement.isVertical === false) {
                            currentElement = currentElement.firstElement;
                        }
                        else {
                            return null;
                        }
                        break;
                    case "right":
                        if (currentElement instanceof boxlayout.BoxLayoutContainer && currentElement.isVertical === false) {
                            currentElement = currentElement.secondElement;
                        }
                        else {
                            return null;
                        }
                        break;
                }
            }
            if (currentElement === this.rootLayoutElement) {
                return null;
            }
            return currentElement;
        };
        BoxLayout.prototype.dragHandle = function (e) {
            switch (e.type) {
                case boxlayout.DragEvent.STARTDRAG:
                    this.dragInfo = e.data;
                    this.attachDragEvent();
                    this.maskElement.render(this._area);
                    this.maskElement.setBounds(this.rootLayoutElement.x, this.rootLayoutElement.y, this.rootLayoutElement.width, this.rootLayoutElement.height);
                    break;
            }
        };
        BoxLayout.prototype.attachDragEvent = function () {
            window.addEventListener("mousemove", this.dragEventHandle, false);
            window.addEventListener("mouseup", this.dragEventHandle, true);
        };
        BoxLayout.prototype.detachDragEvent = function () {
            window.removeEventListener("mousemove", this.dragEventHandle, false);
            window.removeEventListener("mouseup", this.dragEventHandle, true);
        };
        BoxLayout.prototype.dragEventHandle = function (e) {
            e.stopPropagation();
            e.preventDefault();
            switch (e.type) {
                case "mousemove":
                    if (!this.dragAreaElement.root.parentElement) {
                        this.dragAreaElement.render(document.body);
                    }
                    var dragRender = this.getOneDragRenderWithMouseEvent(e);
                    if (dragRender) {
                        dragRender.adjustDragInfo(e, this.dragInfo);
                    }
                    else {
                        //如果没有dragRender则可能鼠标超出布局范围
                    }
                    this.dragAreaElement.setBounds(this.dragInfo.dragRange.x, this.dragInfo.dragRange.y, this.dragInfo.dragRange.width, this.dragInfo.dragRange.height);
                    break;
                case "mouseup":
                    this.detachDragEvent();
                    this.dragAreaElement.removeFromParent();
                    this.maskElement.removeFromParent();
                    var render = this.getOneDragRenderWithMouseEvent(e);
                    if (render) {
                        render.acceptDragInfo(this.dragInfo);
                    }
                    break;
            }
        };
        BoxLayout.prototype.getOneDragRenderWithMouseEvent = function (e) {
            function getAllElementRange(element, result) {
                if (element) {
                    if (element instanceof boxlayout.BoxLayoutContainer) {
                        getAllElementRange(element.firstElement, result);
                        getAllElementRange(element.secondElement, result);
                    }
                    else {
                        result.push({ range: new boxlayout.Rectangle(element.x, element.y, element.width, element.height), target: element });
                    }
                }
            }
            var localP = boxlayout.MatrixUtil.globalToLocal(this._area, new boxlayout.Point(e.clientX, e.clientY));
            var allRange = new Array();
            getAllElementRange(this.rootLayoutElement, allRange);
            for (var i = 0; i < allRange.length; i++) {
                if (allRange[i].range.containsPoint(localP)) {
                    return allRange[i].target.render;
                }
            }
            return null;
        };
        BoxLayout.prototype.getAllElement = function (element, result) {
            if (element) {
                if (element instanceof boxlayout.BoxLayoutContainer) {
                    this.getAllElement(element.firstElement, result);
                    this.getAllElement(element.secondElement, result);
                }
                else {
                    result.push(element);
                }
            }
        };
        /**注册面板
         * 与面板ID相关的api会用到注册信息
         */
        BoxLayout.registPanel = function (panel) {
            this.panelDic[panel.id] = panel;
        };
        /**根据ID获取一个已注册的面板 */
        BoxLayout.getRegistPanelById = function (id) {
            return this.panelDic[id];
        };
        /**
         * 根据Id打开一个面板
         * @param panelId 面板ID
         * @param oldSpace 是否尝试在原来的区域打开，如果布局发生较大的变化可能出现原始位置寻找错误的情况，打开默认为false
         */
        BoxLayout.prototype.openPanelById = function (panelId, oldSpace) {
            if (oldSpace === void 0) { oldSpace = false; }
            var panel = BoxLayout.getRegistPanelById(panelId);
            if (!panel) {
                throw new Error("ID为 " + panelId + " 的面板未注册");
            }
            if (!this.rootLayoutElement) {
                this.addBoxElementToRoot(new boxlayout.BoxLayoutElement());
            }
            var all = [];
            this.getAllElement(this.rootLayoutElement, all);
            for (var i = 0; i < all.length; i++) {
                var group = all[i].render;
                for (var k = 0; k < group.panels.length; k++) {
                    if (group.panels[k].id === panelId) {
                        group.selectedIndex = k;
                        return;
                    }
                }
            }
            if (oldSpace) {
                //寻找原始位置添加面板
                var oldSpaceGroup = this.getOldSpace(panel.id);
                if (oldSpaceGroup) {
                    this.setHoldValue([oldSpaceGroup], true);
                    oldSpaceGroup.addPanel(panel);
                    this.setHoldValue([oldSpaceGroup], false);
                    return;
                }
            }
            //未发现原始位置则在第一个元素里面添加面板
            var firstElement = this.getFirstElement(this.rootLayoutElement);
            if (firstElement) {
                this.setHoldValue([firstElement.render], true);
                firstElement.render.addPanel(panel);
                this.setHoldValue([firstElement.render], true);
            }
        };
        /**
         * 根据Id关闭一个面板
         * @param panelId 面板ID
         */
        BoxLayout.prototype.closePanelById = function (panelId) {
            var panel = BoxLayout.getRegistPanelById(panelId);
            if (!panel) {
                throw new Error("ID为 " + panelId + " 的面板未注册");
            }
            var all = [];
            this.getAllElement(this.rootLayoutElement, all);
            for (var i = 0; i < all.length; i++) {
                var group = all[i].render;
                this.setHoldValue([group], true);
                var targetPanel = void 0;
                b: for (var k = 0; k < group.panels.length; k++) {
                    if (group.panels[k].id === panelId) {
                        targetPanel = group.panels[k];
                        group.panels[k].hold = false;
                        group.removePanel(group.panels[k]);
                        break b;
                    }
                }
                this.setHoldValue([group], false);
                if (group.panels.length === 0) {
                    group.ownerElement.ownerLayout.removeBoxElement(group.ownerElement);
                }
            }
        };
        /**获取所有已打开的面板 */
        BoxLayout.prototype.getAllOpenPanels = function () {
            var result = [];
            this.getAllElement(this.rootLayoutElement, result);
            var panels = [];
            result.forEach(function (element) {
                panels = panels.concat(element.render.panels);
            });
            return panels;
        };
        /**检查某个面板是否打开 */
        BoxLayout.prototype.checkPanelOpenedById = function (panelId) {
            var panels = this.getAllOpenPanels();
            for (var i = 0; i < panels.length; i++) {
                if (panels[i].id === panelId) {
                    return true;
                }
            }
            return false;
        };
        BoxLayout.prototype.getFirstElement = function (element) {
            if (element instanceof boxlayout.BoxLayoutContainer) {
                return this.getFirstElement(element.firstElement);
            }
            return element;
        };
        BoxLayout.prototype.setHoldValue = function (groups, value) {
            groups.forEach(function (group) {
                group.panels.forEach(function (panel) {
                    panel.hold = value;
                });
            });
        };
        /**
         *  获取面板所在的布局元素
         * @param panelId 面板ID
         */
        BoxLayout.prototype.getElementByPanelId = function (panelId) {
            if (!this.rootLayoutElement) {
                return null;
            }
            var all = [];
            this.getAllElement(this.rootLayoutElement, all);
            for (var i = 0; i < all.length; i++) {
                var group = all[i].render;
                for (var k = 0; k < group.panels.length; k++) {
                    if (group.panels[k].id === panelId) {
                        return all[i];
                    }
                }
            }
            return null;
        };
        /**
         * 根据布局配置立刻重新布局所有元素
         * @param config
         */
        BoxLayout.prototype.applyLayoutConfig = function (config) {
            function praseConfig(node) {
                var element;
                switch (node["type"]) {
                    case "BoxLayoutContainer":
                        element = new boxlayout.BoxLayoutContainer();
                        element.isVertical = node["isVertical"];
                        element.x = node["bounds"].x;
                        element.y = node["bounds"].y;
                        element.width = node["bounds"].width;
                        element.height = node["bounds"].height;
                        element.firstElement = praseConfig(node["firstElement"]);
                        element.firstElement.parentContainer = element;
                        element.secondElement = praseConfig(node["secondElement"]);
                        element.secondElement.parentContainer = element;
                        break;
                    case "BoxLayoutElement":
                        element = new boxlayout.BoxLayoutElement();
                        element.x = node["bounds"].x;
                        element.y = node["bounds"].y;
                        element.width = node["bounds"].width;
                        element.height = node["bounds"].height;
                        var panels = [];
                        for (var i = 0; i < node["render"]["panels"].length; i++) {
                            var panelId = node["render"]["panels"][i];
                            var panel = BoxLayout.getRegistPanelById(panelId);
                            if (!panel) {
                                throw new Error("ID为 " + panelId + " 的面板未注册");
                            }
                            panels.push(panel);
                        }
                        element.render.panels = panels;
                        element.render.selectedIndex = node["render"]["selectedIndex"];
                        break;
                }
                return element;
            }
            var obj = JSON.parse(config);
            var element = praseConfig(obj);
            var newPanels = [];
            this.getAllPanel(element, newPanels);
            var oldPanels = [];
            this.getAllPanel(this.rootLayoutElement, oldPanels);
            var samePanels = [];
            for (var i = 0; i < newPanels.length; i++) {
                for (var k = 0; k < oldPanels.length; k++) {
                    if (newPanels[i] === oldPanels[k]) {
                        samePanels.push(newPanels[i]);
                        newPanels[i].hold = true;
                    }
                }
            }
            if (this.rootLayoutElement) {
                this.removeFromArae(this.rootLayoutElement);
                this._rootLayoutElement = null;
            }
            this.addBoxElementToRoot(element);
            samePanels.forEach(function (panel) {
                panel.hold = false;
            });
        };
        BoxLayout.prototype.getAllPanel = function (element, result) {
            if (element instanceof boxlayout.BoxLayoutContainer) {
                this.getAllPanel(element.firstElement, result);
                this.getAllPanel(element.secondElement, result);
            }
            else if (element instanceof boxlayout.BoxLayoutElement) {
                var panels = element.render.panels;
                panels.forEach(function (panel) {
                    result.push(panel);
                });
            }
        };
        /**
         * 获取当前布局信息
         */
        BoxLayout.prototype.getLayoutConfig = function () {
            function getConfig(element) {
                var config = {};
                if (element instanceof boxlayout.BoxLayoutContainer) {
                    config["type"] = "BoxLayoutContainer";
                    config["isVertical"] = element.isVertical;
                    config["bounds"] = { x: element.x, y: element.y, width: element.width, height: element.height };
                    config["firstElement"] = getConfig(element.firstElement);
                    config["secondElement"] = getConfig(element.secondElement);
                }
                else {
                    config["type"] = "BoxLayoutElement";
                    config["bounds"] = { x: element.x, y: element.y, width: element.width, height: element.height };
                    var renderConfig = {};
                    var group = element.render;
                    renderConfig["selectedIndex"] = group.selectedIndex;
                    renderConfig["panels"] = [];
                    for (var i = 0; i < group.panels.length; i++) {
                        renderConfig["panels"].push(group.panels[i].id);
                    }
                    config["render"] = renderConfig;
                }
                return config;
            }
            if (this.rootLayoutElement) {
                return JSON.stringify(getConfig(this.rootLayoutElement));
            }
            return null;
        };
        ////
        ////
        ////
        ////
        BoxLayout.panelDic = {};
        return BoxLayout;
    }(boxlayout_event.EventDispatcher));
    boxlayout.BoxLayout = BoxLayout;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var BoxLayoutElement = /** @class */ (function () {
        function BoxLayoutElement() {
            this._x = 0;
            this._width = 0;
            this._height = 0;
            this._explicitWidth = 0;
            this._explicitHeight = 0;
            this._minSize = 50;
            this._isDocument = false;
            this._render = new boxlayout.TabGroup();
            ;
            this._render.ownerElement = this;
        }
        Object.defineProperty(BoxLayoutElement.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (v) {
                this._width = v;
                this._explicitWidth = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (v) {
                this._height = v;
                this._explicitHeight = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "explicitWidth", {
            get: function () {
                return this._explicitWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "explicitHeight", {
            get: function () {
                return this._explicitHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "minSize", {
            get: function () {
                return this._minSize;
            },
            set: function (v) {
                this._minSize = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "ownerLayout", {
            get: function () {
                return this._ownerLayout;
            },
            set: function (v) {
                this._ownerLayout = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "isDocument", {
            get: function () {
                var panels = this.render.panels;
                for (var i = 0; i < panels.length; i++) {
                    if (panels[i].isDocumentPanel) {
                        return true;
                    }
                }
                return this._isDocument;
            },
            set: function (v) {
                this._isDocument = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "parentContainer", {
            get: function () {
                return this._parentContainer;
            },
            set: function (v) {
                this._parentContainer = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutElement.prototype, "render", {
            get: function () {
                return this._render;
            },
            enumerable: true,
            configurable: true
        });
        BoxLayoutElement.prototype.setLayoutSize = function (width, height) {
            this._width = width;
            this._height = height;
        };
        BoxLayoutElement.prototype.updateRenderDisplay = function () {
            this.render.setBounds(this.x, this.y, this.width, this.height);
        };
        return BoxLayoutElement;
    }());
    boxlayout.BoxLayoutElement = BoxLayoutElement;
})(boxlayout || (boxlayout = {}));
/// <reference path="./BoxLayoutElement.ts" />
var boxlayout;
(function (boxlayout) {
    var BoxLayoutContainer = /** @class */ (function (_super) {
        __extends(BoxLayoutContainer, _super);
        function BoxLayoutContainer() {
            var _this = _super.call(this) || this;
            _this.separatorSize = 6;
            _this._isVertical = false;
            _this.gap = 1;
            _this._separator = new boxlayout.Separator();
            _this._separator.root['__owner'] = _this;
            return _this;
        }
        Object.defineProperty(BoxLayoutContainer.prototype, "isVertical", {
            get: function () {
                return this._isVertical;
            },
            set: function (v) {
                this._isVertical = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "firstElement", {
            get: function () {
                return this._firstElement;
            },
            set: function (v) {
                this._firstElement = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "secondElement", {
            get: function () {
                return this._secondElement;
            },
            set: function (v) {
                this._secondElement = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "separator", {
            get: function () {
                return this._separator;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "minSize", {
            //重写
            get: function () {
                return this.firstElement.minSize + this.secondElement.minSize;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "render", {
            //重写
            get: function () {
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "isDocument", {
            //重写
            get: function () {
                return this.firstElement.isDocument || this.secondElement.isDocument;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "lockElement", {
            get: function () {
                if (this.firstElement.isDocument) {
                    return this.secondElement;
                }
                return this.firstElement;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxLayoutContainer.prototype, "stretchElement", {
            get: function () {
                if (this.firstElement.isDocument) {
                    return this.firstElement;
                }
                return this.secondElement;
            },
            enumerable: true,
            configurable: true
        });
        //重写
        BoxLayoutContainer.prototype.updateRenderDisplay = function () {
            //如果初始化时为根节点则两个子节点都不存在
            if (!this.firstElement || !this.secondElement) {
                return;
            }
            //保持lockElement的尺寸，伸缩stretchElement的尺寸
            //纵向排列firstElement处于上方，横向排列firstElement处于左方
            var lockElement = this.lockElement;
            var stretchElement = this.stretchElement;
            if (this.isVertical) {
                lockElement.setLayoutSize(this.width, Math.max(lockElement.minSize, Math.min(this.height - stretchElement.minSize, lockElement.explicitHeight)));
                stretchElement.setLayoutSize(this.width, this.height - lockElement.height - this.gap);
                this.firstElement.x = this.x;
                this.firstElement.y = this.y;
                this.secondElement.x = this.x;
                this.secondElement.y = this.y + this.firstElement.height + this.gap;
                this.separator.setBounds(this.x, this.firstElement.y + this.firstElement.height - this.separatorSize / 2, this.width, this.separatorSize);
            }
            else {
                lockElement.setLayoutSize(Math.max(lockElement.minSize, Math.min(this.width - stretchElement.minSize, lockElement.explicitWidth)), this.height);
                stretchElement.setLayoutSize(this.width - lockElement.width - this.gap, this.height);
                this.firstElement.x = this.x;
                this.firstElement.y = this.y;
                this.secondElement.y = this.y;
                this.secondElement.x = this.x + this.firstElement.width + this.gap;
                this.separator.setBounds(this.firstElement.x + this.firstElement.width - this.separatorSize / 2, this.y, this.separatorSize, this.height);
            }
            this.firstElement.updateRenderDisplay();
            this.secondElement.updateRenderDisplay();
        };
        return BoxLayoutContainer;
    }(boxlayout.BoxLayoutElement));
    boxlayout.BoxLayoutContainer = BoxLayoutContainer;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var BoxLayoutEvent = /** @class */ (function (_super) {
        __extends(BoxLayoutEvent, _super);
        function BoxLayoutEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        BoxLayoutEvent.PANEL_ADDED = "tabgroupevent_paneladded";
        BoxLayoutEvent.PANEL_REMOVING = "tabgroupevent_panelremoving";
        BoxLayoutEvent.PANEL_REMOVED = "tabgroupevent_panelremoved";
        BoxLayoutEvent.CONFIG_CHANGED = "boxlayout_configchange";
        return BoxLayoutEvent;
    }(boxlayout_event.Event));
    boxlayout.BoxLayoutEvent = BoxLayoutEvent;
})(boxlayout || (boxlayout = {}));
/// <reference path="./EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    var DragEvent = /** @class */ (function (_super) {
        __extends(DragEvent, _super);
        function DragEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        DragEvent.STARTDRAG = 'dragevent_startdrag';
        return DragEvent;
    }(boxlayout_event.Event));
    boxlayout.DragEvent = DragEvent;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var DragInfo = /** @class */ (function () {
        function DragInfo() {
            /**拖拽的区域 */
            this.dragRange = new boxlayout.Rectangle();
            this.otherData = {};
        }
        return DragInfo;
    }());
    boxlayout.DragInfo = DragInfo;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    /**
     * 布局配置文件
     */
    var LayoutConfig = /** @class */ (function (_super) {
        __extends(LayoutConfig, _super);
        function LayoutConfig() {
            var _this = _super.call(this) || this;
            _this._useTabMenu = true;
            return _this;
        }
        Object.defineProperty(LayoutConfig.prototype, "useTabMenu", {
            /**是否使用选项卡菜单 */
            get: function () {
                return this._useTabMenu;
            },
            set: function (v) {
                if (this._useTabMenu !== v) {
                    this._useTabMenu = v;
                    this.dispatchEvent(new boxlayout.BoxLayoutEvent(boxlayout.BoxLayoutEvent.CONFIG_CHANGED));
                }
            },
            enumerable: true,
            configurable: true
        });
        return LayoutConfig;
    }(boxlayout_event.EventDispatcher));
    boxlayout.LayoutConfig = LayoutConfig;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var Matrix = /** @class */ (function () {
        function Matrix(a, b, c, d, tx, ty) {
            if (a === void 0) { a = 1; }
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 1; }
            if (tx === void 0) { tx = 0; }
            if (ty === void 0) { ty = 0; }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        }
        Matrix.prototype.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);
        };
        Matrix.prototype.concat = function (target) {
            var a = this.a * target.a;
            var b = 0.0;
            var c = 0.0;
            var d = this.d * target.d;
            var tx = this.tx * target.a + target.tx;
            var ty = this.ty * target.d + target.ty;
            if (this.b !== 0.0 || this.c !== 0.0 || target.b !== 0.0 || target.c !== 0.0) {
                a += this.b * target.c;
                d += this.c * target.b;
                b += this.a * target.b + this.b * target.d;
                c += this.c * target.a + this.d * target.c;
                tx += this.ty * target.c;
                ty += this.tx * target.b;
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        /**
         * @private
         */
        Matrix.prototype.$preConcat = function (target) {
            var a = target.a * this.a;
            var b = 0.0;
            var c = 0.0;
            var d = target.d * this.d;
            var tx = target.tx * this.a + this.tx;
            var ty = target.ty * this.d + this.ty;
            if (target.b !== 0.0 || target.c !== 0.0 || this.b !== 0.0 || this.c !== 0.0) {
                a += target.b * this.c;
                d += target.c * this.b;
                b += target.a * this.b + target.b * this.d;
                c += target.c * this.a + target.d * this.c;
                tx += target.ty * this.c;
                ty += target.tx * this.b;
            }
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        Matrix.prototype.copyFrom = function (target) {
            this.a = target.a;
            this.b = target.b;
            this.c = target.c;
            this.d = target.d;
            this.tx = target.tx;
            this.ty = target.ty;
        };
        Matrix.prototype.identity = function () {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
        };
        Matrix.prototype.invert = function () {
            this.$invertInto(this);
        };
        Matrix.prototype.$invertInto = function (target) {
            var a = this.a;
            var b = this.b;
            var c = this.c;
            var d = this.d;
            var tx = this.tx;
            var ty = this.ty;
            if (b === 0 && c === 0) {
                target.b = target.c = 0;
                if (a === 0 || d === 0) {
                    target.a = target.d = target.tx = target.ty = 0;
                }
                else {
                    a = target.a = 1 / a;
                    d = target.d = 1 / d;
                    target.tx = -a * tx;
                    target.ty = -d * ty;
                }
                return;
            }
            var determinant = a * d - b * c;
            if (determinant === 0) {
                target.identity();
                return;
            }
            determinant = 1 / determinant;
            var k = target.a = d * determinant;
            b = target.b = -b * determinant;
            c = target.c = -c * determinant;
            d = target.d = a * determinant;
            target.tx = -(k * tx + c * ty);
            target.ty = -(b * tx + d * ty);
        };
        Matrix.prototype.rotate = function (angle) {
            angle = +angle;
            if (angle !== 0) {
                angle = angle / (Math.PI / 180);
                var u = boxlayout.NumberUtil.cos(angle);
                var v = boxlayout.NumberUtil.sin(angle);
                var ta = this.a;
                var tb = this.b;
                var tc = this.c;
                var td = this.d;
                var ttx = this.tx;
                var tty = this.ty;
                this.a = ta * u - tb * v;
                this.b = ta * v + tb * u;
                this.c = tc * u - td * v;
                this.d = tc * v + td * u;
                this.tx = ttx * u - tty * v;
                this.ty = ttx * v + tty * u;
            }
        };
        Matrix.prototype.scale = function (sx, sy) {
            if (sx !== 1) {
                this.a *= sx;
                this.c *= sx;
                this.tx *= sx;
            }
            if (sy !== 1) {
                this.b *= sy;
                this.d *= sy;
                this.ty *= sy;
            }
        };
        Matrix.prototype.setTo = function (a, b, c, d, tx, ty) {
            this.a = a;
            this.b = b;
            this.c = c;
            this.d = d;
            this.tx = tx;
            this.ty = ty;
        };
        Matrix.prototype.transformPoint = function (pointX, pointY, resultPoint) {
            var x = this.a * pointX + this.c * pointY + this.tx;
            var y = this.b * pointX + this.d * pointY + this.ty;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new boxlayout.Point(x, y);
        };
        Matrix.prototype.deltaTransformPoint = function (pointX, pointY, resultPoint) {
            var x = this.a * pointX + this.c * pointY;
            var y = this.b * pointX + this.d * pointY;
            if (resultPoint) {
                resultPoint.setTo(x, y);
                return resultPoint;
            }
            return new boxlayout.Point(x, y);
        };
        Matrix.prototype.translate = function (dx, dy) {
            this.tx += dx;
            this.ty += dy;
        };
        Matrix.prototype.equals = function (target) {
            return this.a === target.a && this.b === target.b &&
                this.c === target.c && this.d === target.d &&
                this.tx === target.tx && this.ty === target.ty;
        };
        Matrix.prototype.prepend = function (a, b, c, d, tx, ty) {
            var tx1 = this.tx;
            if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
                var a1 = this.a;
                var c1 = this.c;
                this.a = a1 * a + this.b * c;
                this.b = a1 * b + this.b * d;
                this.c = c1 * a + this.d * c;
                this.d = c1 * b + this.d * d;
            }
            this.tx = tx1 * a + this.ty * c + tx;
            this.ty = tx1 * b + this.ty * d + ty;
        };
        Matrix.prototype.append = function (a, b, c, d, tx, ty) {
            var a1 = this.a;
            var b1 = this.b;
            var c1 = this.c;
            var d1 = this.d;
            if (a !== 1 || b !== 0 || c !== 0 || d !== 1) {
                this.a = a * a1 + b * c1;
                this.b = a * b1 + b * d1;
                this.c = c * a1 + d * c1;
                this.d = c * b1 + d * d1;
            }
            this.tx = tx * a1 + ty * c1 + this.tx;
            this.ty = tx * b1 + ty * d1 + this.ty;
        };
        Matrix.prototype.toString = function () {
            return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")";
        };
        Matrix.prototype.createBox = function (scaleX, scaleY, rotation, tx, ty) {
            if (rotation === void 0) {
                rotation = 0;
            }
            if (tx === void 0) {
                tx = 0;
            }
            if (ty === void 0) {
                ty = 0;
            }
            var self = this;
            if (rotation !== 0) {
                rotation = rotation / (Math.PI / 180);
                var u = boxlayout.NumberUtil.cos(rotation);
                var v = boxlayout.NumberUtil.sin(rotation);
                self.a = u * scaleX;
                self.b = v * scaleY;
                self.c = -v * scaleX;
                self.d = u * scaleY;
            }
            else {
                self.a = scaleX;
                self.b = 0;
                self.c = 0;
                self.d = scaleY;
            }
            self.tx = tx;
            self.ty = ty;
        };
        Matrix.prototype.createGradientBox = function (width, height, rotation, tx, ty) {
            if (rotation === void 0) {
                rotation = 0;
            }
            if (tx === void 0) {
                tx = 0;
            }
            if (ty === void 0) {
                ty = 0;
            }
            this.createBox(width / 1638.4, height / 1638.4, rotation, tx + width / 2, ty + height / 2);
        };
        /**
         * @private
         */
        Matrix.prototype.$getDeterminant = function () {
            return this.a * this.d - this.b * this.c;
        };
        ;
        /**
         * @private
         */
        Matrix.prototype.$getScaleX = function () {
            var m = this;
            if (m.a === 1 && m.b === 0) {
                return 1;
            }
            var result = Math.sqrt(m.a * m.a + m.b * m.b);
            return this.$getDeterminant() < 0 ? -result : result;
        };
        ;
        /**
         * @private
         */
        Matrix.prototype.$getScaleY = function () {
            var m = this;
            if (m.c === 0 && m.d === 1) {
                return 1;
            }
            var result = Math.sqrt(m.c * m.c + m.d * m.d);
            return this.$getDeterminant() < 0 ? -result : result;
        };
        ;
        /**
         * @private
         */
        Matrix.prototype.$getSkewX = function () {
            return Math.atan2(this.d, this.c) - (Math.PI / 2);
        };
        ;
        /**
         * @private
         */
        Matrix.prototype.$getSkewY = function () {
            return Math.atan2(this.b, this.a);
        };
        ;
        /**
         * @private
         */
        Matrix.prototype.$getRotation = function (angle) {
            angle %= 360;
            if (angle > 180) {
                angle -= 360;
            }
            else if (angle < -180) {
                angle += 360;
            }
            return angle;
        };
        ;
        return Matrix;
    }());
    boxlayout.Matrix = Matrix;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var Point = /** @class */ (function () {
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Point.prototype.setTo = function (x, y) {
            this.x = x;
            this.y = y;
        };
        Point.prototype.clone = function () {
            return new Point(this.x, this.y);
        };
        Point.prototype.toString = function () {
            return '(x:' + this.x + ',y:' + this.y + ')';
        };
        return Point;
    }());
    boxlayout.Point = Point;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var Rectangle = /** @class */ (function () {
        function Rectangle(x, y, width, height) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (width === void 0) { width = 0; }
            if (height === void 0) { height = 0; }
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Rectangle.prototype.containsPoint = function (point) {
            if (this.x <= point.x
                && this.x + this.width > point.x
                && this.y <= point.y
                && this.y + this.height > point.y) {
                return true;
            }
            return false;
        };
        Rectangle.prototype.containsRect = function (rect) {
            var r1 = rect.x + rect.width;
            var b1 = rect.y + rect.height;
            var r2 = this.x + this.width;
            var b2 = this.y + this.height;
            return (rect.x >= this.x) && (rect.x < r2) && (rect.y >= this.y) && (rect.y < b2) && (r1 > this.x) && (r1 <= r2) && (b1 > this.y) && (b1 <= b2);
        };
        ;
        Rectangle.prototype.clone = function () {
            return new Rectangle(this.x, this.y, this.width, this.height);
        };
        return Rectangle;
    }());
    boxlayout.Rectangle = Rectangle;
})(boxlayout || (boxlayout = {}));
/// <reference path="./EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    var TabBarEvent = /** @class */ (function (_super) {
        __extends(TabBarEvent, _super);
        function TabBarEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        TabBarEvent.CHANGE = 'tabbarevent_change';
        TabBarEvent.BEGINDRAG = 'tabbarevent_begindrag';
        TabBarEvent.MENUSELECTED = 'tabbarevent_menuselected';
        TabBarEvent.ITEMDOUBLECLICK = 'tabbarevent_itemdoubleclick';
        return TabBarEvent;
    }(boxlayout_event.Event));
    boxlayout.TabBarEvent = TabBarEvent;
})(boxlayout || (boxlayout = {}));
/// <reference path="./EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    var TabGroupEvent = /** @class */ (function (_super) {
        __extends(TabGroupEvent, _super);
        function TabGroupEvent(type, data) {
            return _super.call(this, type, data) || this;
        }
        TabGroupEvent.PANEL_ADDED = "tabgroupevent_paneladded";
        TabGroupEvent.PANEL_REMOVING = "tabgroupevent_panelremoving";
        TabGroupEvent.PANEL_REMOVED = "tabgroupevent_panelremoved";
        return TabGroupEvent;
    }(boxlayout_event.Event));
    boxlayout.TabGroupEvent = TabGroupEvent;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var DragArea = /** @class */ (function () {
        function DragArea() {
            this._root = document.createElement('div');
            this._root.style.position = "absolute";
            this._root.style.background = "rgba(255,255,255,0.1)";
            this._root.style.border = "2px solid rgba(0, 184, 255, 0.26)";
            this._root.style.pointerEvents = "none";
            this._root.style.boxSizing = "border-box";
        }
        Object.defineProperty(DragArea.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        DragArea.prototype.render = function (container) {
            this.container = container;
            this.container.appendChild(this.root);
        };
        DragArea.prototype.removeFromParent = function () {
            if (this.container) {
                this.container.removeChild(this.root);
            }
        };
        DragArea.prototype.setBounds = function (x, y, width, height) {
            this.root.style.width = width + 'px';
            this.root.style.height = height + 'px';
            this.root.style.left = x + 'px';
            this.root.style.top = y + 'px';
        };
        return DragArea;
    }());
    boxlayout.DragArea = DragArea;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var Mask = /** @class */ (function () {
        function Mask() {
            this._root = document.createElement('div');
            this._root.style.position = "absolute";
            this._root.style.background = 'rgba(0,0,0,0)';
            this._root.style.zIndex = '5';
        }
        Object.defineProperty(Mask.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Mask.prototype.render = function (container) {
            this.container = container;
            this.container.appendChild(this.root);
        };
        Mask.prototype.removeFromParent = function () {
            if (this.container) {
                this.container.removeChild(this.root);
            }
        };
        Mask.prototype.setBounds = function (x, y, width, height) {
            this.root.style.width = width + 'px';
            this.root.style.height = height + 'px';
            this.root.style.left = x + 'px';
            this.root.style.top = y + 'px';
        };
        return Mask;
    }());
    boxlayout.Mask = Mask;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    /**分割条 */
    var Separator = /** @class */ (function () {
        function Separator() {
            this._root = document.createElement('div');
            this._root.style.position = "absolute";
            this._root.style.background = 'rgba(255,255,255,0)';
            this._root.style.zIndex = '2';
        }
        Object.defineProperty(Separator.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Separator.prototype.render = function (container) {
            this.container = container;
            this.container.appendChild(this.root);
        };
        Separator.prototype.removeFromParent = function () {
            if (this.container) {
                this.container.removeChild(this.root);
            }
        };
        Separator.prototype.setBounds = function (x, y, width, height) {
            this.root.style.width = width + 'px';
            this.root.style.height = height + 'px';
            this.root.style.left = x + 'px';
            this.root.style.top = y + 'px';
        };
        return Separator;
    }());
    boxlayout.Separator = Separator;
})(boxlayout || (boxlayout = {}));
/// <reference path="../../data/EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    var TabBar = /** @class */ (function (_super) {
        __extends(TabBar, _super);
        function TabBar() {
            var _this = _super.call(this) || this;
            _this._panels = [];
            _this._selectedIndex = NaN;
            _this._showOptionContainer = true;
            _this.currentItems = [];
            _this.startP = new boxlayout.Point();
            _this.cancelClick = false;
            _this.itemEventHandle = _this.itemEventHandle.bind(_this);
            _this.optionEventHandle = _this.optionEventHandle.bind(_this);
            _this._root = document.createElement('div');
            _this._root.style.position = "absolute";
            _this._root.style.background = '#3b3b3b';
            // this._root.style.boxSizing = "border-box";
            // this._root.style.borderBottom = "1px solid #1b2025";
            _this._root.style.display = "flex";
            _this._root.style.alignContent = "flex-start";
            _this._root.style.alignItems = "center";
            _this._root.style.zIndex = '1';
            _this.itemContainer = document.createElement('div');
            _this.itemContainer.style.display = "flex";
            _this.itemContainer.style.alignContent = "flex-start";
            _this.itemContainer.style.flexGrow = "1";
            _this.itemContainer.style.overflow = "hidden";
            _this._root.appendChild(_this.itemContainer);
            _this.appendContainer = document.createElement('div');
            _this._root.appendChild(_this.appendContainer);
            _this.optionContainer = document.createElement('img');
            _this.optionContainer.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAECAYAAACzzX7wAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpJREFUeNpi+P//f8N/3KCBAUgw4FAEEmOAKUBX1AATZ2FAgAZsbIAAAwCRBFexyGAHPAAAAABJRU5ErkJggg==";
            _this.optionContainer.style.cursor = "pointer";
            _this.optionContainer.style.margin = "6px";
            _this.optionContainer.title = "选项卡菜单";
            _this._root.appendChild(_this.optionContainer);
            _this.optionContainer.addEventListener("click", _this.optionEventHandle);
            return _this;
        }
        TabBar.prototype.optionEventHandle = function (e) {
            var _this = this;
            boxlayout.PopupMenu.popup(this.optionContainer, [
                { label: "关闭", id: "close" },
                { label: "关闭组", id: "closeall" }
            ], function (id) {
                _this.dispatchEvent(new boxlayout.TabBarEvent(boxlayout.TabBarEvent.MENUSELECTED, id));
            });
        };
        Object.defineProperty(TabBar.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabBar.prototype, "panels", {
            get: function () {
                return this._panels;
            },
            set: function (v) {
                this._panels = v;
                this.reDeployItems();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabBar.prototype, "selectedIndex", {
            get: function () {
                return this._selectedIndex;
            },
            set: function (v) {
                if (this._selectedIndex != v) {
                    this._selectedIndex = v;
                    this.commitSelected();
                }
            },
            enumerable: true,
            configurable: true
        });
        TabBar.prototype.setSelected = function (v) {
            this._selectedIndex = v;
            this.commitSelected();
            this.dispatchEvent(new boxlayout.TabBarEvent(boxlayout.TabBarEvent.CHANGE));
        };
        Object.defineProperty(TabBar.prototype, "showOptionContainer", {
            get: function () {
                return this._showOptionContainer;
            },
            set: function (v) {
                this._showOptionContainer = v;
                this.optionContainer.hidden = !v;
            },
            enumerable: true,
            configurable: true
        });
        TabBar.prototype.removePanel = function (v) {
            for (var i = 0; i < this._panels.length; i++) {
                if (this._panels[i] === v) {
                    this._panels.splice(i, 1);
                    break;
                }
            }
            this.reDeployItems();
            this.setSelected(this._panels.length - 1);
        };
        TabBar.prototype.addPanel = function (v) {
            for (var i = 0; i < this._panels.length; i++) {
                if (this._panels[i] === v) {
                    this.setSelected(i);
                    return;
                }
            }
            this._panels.push(v);
            this.reDeployItems();
            this.setSelected(this._panels.length - 1);
        };
        TabBar.prototype.addPanelTo = function (target, panel, dir) {
            if (dir === void 0) { dir = "right"; }
            var index = this.panels.indexOf(panel);
            if (index !== -1) {
                if (target === panel) {
                    return;
                }
                this.panels.splice(index, 1);
            }
            index = this.panels.indexOf(target);
            switch (dir) {
                case "right":
                    this.panels.splice(index + 1, 0, panel);
                    break;
                case "left":
                    this.panels.splice(index, 0, panel);
                    break;
            }
            this.reDeployItems();
            this.setSelected(this.panels.indexOf(panel));
        };
        TabBar.prototype.render = function (container) {
            this.container = container;
            this.container.appendChild(this.root);
        };
        TabBar.prototype.removeFromParent = function () {
            if (this.container) {
                this.container.removeChild(this.root);
            }
        };
        TabBar.prototype.getBounds = function () {
            return { x: this.bx, y: this.by, width: this.bw, height: this.bh };
        };
        TabBar.prototype.setBounds = function (x, y, width, height) {
            this.root.style.width = width + 'px';
            this.root.style.height = height + 'px';
            this.root.style.left = x + 'px';
            this.root.style.top = y + 'px';
            this.bx = x;
            this.by = y;
            if (this.bw !== width || this.bh !== height) {
                this.bw = width;
                this.bh = height;
                this.updateItemDisplay();
            }
        };
        TabBar.prototype.reDeployItems = function () {
            var _this = this;
            this.currentItems.forEach(function (item) {
                item.removeFromParent();
                item.root.removeEventListener("mousedown", _this.itemEventHandle);
                item.root.removeEventListener("click", _this.itemEventHandle);
                item.root.removeEventListener("dblclick", _this.itemEventHandle);
            });
            this.currentItems = [];
            for (var i = 0; i < this._panels.length; i++) {
                var item = boxlayout.TabBarItem.getOneItem();
                item.render(this.itemContainer);
                item.panel = this._panels[i];
                item.root.addEventListener("mousedown", this.itemEventHandle);
                item.root.addEventListener("click", this.itemEventHandle);
                item.root.addEventListener("dblclick", this.itemEventHandle);
                this.currentItems.push(item);
            }
            this.updateItemDisplay();
        };
        TabBar.prototype.itemEventHandle = function (e) {
            switch (e.type) {
                case "mousedown":
                    this.startP.x = e.clientX;
                    this.startP.y = e.clientY;
                    this.cancelClick = false;
                    var currentElement = e.currentTarget;
                    for (var i = 0; i < this.currentItems.length; i++) {
                        if (this.currentItems[i].root === currentElement) {
                            this.targetPanel = this.panels[i];
                            break;
                        }
                    }
                    window.addEventListener("mousemove", this.itemEventHandle);
                    window.addEventListener("mouseup", this.itemEventHandle);
                    break;
                case "mousemove":
                    if (Math.abs(e.clientX - this.startP.x) > 3 || Math.abs(e.clientY - this.startP.y) > 3) {
                        window.removeEventListener("mousemove", this.itemEventHandle);
                        window.removeEventListener("mouseup", this.itemEventHandle);
                        this.cancelClick = true;
                        this.dispatchEvent(new boxlayout.TabBarEvent(boxlayout.TabBarEvent.BEGINDRAG, this.targetPanel));
                    }
                    break;
                case "mouseup":
                    window.removeEventListener("mousemove", this.itemEventHandle);
                    window.removeEventListener("mouseup", this.itemEventHandle);
                    break;
                case "click":
                    if (!this.cancelClick) {
                        var currentElement_1 = e.currentTarget;
                        for (var i = 0; i < this.currentItems.length; i++) {
                            if (this.currentItems[i].root === currentElement_1 && this.selectedIndex !== i) {
                                this.setSelected(i);
                                break;
                            }
                        }
                    }
                    break;
                case "dblclick":
                    if (!this.cancelClick) {
                        this.dispatchEvent(new boxlayout.TabBarEvent(boxlayout.TabBarEvent.ITEMDOUBLECLICK));
                    }
                    break;
            }
        };
        TabBar.prototype.commitSelected = function () {
            if (this.currentHeaderRender) {
                this.currentHeaderRender.removeFromParent();
            }
            for (var i = 0; i < this.currentItems.length; i++) {
                if (i === this._selectedIndex) {
                    this.currentItems[i].selected = true;
                    this.currentHeaderRender = this.panels[i].getHeaderRender();
                }
                else {
                    this.currentItems[i].selected = false;
                }
            }
            if (this.currentHeaderRender) {
                this.currentHeaderRender.render(this.appendContainer);
            }
        };
        TabBar.prototype.updateItemDisplay = function () {
            var size = Math.min(this.bw / this.currentItems.length, 100);
            for (var i = 0; i < this.currentItems.length; i++) {
                var item = this.currentItems[i];
                item.setBounds(i * size, 0, size, this.bh);
            }
        };
        return TabBar;
    }(boxlayout_event.EventDispatcher));
    boxlayout.TabBar = TabBar;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var TabBarItem = /** @class */ (function () {
        function TabBarItem() {
            this._selected = false;
            this._root = document.createElement('div');
            this._root.style.boxSizing = "border-box";
            this._root.style.borderRight = "1px solid #1b2025";
            this._root.style.overflow = "hidden";
            this._root.style.display = "flex";
            // this._root.style.minWidth="32px";
            this._root.style.padding = "0px 6px";
            this.iconElement = document.createElement('img');
            this.iconElement.style.marginRight = "6px";
            this.iconElement.style.flexGrow = "1";
            this.iconElement.style.pointerEvents = "none";
            this.iconElement.style.alignSelf = 'center';
            this._root.appendChild(this.iconElement);
            this.titleElement = document.createElement('div');
            this.titleElement.style.whiteSpace = "nowrap";
            this.titleElement.style.textOverflow = "ellipsis";
            this.titleElement.style.overflow = "hidden";
            this.titleElement.style.fontSize = "13px";
            this._root.appendChild(this.titleElement);
        }
        TabBarItem.getOneItem = function () {
            if (this.$itemPool.length === 0) {
                return new TabBarItem();
            }
            return this.$itemPool.pop();
        };
        Object.defineProperty(TabBarItem.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabBarItem.prototype, "panel", {
            get: function () {
                return this._panel;
            },
            set: function (v) {
                this._panel = v;
                this.updateDisplay();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabBarItem.prototype, "selected", {
            get: function () {
                return this._selected;
            },
            set: function (v) {
                this._selected = v;
                this.updateDisplay();
            },
            enumerable: true,
            configurable: true
        });
        TabBarItem.prototype.render = function (container) {
            this.container = container;
            this.container.appendChild(this.root);
        };
        TabBarItem.prototype.removeFromParent = function () {
            if (this.container) {
                this.container.removeChild(this.root);
                TabBarItem.$itemPool.push(this);
            }
        };
        TabBarItem.prototype.updateDisplay = function () {
            this.titleElement.textContent = this._panel.title;
            this.iconElement.src = this._panel.icon;
            if (this._selected) {
                this._root.style.borderBottom = "";
                this._root.style.background = '#3b3b3b';
                this.titleElement.style.color = "#f0f0f0";
            }
            else {
                this._root.style.borderBottom = "1px solid #2a2a2a";
                this._root.style.background = '#3b3b3b';
                this.titleElement.style.color = "#888888";
            }
        };
        TabBarItem.prototype.getBounds = function () {
            return { x: this.bx, y: this.by, width: this.root.offsetWidth, height: this.root.offsetHeight };
        };
        TabBarItem.prototype.setBounds = function (x, y, width, height) {
            this.bx = x;
            this.by = y;
            this.bw = width;
            this.bh = height;
            this.titleElement.style.lineHeight = height + "px";
        };
        //缓存池
        TabBarItem.$itemPool = [];
        return TabBarItem;
    }());
    boxlayout.TabBarItem = TabBarItem;
})(boxlayout || (boxlayout = {}));
/// <reference path="../../data/DragInfo.ts" />
/// <reference path="../../data/EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    var TabGroup = /** @class */ (function (_super) {
        __extends(TabGroup, _super);
        function TabGroup() {
            var _this = _super.call(this) || this;
            _this.reDeployPanelTag = false;
            _this.currentPanles = [];
            _this.tabBarHeight = 25; //选项卡区域的高度
            _this.tabBar = new boxlayout.TabBar();
            return _this;
        }
        Object.defineProperty(TabGroup.prototype, "root", {
            get: function () {
                return this.container;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabGroup.prototype, "ownerElement", {
            get: function () {
                return this._ownerElement;
            },
            set: function (v) {
                this._ownerElement = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabGroup.prototype, "panels", {
            get: function () {
                return this.tabBar.panels;
            },
            set: function (v) {
                this.tabBar.panels = v;
                this.reDeployPanels();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabGroup.prototype, "selectedIndex", {
            get: function () {
                return this.tabBar.selectedIndex;
            },
            set: function (v) {
                this.tabBar.selectedIndex = v;
                this.commitSelected();
            },
            enumerable: true,
            configurable: true
        });
        TabGroup.prototype.removePanel = function (v) {
            this.dispatchEvent(new boxlayout.TabGroupEvent(boxlayout.TabGroupEvent.PANEL_REMOVING, { panel: v, tabGroup: this }));
            this.tabBar.removePanel(v);
            this.reDeployPanels();
            this.dispatchEvent(new boxlayout.TabGroupEvent(boxlayout.TabGroupEvent.PANEL_REMOVED, { panel: v, tabGroup: this }));
        };
        TabGroup.prototype.addPanel = function (v) {
            this.tabBar.addPanel(v);
            this.reDeployPanels();
            this.dispatchEvent(new boxlayout.TabGroupEvent(boxlayout.TabGroupEvent.PANEL_ADDED, { panel: v, tabGroup: this }));
        };
        TabGroup.prototype.addPanelTo = function (target, panel, dir) {
            if (dir === void 0) { dir = "right"; }
            this.tabBar.addPanelTo(target, panel, dir);
            this.reDeployPanels();
            this.dispatchEvent(new boxlayout.TabGroupEvent(boxlayout.TabGroupEvent.PANEL_ADDED, { panel: panel, tabGroup: this }));
        };
        TabGroup.prototype.reDeployPanels = function () {
            var _this = this;
            if (!this.container) {
                this.reDeployPanelTag = true;
                return;
            }
            this.currentPanles.forEach(function (panel) {
                panel.removeFromParent();
            });
            this.currentPanles = this.panels.concat();
            this.currentPanles.forEach(function (panel) {
                panel.render(_this.container);
                panel.show = false;
            });
            this.commitSelected();
            this.updatePanelDisplay();
        };
        TabGroup.prototype.commitSelected = function () {
            for (var i = 0; i < this.panels.length; i++) {
                if (i === this.selectedIndex) {
                    this.panels[i].show = true;
                }
                else {
                    this.panels[i].show = false;
                }
            }
            this.updatePanelDisplay();
        };
        TabGroup.prototype.adjustDragInfo = function (e, info) {
            if (!this.adjustDragInfo_tabBox(e, info)) {
                this.adjustDragInfo_tabGroup(e, info);
            }
            return info;
        };
        TabGroup.prototype.adjustDragInfo_tabBox = function (e, info) {
            var globalP = boxlayout.MatrixUtil.localToGlobal(this.tabBar.root, new boxlayout.Point());
            var bounds = this.tabBar.getBounds();
            var globalRange = new boxlayout.Rectangle(globalP.x, globalP.y, bounds.width, bounds.height);
            if (globalRange.containsPoint(new boxlayout.Point(e.clientX, e.clientY))) {
                var targetItem = void 0;
                for (var i = 0; i < this.tabBar.currentItems.length; i++) {
                    var item = this.tabBar.currentItems[i];
                    globalP = boxlayout.MatrixUtil.localToGlobal(item.root, new boxlayout.Point());
                    bounds = item.getBounds();
                    globalRange.x = globalP.x;
                    globalRange.y = globalP.y;
                    globalRange.width = bounds.width;
                    globalRange.height = bounds.height;
                    if (globalRange.containsPoint(new boxlayout.Point(e.clientX, e.clientY))) {
                        targetItem = item;
                        break;
                    }
                }
                var dir = void 0;
                if (info.otherData["startElement"] === this.ownerElement) {
                    if (!targetItem) {
                        targetItem = this.tabBar.currentItems[this.tabBar.currentItems.length - 1];
                    }
                    if (this.panels.indexOf(targetItem.panel) <= this.panels.indexOf(info.otherData["startPanel"])) {
                        dir = "left";
                    }
                    else {
                        dir = "right";
                    }
                    var p = boxlayout.MatrixUtil.localToGlobal(targetItem.root, new boxlayout.Point());
                    var itemBound = targetItem.getBounds();
                    info.dragRange.x = p.x;
                    info.dragRange.y = p.y;
                    info.dragRange.width = itemBound.width;
                    info.dragRange.height = itemBound.height;
                }
                else {
                    if (targetItem) {
                        dir = "left";
                        var p = boxlayout.MatrixUtil.localToGlobal(targetItem.root, new boxlayout.Point());
                        var itemBound = targetItem.getBounds();
                        info.dragRange.x = p.x;
                        info.dragRange.y = p.y;
                        info.dragRange.width = itemBound.width;
                        info.dragRange.height = itemBound.height;
                    }
                    else {
                        targetItem = this.tabBar.currentItems[this.tabBar.currentItems.length - 1];
                        dir = "right";
                        var p = boxlayout.MatrixUtil.localToGlobal(targetItem.root, new boxlayout.Point());
                        var itemBound = targetItem.getBounds();
                        info.dragRange.x = p.x + bounds.width;
                        info.dragRange.y = p.y;
                        info.dragRange.width = info.dragRange.height = itemBound.height;
                    }
                }
                info.otherData["type"] = "panel";
                info.otherData["dir"] = dir;
                info.otherData["targetElement"] = this.ownerElement;
                info.otherData["targetPanel"] = targetItem.panel;
                return true;
            }
            return false;
        };
        TabGroup.prototype.adjustDragInfo_tabGroup = function (e, info) {
            var p = boxlayout.MatrixUtil.globalToLocal(this.container, new boxlayout.Point(e.clientX, e.clientY));
            p.x -= this.bx;
            p.y -= this.by;
            var marginHor = this.bw / 3;
            var marignVer = this.bh / 3;
            var dir;
            var obj = {};
            obj['left'] = p.x < marginHor;
            obj['right'] = p.x > this.bw - marginHor;
            obj['top'] = p.y < marignVer;
            obj['bottom'] = p.y > this.bh - marignVer;
            obj['center'] = (!obj['left'] && !obj['right'] && !obj['bottom'] && !obj['top']);
            var globalP = boxlayout.MatrixUtil.localToGlobal(this.container, new boxlayout.Point(this.bx, this.by));
            if (obj['center']) {
                dir = 'center';
            }
            else if (obj['left'] && obj['top']) {
                if (p.x < p.y)
                    dir = 'left';
                else
                    dir = 'top';
            }
            else if (obj['left'] && obj['bottom']) {
                if (p.x < this.bh - p.y)
                    dir = 'left';
                else
                    dir = 'bottom';
            }
            else if (obj['right'] && obj['top']) {
                if (this.bw - p.x < p.y)
                    dir = 'right';
                else
                    dir = 'top';
            }
            else if (obj['right'] && obj['bottom']) {
                if (this.bw - p.x < this.bh - p.y)
                    dir = 'right';
                else
                    dir = 'bottom';
            }
            else {
                b: for (var key in obj) {
                    if (obj[key]) {
                        dir = key;
                        break b;
                    }
                }
            }
            switch (dir) {
                case 'center':
                    info.dragRange.width = this.bw;
                    info.dragRange.height = this.bh;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y;
                    break;
                case 'left':
                    info.dragRange.width = this.bw / 2;
                    info.dragRange.height = this.bh;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y;
                    break;
                case 'right':
                    info.dragRange.width = this.bw / 2;
                    info.dragRange.height = this.bh;
                    info.dragRange.x = globalP.x + this.bw / 2;
                    info.dragRange.y = globalP.y;
                    break;
                case 'top':
                    info.dragRange.width = this.bw;
                    info.dragRange.height = this.bh / 2;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y;
                    break;
                case 'bottom':
                    info.dragRange.width = this.bw;
                    info.dragRange.height = this.bh / 2;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y + this.bh / 2;
                    break;
            }
            //
            info.otherData["type"] = "box";
            info.otherData["dir"] = dir;
            info.otherData["targetElement"] = this.ownerElement;
        };
        TabGroup.prototype.acceptDragInfo = function (v) {
            switch (v.otherData["type"]) {
                case "box":
                    var startElement = v.otherData["startElement"];
                    var startPanel = v.otherData["startPanel"];
                    var targetElement = v.otherData["targetElement"];
                    this.setHoldValue([startElement.render, targetElement.render], true);
                    var dir = v.otherData["dir"];
                    if (dir === "center") {
                        if (startElement === targetElement) {
                            return;
                        }
                        startElement.render.removePanel(startPanel);
                        if (startElement.render.panels.length === 0) {
                            startElement.ownerLayout.removeBoxElement(startElement);
                        }
                        targetElement.render.addPanel(startPanel);
                    }
                    else {
                        if (startElement === targetElement && startElement.render.panels.length === 1) {
                            return;
                        }
                        startElement.render.removePanel(startPanel);
                        if (startElement.render.panels.length === 0) {
                            startElement.ownerLayout.removeBoxElement(startElement);
                        }
                        var newElement = new boxlayout.BoxLayoutElement();
                        targetElement.ownerLayout.addBoxElement(targetElement, newElement, dir);
                        newElement.render.addPanel(startPanel);
                        this.setHoldValue([newElement.render], false);
                    }
                    this.setHoldValue([startElement.render, targetElement.render], false);
                    break;
                case "panel":
                    startElement = v.otherData["startElement"];
                    startPanel = v.otherData["startPanel"];
                    targetElement = v.otherData["targetElement"];
                    this.setHoldValue([startElement.render, targetElement.render], true);
                    var targetPanel = v.otherData["targetPanel"];
                    dir = v.otherData["dir"];
                    if (startElement !== targetElement) {
                        startElement.render.removePanel(startPanel);
                        if (startElement.render.panels.length === 0) {
                            startElement.ownerLayout.removeBoxElement(startElement);
                        }
                        targetElement.render.addPanelTo(targetPanel, startPanel, dir);
                    }
                    else {
                        targetElement.render.addPanelTo(targetPanel, startPanel, dir);
                    }
                    this.setHoldValue([startElement.render, targetElement.render], false);
                    break;
            }
        };
        TabGroup.prototype.setHoldValue = function (groups, value) {
            groups.forEach(function (group) {
                group.panels.forEach(function (panel) {
                    panel.hold = value;
                });
            });
        };
        TabGroup.prototype.render = function (container) {
            this.container = container;
            this.tabBar.render(this.container);
            if (this.reDeployPanelTag) {
                this.reDeployPanelTag = false;
                this.reDeployPanels();
            }
            this.tabBar.addEventListener(boxlayout.TabBarEvent.CHANGE, this.tabBarEventHandle, this);
            this.tabBar.addEventListener(boxlayout.TabBarEvent.MENUSELECTED, this.tabBarEventHandle, this);
            this.tabBar.addEventListener(boxlayout.TabBarEvent.BEGINDRAG, this.tabBarEventHandle, this);
            this.tabBar.addEventListener(boxlayout.TabBarEvent.ITEMDOUBLECLICK, this.tabBarEventHandle, this);
            this.tabBar.showOptionContainer = this.ownerElement.ownerLayout.config.useTabMenu;
            this.ownerElement.ownerLayout.config.addEventListener(boxlayout.BoxLayoutEvent.CONFIG_CHANGED, this.configHandle, this);
        };
        TabGroup.prototype.removeFromParent = function () {
            if (this.container) {
                this.tabBar.removeFromParent();
                this.currentPanles.forEach(function (panel) {
                    panel.removeFromParent();
                });
                this.tabBar.removeEventListener(boxlayout.TabBarEvent.CHANGE, this.tabBarEventHandle, this);
                this.tabBar.removeEventListener(boxlayout.TabBarEvent.MENUSELECTED, this.tabBarEventHandle, this);
                this.tabBar.removeEventListener(boxlayout.TabBarEvent.BEGINDRAG, this.tabBarEventHandle, this);
                this.tabBar.removeEventListener(boxlayout.TabBarEvent.ITEMDOUBLECLICK, this.tabBarEventHandle, this);
                this.ownerElement.ownerLayout.config.removeEventListener(boxlayout.BoxLayoutEvent.CONFIG_CHANGED, this.configHandle, this);
            }
        };
        TabGroup.prototype.setMaxSize = function (v) {
            var tabBarZ = v ? 4 : 1;
            var panelZ = v ? 3 : 0;
            this.tabBar.root.style.zIndex = tabBarZ.toString();
            this.panels.forEach(function (panel) {
                panel.root.style.zIndex = panelZ.toString();
            });
        };
        TabGroup.prototype.configHandle = function (e) {
            if (this.tabBar.showOptionContainer !== this.ownerElement.ownerLayout.config.useTabMenu) {
                this.tabBar.showOptionContainer = this.ownerElement.ownerLayout.config.useTabMenu;
            }
        };
        TabGroup.prototype.tabBarEventHandle = function (e) {
            switch (e.type) {
                case boxlayout.TabBarEvent.CHANGE:
                    this.commitSelected();
                    break;
                case boxlayout.TabBarEvent.BEGINDRAG:
                    if (!this.ownerElement.ownerLayout.maxSizeElement) {
                        var info = new boxlayout.DragInfo();
                        info.otherData["startElement"] = this.ownerElement;
                        info.otherData["startPanel"] = e.data;
                        this.dispatchEvent(new boxlayout.DragEvent(boxlayout.DragEvent.STARTDRAG, info));
                    }
                    break;
                case boxlayout.TabBarEvent.MENUSELECTED:
                    this.doForTabbarMenu(e.data);
                    break;
                case boxlayout.TabBarEvent.ITEMDOUBLECLICK:
                    if (this.ownerElement.ownerLayout.maxSizeElement === this.ownerElement) {
                        this.ownerElement.ownerLayout.setMaxSize(null);
                    }
                    else {
                        this.ownerElement.ownerLayout.setMaxSize(this.ownerElement);
                    }
                    break;
            }
        };
        TabGroup.prototype.doForTabbarMenu = function (id) {
            switch (id) {
                case 'close':
                    if (this.ownerElement.ownerLayout.rootLayoutElement === this.ownerElement && this.panels.length === 1) {
                        return;
                    }
                    var targetPanel = this.panels[this.selectedIndex];
                    this.setHoldValue([this], true);
                    targetPanel.hold = false;
                    this.removePanel(targetPanel);
                    this.setHoldValue([this], false);
                    if (this.panels.length === 0) {
                        this.ownerElement.ownerLayout.removeBoxElement(this.ownerElement);
                    }
                    break;
                case 'closeall':
                    for (var i = this.panels.length - 1; i >= 0; i--) {
                        this.removePanel(this.panels[i]);
                    }
                    this.ownerElement.ownerLayout.removeBoxElement(this.ownerElement);
                    break;
            }
        };
        TabGroup.prototype.setBounds = function (x, y, width, height) {
            this.bx = x;
            this.by = y;
            this.bw = width;
            this.bh = height;
            this.tabBar.setBounds(x, y, width, this.tabBarHeight);
            this.updatePanelDisplay();
        };
        TabGroup.prototype.updatePanelDisplay = function () {
            for (var i = 0; i < this.panels.length; i++) {
                if (i === this.selectedIndex) {
                    this.panels[i].setBounds(this.bx, this.by + this.tabBarHeight, this.bw, this.bh - this.tabBarHeight);
                    break;
                }
            }
        };
        return TabGroup;
    }(boxlayout_event.EventDispatcher));
    boxlayout.TabGroup = TabGroup;
})(boxlayout || (boxlayout = {}));
/// <reference path="../../data/EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    var TabPanel = /** @class */ (function (_super) {
        __extends(TabPanel, _super);
        function TabPanel() {
            var _this = _super.call(this) || this;
            _this._icon = "";
            _this._show = true;
            _this._isDocumentPanel = false;
            _this._hold = false;
            _this.isFirst = true;
            _this._root = document.createElement('div');
            _this._root.style.position = "absolute";
            _this._root.style.background = '#3b3b3b';
            _this._root.style.border = '2px solid #2a2a2a';
            _this._root.style.boxSizing = 'border-box';
            _this._root.style.overflow = 'hidden';
            _this._root.style.zIndex = '0';
            return _this;
        }
        Object.defineProperty(TabPanel.prototype, "id", {
            get: function () {
                return this._id;
            },
            set: function (v) {
                this._id = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "title", {
            get: function () {
                return this._title;
            },
            set: function (v) {
                this._title = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "icon", {
            get: function () {
                return this._icon;
            },
            set: function (v) {
                this._icon = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "show", {
            get: function () {
                return this._show;
            },
            set: function (v) {
                this._show = v;
                this.root.hidden = !v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "isDocumentPanel", {
            get: function () {
                return this._isDocumentPanel;
            },
            set: function (v) {
                this._isDocumentPanel = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TabPanel.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        TabPanel.prototype.getHeaderRender = function () {
            return null;
        };
        TabPanel.prototype.setFocus = function () {
        };
        Object.defineProperty(TabPanel.prototype, "hold", {
            get: function () {
                return this._hold;
            },
            set: function (v) {
                this._hold = v;
            },
            enumerable: true,
            configurable: true
        });
        TabPanel.prototype.render = function (container) {
            if (!this.hold) {
                this.container = container;
                this.container.appendChild(this.root);
                if (this.isFirst) {
                    this.isFirst = false;
                    this.renderContent(this._root);
                }
            }
        };
        TabPanel.prototype.removeFromParent = function () {
            if (!this.hold) {
                if (this.container) {
                    this.container.removeChild(this.root);
                }
            }
        };
        TabPanel.prototype.setBounds = function (x, y, width, height) {
            if (this.bw !== width || this.bh !== height) {
                this.root.style.width = width + 'px';
                this.root.style.height = height + 'px';
                this.bw = width;
                this.bh = height;
                this.resize(width, height);
            }
            this.root.style.left = x + 'px';
            this.root.style.top = y + 'px';
        };
        TabPanel.prototype.renderContent = function (container) {
            //子代重写实现自定义内容
        };
        TabPanel.prototype.resize = function (newWidth, newHeight) {
            //子代重写做相关处理
        };
        return TabPanel;
    }(boxlayout_event.EventDispatcher));
    boxlayout.TabPanel = TabPanel;
})(boxlayout || (boxlayout = {}));
/// <reference path="../../data/DragInfo.ts" />
/// <reference path="../../data/EventDispatcher.ts" />
var boxlayout;
(function (boxlayout) {
    //测试拖拽面板
    var TestDragPanel = /** @class */ (function (_super) {
        __extends(TestDragPanel, _super);
        function TestDragPanel() {
            var _this = _super.call(this) || this;
            _this._root = document.createElement('div');
            _this._root.style.position = 'absolute';
            _this._root.style.border = '2px solid rgb(41, 50, 59)';
            _this._root.style.background = '#232a32';
            _this._root.innerText = Math.random().toString();
            _this.mouseHandle = _this.mouseHandle.bind(_this);
            return _this;
        }
        Object.defineProperty(TestDragPanel.prototype, "root", {
            get: function () {
                return this._root;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TestDragPanel.prototype, "ownerElement", {
            get: function () {
                return this._ownerElement;
            },
            set: function (v) {
                this._ownerElement = v;
            },
            enumerable: true,
            configurable: true
        });
        TestDragPanel.prototype.adjustDragInfo = function (e, info) {
            var p = boxlayout.MatrixUtil.globalToLocal(this._root, new boxlayout.Point(e.clientX, e.clientY));
            var margin = 50;
            var dir;
            var obj = {};
            obj['left'] = p.x < margin;
            obj['right'] = p.x > this.bw - margin;
            obj['top'] = p.y < margin;
            obj['bottom'] = p.y > this.bh - margin;
            obj['center'] = (!obj['left'] && !obj['right'] && !obj['bottom'] && !obj['top']);
            var globalP = boxlayout.MatrixUtil.localToGlobal(this.root, new boxlayout.Point());
            if (obj['center']) {
                dir = 'center';
            }
            else if (obj['left'] && obj['top']) {
                if (p.x < p.y)
                    dir = 'left';
                else
                    dir = 'top';
            }
            else if (obj['left'] && obj['bottom']) {
                if (p.x < this.bh - p.y)
                    dir = 'left';
                else
                    dir = 'bottom';
            }
            else if (obj['right'] && obj['top']) {
                if (this.bw - p.x < p.y)
                    dir = 'right';
                else
                    dir = 'top';
            }
            else if (obj['right'] && obj['bottom']) {
                if (this.bw - p.x < this.bh - p.y)
                    dir = 'right';
                else
                    dir = 'bottom';
            }
            else {
                b: for (var key in obj) {
                    if (obj[key]) {
                        dir = key;
                        break b;
                    }
                }
            }
            switch (dir) {
                case 'center':
                    info.dragRange.width = this.bw;
                    info.dragRange.height = this.bh;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y;
                    break;
                case 'left':
                    info.dragRange.width = this.bw / 2;
                    info.dragRange.height = this.bh;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y;
                    break;
                case 'right':
                    info.dragRange.width = this.bw / 2;
                    info.dragRange.height = this.bh;
                    info.dragRange.x = globalP.x + this.bw / 2;
                    info.dragRange.y = globalP.y;
                    break;
                case 'top':
                    info.dragRange.width = this.bw;
                    info.dragRange.height = this.bh / 2;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y;
                    break;
                case 'bottom':
                    info.dragRange.width = this.bw;
                    info.dragRange.height = this.bh / 2;
                    info.dragRange.x = globalP.x;
                    info.dragRange.y = globalP.y + this.bh / 2;
                    break;
            }
            info.otherData["dir"] = dir;
            info.otherData["target"] = this.ownerElement;
            return info;
        };
        TestDragPanel.prototype.acceptDragInfo = function (v) {
            if (v.otherData["dir"] !== "center") {
                this.ownerElement.ownerLayout.addBoxElement(v.otherData["target"], v.otherData["start"], v.otherData["dir"]);
            }
        };
        TestDragPanel.prototype.render = function (container) {
            this.container = container;
            this.container.appendChild(this.root);
            this.root.addEventListener("mousedown", this.mouseHandle);
        };
        TestDragPanel.prototype.mouseHandle = function (e) {
            if (e.button === 0) {
                var info = new boxlayout.DragInfo();
                info.otherData["start"] = this.ownerElement;
                this.dispatchEvent(new boxlayout.DragEvent(boxlayout.DragEvent.STARTDRAG, info));
            }
        };
        TestDragPanel.prototype.removeFromParent = function () {
            if (this.container) {
                this.container.removeChild(this.root);
                this.root.removeEventListener("mousedown", this.mouseHandle);
            }
        };
        TestDragPanel.prototype.setBounds = function (x, y, width, height) {
            this.bx = x;
            this.by = y;
            this.bw = width;
            this.bh = height;
            this.root.style.left = x + 'px';
            this.root.style.top = y + 'px';
            this.root.style.width = (width - 4) + 'px';
            this.root.style.height = (height - 4) + 'px';
        };
        return TestDragPanel;
    }(boxlayout_event.EventDispatcher));
    boxlayout.TestDragPanel = TestDragPanel;
})(boxlayout || (boxlayout = {}));
/// <reference path="../tabgroup/TabPanel.ts" />
var boxlayout;
(function (boxlayout) {
    /**测试TabPanel */
    var TestTabPanel = /** @class */ (function (_super) {
        __extends(TestTabPanel, _super);
        function TestTabPanel() {
            var _this = _super.call(this) || this;
            _this.id = 'testPanel';
            _this.title = 'TEST';
            _this.icon = "./icon.svg";
            _this.headerRender = new HeaderRender();
            _this.headerRender.root.addEventListener('click', function () {
                _this.element.innerText = _this.element.innerText + "\nclick!";
            });
            return _this;
        }
        //重写 以实现自定义面板
        TestTabPanel.prototype.renderContent = function (container) {
            this.element = document.createElement('div');
            // this.element.style.background="#666666"
            this.element.style.color = "#ffffff";
            container.appendChild(this.element);
        };
        //重写 以实现选项卡头部自定义内容
        TestTabPanel.prototype.getHeaderRender = function () {
            return this.headerRender;
        };
        //重写 做相关处理
        TestTabPanel.prototype.resize = function (newWidth, newHeight) {
            this.element.style.width = newWidth + 'px';
            this.element.style.height = newHeight + 'px';
        };
        return TestTabPanel;
    }(boxlayout.TabPanel));
    boxlayout.TestTabPanel = TestTabPanel;
    /**测试选项卡头部渲染器 */
    var HeaderRender = /** @class */ (function () {
        function HeaderRender() {
            this.root = document.createElement('button');
            this.root.textContent = "click me";
        }
        HeaderRender.prototype.render = function (container) {
            this.container = container;
            this.container.appendChild(this.root);
        };
        HeaderRender.prototype.removeFromParent = function () {
            if (this.container) {
                this.container.removeChild(this.root);
            }
        };
        HeaderRender.prototype.setBounds = function (x, y, width, height) {
            //选项卡头部渲染器不需要处理此函数
        };
        return HeaderRender;
    }());
    boxlayout.HeaderRender = HeaderRender;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var HtmlElementResizeHelper = /** @class */ (function () {
        function HtmlElementResizeHelper() {
        }
        /**
         * 监视目标标签，如果尺寸发生变化目标标签将会抛出'resize'事件
         */
        HtmlElementResizeHelper.watch = function (target) {
            this.listenList.push({ w: target.offsetWidth, h: target.offsetHeight, target: target });
            this.startListen();
        };
        HtmlElementResizeHelper.unWatch = function (target) {
            for (var i = this.listenList.length - 1; i >= 0; i--) {
                if (this.listenList[i]['target'] === target) {
                    this.listenList.splice(i, 1);
                }
            }
            if (this.listenList.length === 0) {
                this.stopListen();
            }
        };
        HtmlElementResizeHelper.startListen = function () {
            var _this = this;
            this.stopListen();
            this.intervalTag = setInterval(function () { _this.checkSize(); }, 50);
        };
        HtmlElementResizeHelper.stopListen = function () {
            clearInterval(this.intervalTag);
        };
        HtmlElementResizeHelper.checkSize = function () {
            this.listenList.forEach(function (element) {
                var target = element['target'];
                if (target.offsetWidth !== element['w'] || target.offsetHeight !== element['h']) {
                    element['w'] = target.offsetWidth;
                    element['h'] = target.offsetHeight;
                    target.dispatchEvent(new Event('resize'));
                }
            });
        };
        HtmlElementResizeHelper.listenList = [];
        return HtmlElementResizeHelper;
    }());
    boxlayout.HtmlElementResizeHelper = HtmlElementResizeHelper;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var MatrixUtil = /** @class */ (function () {
        function MatrixUtil() {
        }
        /**将一个标签的本地坐标转换为相对于body的坐标 */
        MatrixUtil.localToGlobal = function (target, p) {
            var matrix = this.getMatrixToWindow(target);
            var tmpP = matrix.transformPoint(p.x, p.y);
            return tmpP;
        };
        /**将相对于窗口的坐标转换为目标标签的本地坐标*/
        MatrixUtil.globalToLocal = function (target, p) {
            var matrix = this.getMatrixToWindow(target);
            matrix.invert();
            var tmpP = matrix.transformPoint(p.x, p.y);
            return tmpP;
        };
        /**获取一个标签相对于窗口的变换矩阵 */
        MatrixUtil.getMatrixToWindow = function (target) {
            var matrix = this.getMatrix(target);
            while (target.parentElement) {
                if (target.parentElement.scrollTop !== 0 || target.parentElement.scrollLeft !== 0) {
                    var appendMatrix = new boxlayout.Matrix(1, 0, 0, 1, -target.parentElement.scrollLeft, -target.parentElement.scrollTop);
                    matrix.concat(appendMatrix);
                }
                if (target.parentElement === target.offsetParent) {
                    matrix.concat(this.getMatrix(target.parentElement));
                }
                target = target.parentElement;
            }
            return matrix;
        };
        /** 获取一个标签的矩阵信息*/
        MatrixUtil.getMatrix = function (target) {
            var _this = this;
            var targetMatrix = new boxlayout.Matrix();
            //提取样式里面的矩阵信息
            var cssMatrixList = [];
            if (this.cssMatrixCache[target.style.transform]) {
                cssMatrixList = this.cssMatrixCache[target.style.transform];
            }
            else {
                this.checkCssTransform(target, function (tag, values) {
                    var tmpMatrix = _this.makeMatrix(tag, values);
                    cssMatrixList.push(tmpMatrix);
                });
                this.cssMatrixCache[target.style.transform] = cssMatrixList;
            }
            //连接样式矩阵矩阵
            for (var i = cssMatrixList.length - 1; i >= 0; i--) {
                targetMatrix.concat(cssMatrixList[i]);
            }
            //追加一个位移矩阵
            var translateMatrix = new boxlayout.Matrix(1, 0, 0, 1, target.offsetLeft, target.offsetTop);
            targetMatrix.concat(translateMatrix);
            return targetMatrix;
        };
        MatrixUtil.checkCssTransform = function (target, callback) {
            //提取样式里面的矩阵信息
            var transformStr = target.style.transform;
            if (transformStr) {
                transformStr = transformStr.toLowerCase();
                var index = 0;
                var startIndex = -1;
                var tmpMatrixOperateTag = void 0;
                var serchMode = "key"; //key||value;
                while (index < transformStr.length) {
                    var char = transformStr.charAt(index);
                    if (char !== ' ') {
                        b: switch (serchMode) {
                            case "key":
                                if (char === '(') {
                                    var matrixKey = transformStr.substring(startIndex, index);
                                    tmpMatrixOperateTag = this.keyToTag(matrixKey);
                                    serchMode = 'value';
                                    continue;
                                }
                                else if (startIndex === -1) {
                                    startIndex = index;
                                }
                                break b;
                            case "value":
                                if (char === '(') {
                                    startIndex = index;
                                }
                                else if (char === ')') {
                                    var valueString = transformStr.substring(startIndex + 1, index);
                                    // valueString = valueString.substring(1, valueString.length - 1);
                                    var values = valueString.split(',');
                                    if (tmpMatrixOperateTag) {
                                        callback(tmpMatrixOperateTag, values);
                                    }
                                    tmpMatrixOperateTag = null;
                                    serchMode = 'key';
                                }
                                break b;
                        }
                    }
                    index++;
                }
            }
        };
        MatrixUtil.keyToTag = function (key) {
            key = key.trim();
            //......
            return key;
        };
        MatrixUtil.transformValues = function (args) {
            for (var i = 0; i < args.length; i++) {
                if (args[i].indexOf('px') !== -1) {
                    args[i] = args[i].substring(0, args[i].indexOf('px') - 1);
                }
                if (args[i].indexOf('deg') !== -1) {
                    args[i] = args[i].substring(0, args[i].indexOf('deg') - 1);
                }
                args[i] = Number(args[i].toString().trim());
            }
        };
        MatrixUtil.makeMatrix = function (tag, args) {
            this.transformValues(args);
            var matrix = new boxlayout.Matrix();
            switch (tag) {
                case 'matrix':
                    matrix.a = args[0];
                    matrix.b = args[1];
                    matrix.c = args[2];
                    matrix.d = args[3];
                    matrix.tx = args[4];
                    matrix.ty = args[5];
                    break;
                case 'translate':
                    matrix.translate(args[0], args[1]);
                    break;
                case 'translatex':
                    matrix.translate(args[0], 0);
                    break;
                case 'translatey':
                    matrix.translate(0, args[0]);
                    break;
                case 'scale':
                    matrix.scale(args[0], args[1]);
                    break;
                case 'scalex':
                    matrix.scale(args[0], 1);
                    break;
                case 'scaley':
                    matrix.scale(1, args[0]);
                    break;
                case 'rotate':
                    matrix.rotate(args[0]);
                    break;
            }
            return matrix;
        };
        //样式矩阵信息缓存
        MatrixUtil.cssMatrixCache = {};
        return MatrixUtil;
    }());
    boxlayout.MatrixUtil = MatrixUtil;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var NumberUtil = /** @class */ (function () {
        function NumberUtil() {
        }
        NumberUtil.sin = function (value) {
            var valueFloor = Math.floor(value);
            var valueCeil = valueFloor + 1;
            var resultFloor = NumberUtil.sinInt(valueFloor);
            if (valueFloor == value) {
                return resultFloor;
            }
            var resultCeil = NumberUtil.sinInt(valueCeil);
            return (value - valueFloor) * resultCeil + (valueCeil - value) * resultFloor;
        };
        NumberUtil.sinInt = function (value) {
            value = value % 360;
            if (value < 0) {
                value += 360;
            }
            return Math.sin(value);
        };
        NumberUtil.cos = function (value) {
            var valueFloor = Math.floor(value);
            var valueCeil = valueFloor + 1;
            var resultFloor = NumberUtil.cosInt(valueFloor);
            if (valueFloor == value) {
                return resultFloor;
            }
            var resultCeil = NumberUtil.cosInt(valueCeil);
            return (value - valueFloor) * resultCeil + (valueCeil - value) * resultFloor;
        };
        NumberUtil.cosInt = function (value) {
            value = value % 360;
            if (value < 0) {
                value += 360;
            }
            return Math.cos(value);
        };
        return NumberUtil;
    }());
    boxlayout.NumberUtil = NumberUtil;
})(boxlayout || (boxlayout = {}));
var boxlayout;
(function (boxlayout) {
    var PopupMenu = /** @class */ (function () {
        function PopupMenu() {
            this.mouseEventHandle = this.mouseEventHandle.bind(this);
            this.itemHandle = this.itemHandle.bind(this);
        }
        PopupMenu.popup = function (target, menus, callback) {
            if (!this.instance) {
                this.instance = new PopupMenu();
            }
            this.instance.popup(target, menus, callback);
        };
        /**
         * 弹出菜单
         * @param target 要弹出菜单的目标对象
         * @param menus 菜单数据
         * @param callback 回调
         */
        PopupMenu.prototype.popup = function (target, menus, callback) {
            this.removePopup();
            if (menus && menus.length > 0) {
                this.callback = callback;
                this.menuContainer = document.createElement('div');
                this.menuContainer.style.position = 'absolute';
                this.menuContainer.style.minWidth = '80px';
                this.menuContainer.style.padding = '3px 0px';
                this.menuContainer.style.borderRadius = '5px';
                this.menuContainer.style.background = '#f3f3f3';
                this.menuContainer.style.boxShadow = '2px 2px 10px #111111';
                window.addEventListener('mousedown', this.mouseEventHandle, true);
                document.body.appendChild(this.menuContainer);
                for (var i = 0; i < menus.length; i++) {
                    var item = document.createElement('div');
                    item.innerText = menus[i]['label'];
                    item.style.fontSize = '13px';
                    item.style.padding = '0px 8px';
                    item.style.color = '#000000';
                    item['__popupid'] = menus[i]['id'];
                    this.menuContainer.appendChild(item);
                    item.addEventListener('mouseenter', this.itemHandle, true);
                    item.addEventListener('mouseleave', this.itemHandle, true);
                    item.addEventListener('click', this.itemHandle, true);
                    if (i !== menus.length - 1) {
                        var separator = document.createElement('div');
                        separator.style.height = '1px';
                        separator.style.margin = '3px 0px';
                        separator.style.background = 'rgb(216, 216, 216)';
                        this.menuContainer.appendChild(separator);
                    }
                }
                var globalP = boxlayout.MatrixUtil.localToGlobal(target, new boxlayout.Point(target.offsetWidth / 2 / target.offsetHeight / 2));
                var offset = 10;
                var w = this.menuContainer.offsetWidth;
                var h = this.menuContainer.offsetHeight;
                var outW = document.body.offsetWidth;
                var outH = document.body.offsetHeight;
                var x = globalP.x + offset;
                var y = globalP.y + offset;
                if (w + globalP.x + offset > outW) {
                    x = globalP.x - offset - w;
                }
                if (h + globalP.y + offset > outH) {
                    y = globalP.y - offset - h;
                }
                this.menuContainer.style.left = x + 'px';
                this.menuContainer.style.top = y + 'px';
            }
        };
        PopupMenu.prototype.itemHandle = function (e) {
            switch (e.type) {
                case 'mouseenter':
                    e.currentTarget.style.background = '#4698fb';
                    break;
                case 'mouseleave':
                    e.currentTarget.style.background = null;
                    break;
                case 'click':
                    this.removePopup();
                    this.callback(e.currentTarget['__popupid']);
                    break;
            }
        };
        PopupMenu.prototype.removePopup = function () {
            if (this.menuContainer && this.menuContainer.parentElement) {
                window.removeEventListener('mousedown', this.mouseEventHandle, true);
                document.body.removeChild(this.menuContainer);
            }
        };
        PopupMenu.prototype.mouseEventHandle = function (e) {
            switch (e.type) {
                case 'mousedown':
                    var p = boxlayout.MatrixUtil.globalToLocal(this.menuContainer, new boxlayout.Point(e.clientX, e.clientY));
                    if (p.x < 0 || p.y < 0 || p.x > this.menuContainer.offsetWidth || p.y > this.menuContainer.offsetHeight) {
                        this.removePopup();
                    }
                    break;
            }
        };
        return PopupMenu;
    }());
    boxlayout.PopupMenu = PopupMenu;
})(boxlayout || (boxlayout = {}));
//# sourceMappingURL=boxlayout.js.map