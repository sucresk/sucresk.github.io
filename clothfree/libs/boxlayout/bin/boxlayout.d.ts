declare namespace boxlayout_event {
    interface IEventDispatcher {
        addEventListener(type: string, fun: Function, thisObj: any): void;
        removeEventListener(type: string, fun: Function, thisObj: any): void;
        dispatchEvent(event: Event): void;
    }
    class EventDispatcher implements IEventDispatcher {
        __z_e_listeners: any;
        constructor();
        addEventListener(type: string, fun: Function, thisObj: any, level?: number): void;
        removeEventListener(type: string, fun: Function, thisObj: any): void;
        dispatchEvent(event: Event): void;
    }
    class Event {
        type: string;
        data: any;
        constructor(type: string, data?: any);
    }
}
declare namespace boxlayout {
    type Position = "left" | "right" | "top" | "bottom";
    /**
     * 盒式布局，此容器作为盒式布局的根，可将盒式布局应用在任意指定区域
     * @author yangning
     */
    class BoxLayout extends boxlayout_event.EventDispatcher {
        private dragAreaElement;
        private maskElement;
        constructor();
        private _area;
        private _rootLayoutElement;
        readonly rootLayoutElement: IBoxLayoutElement;
        private _layoutConfig;
        /**配置 */
        readonly config: LayoutConfig;
        /**
         * 初始化盒式布局
         * @param container 布局区域
         */
        init(area: HTMLElement, config?: {
            /**是否启用选项卡菜单 */
            useTabMenu: boolean;
        }): void;
        /**
         * 添加一个元素到跟节点
         * @param element 要添加的元素
         * @param position 位置
         */
        addBoxElementToRoot(element: IBoxLayoutElement, position?: Position): void;
        /**
         * 添加一个元素到另一个元素的旁边
         * @param target 目标元素
         * @param element 要添加的元素
         * @param position 位置
         */
        addBoxElement(target: IBoxLayoutElement, element: IBoxLayoutElement, position?: Position): void;
        /**
         * 删除一个元素
         * @param element 要删除的元素
         */
        removeBoxElement(element: IBoxLayoutElement): void;
        private addToArea(element);
        private removeFromArae(element);
        private _maxSizeElement;
        private cacheWidth;
        private cacheHeight;
        readonly maxSizeElement: IBoxLayoutElement;
        setMaxSize(v: IBoxLayoutElement): void;
        private _setMaxSize(v);
        private updateBoxElement();
        private _updateBoxElement(element);
        private containerResizeHandle(e);
        private attachSeparatorOperateEvent(element);
        private detachSeparatorOperateEvent(element);
        private cursorLock;
        private startMouseP;
        private startSize;
        private targetContainer;
        private separatorHandle(e);
        private panelHandle(e);
        private closePanelInfoCache;
        private cachePanelInfo(panel, group);
        private getOldSpace(panelId);
        private getDirLink(element, result);
        private getElementByLink(link);
        private dragInfo;
        private dragHandle(e);
        private attachDragEvent();
        private detachDragEvent();
        private dragEventHandle(e);
        private getOneDragRenderWithMouseEvent(e);
        private getAllElement(element, result);
        private static panelDic;
        /**注册面板
         * 与面板ID相关的api会用到注册信息
         */
        static registPanel(panel: ITabPanel): void;
        /**根据ID获取一个已注册的面板 */
        static getRegistPanelById(id: string): ITabPanel;
        /**
         * 根据Id打开一个面板
         * @param panelId 面板ID
         * @param oldSpace 是否尝试在原来的区域打开，如果布局发生较大的变化可能出现原始位置寻找错误的情况，打开默认为false
         */
        openPanelById(panelId: string, oldSpace?: boolean): void;
        /**
         * 根据Id关闭一个面板
         * @param panelId 面板ID
         */
        closePanelById(panelId: string): void;
        /**获取所有已打开的面板 */
        getAllOpenPanels(): ITabPanel[];
        /**检查某个面板是否打开 */
        checkPanelOpenedById(panelId: string): boolean;
        private getFirstElement(element);
        private setHoldValue(groups, value);
        /**
         *  获取面板所在的布局元素
         * @param panelId 面板ID
         */
        getElementByPanelId(panelId: string): IBoxLayoutElement;
        /**
         * 根据布局配置立刻重新布局所有元素
         * @param config
         */
        applyLayoutConfig(config: string): void;
        private getAllPanel(element, result);
        /**
         * 获取当前布局信息
         */
        getLayoutConfig(): string;
    }
}
declare namespace boxlayout {
    class BoxLayoutElement implements IBoxLayoutElement {
        constructor();
        private _x;
        x: number;
        private _y;
        y: number;
        private _width;
        width: number;
        private _height;
        height: number;
        private _explicitWidth;
        readonly explicitWidth: number;
        private _explicitHeight;
        readonly explicitHeight: number;
        private _minSize;
        minSize: number;
        private _ownerLayout;
        ownerLayout: BoxLayout;
        private _isDocument;
        isDocument: boolean;
        private _parentContainer;
        parentContainer: IBoxLayoutContainer;
        private _render;
        readonly render: IDragRender;
        setLayoutSize(width: number, height: number): void;
        updateRenderDisplay(): void;
    }
}
declare namespace boxlayout {
    class BoxLayoutContainer extends BoxLayoutElement implements IBoxLayoutContainer {
        private separatorSize;
        constructor();
        private _isVertical;
        isVertical: boolean;
        private _firstElement;
        firstElement: IBoxLayoutElement;
        private _secondElement;
        secondElement: IBoxLayoutElement;
        private _separator;
        readonly separator: IRender;
        readonly minSize: number;
        readonly render: IDragRender;
        readonly isDocument: boolean;
        readonly lockElement: IBoxLayoutElement;
        readonly stretchElement: IBoxLayoutElement;
        private gap;
        updateRenderDisplay(): void;
    }
}
declare namespace boxlayout {
    interface IRender {
        root: HTMLElement;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        setBounds(x: number, y: number, width: number, height: number): void;
    }
    interface IDragRender extends IRender, boxlayout_event.IEventDispatcher {
        ownerElement: IBoxLayoutElement;
        adjustDragInfo(e: MouseEvent, info: DragInfo): void;
        acceptDragInfo(info: DragInfo): void;
    }
    interface IBoxLayoutElement {
        x: number;
        y: number;
        width: number;
        height: number;
        explicitWidth: number;
        explicitHeight: number;
        minSize: number;
        ownerLayout: BoxLayout;
        isDocument: boolean;
        setLayoutSize(width: number, height: number): void;
        parentContainer: IBoxLayoutContainer;
        render: IDragRender;
        updateRenderDisplay(): void;
    }
    interface IBoxLayoutContainer extends IBoxLayoutElement {
        isVertical: boolean;
        firstElement: IBoxLayoutElement;
        secondElement: IBoxLayoutElement;
        lockElement: IBoxLayoutElement;
        stretchElement: IBoxLayoutElement;
        separator: IRender;
    }
}
declare namespace boxlayout {
    class BoxLayoutEvent extends boxlayout_event.Event {
        static PANEL_ADDED: string;
        static PANEL_REMOVING: string;
        static PANEL_REMOVED: string;
        static CONFIG_CHANGED: string;
        constructor(type: string, data?: any);
    }
}
declare namespace boxlayout {
    class DragEvent extends boxlayout_event.Event {
        static STARTDRAG: string;
        constructor(type: string, data?: any);
    }
}
declare namespace boxlayout {
    class DragInfo {
        /**拖拽的区域 */
        dragRange: Rectangle;
        otherData: any;
    }
}
declare namespace boxlayout {
    /**
     * 布局配置文件
     */
    class LayoutConfig extends boxlayout_event.EventDispatcher {
        constructor();
        private _useTabMenu;
        /**是否使用选项卡菜单 */
        useTabMenu: boolean;
    }
}
declare namespace boxlayout {
    class Matrix {
        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);
        clone(): Matrix;
        concat(target: Matrix): void;
        /**
         * @private
         */
        $preConcat(target: Matrix): void;
        copyFrom(target: Matrix): void;
        identity(): void;
        invert(): void;
        private $invertInto(target);
        rotate(angle: number): void;
        scale(sx: number, sy: number): void;
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        transformPoint(pointX: number, pointY: number, resultPoint?: Point): Point;
        deltaTransformPoint(pointX: number, pointY: number, resultPoint?: Point): Point;
        translate(dx: number, dy: number): void;
        equals(target: Matrix): boolean;
        prepend(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        append(a: number, b: number, c: number, d: number, tx: number, ty: number): void;
        toString(): string;
        createBox(scaleX: number, scaleY: number, rotation?: number, tx?: number, ty?: number): void;
        createGradientBox(width: number, height: number, rotation?: number, tx?: number, ty?: number): void;
        /**
         * @private
         */
        $getDeterminant(): number;
        /**
         * @private
         */
        $getScaleX(): number;
        /**
         * @private
         */
        $getScaleY(): number;
        /**
         * @private
         */
        $getSkewX(): number;
        /**
         * @private
         */
        $getSkewY(): number;
        /**
         * @private
         */
        $getRotation(angle: number): number;
    }
}
declare namespace boxlayout {
    class Point {
        x: number;
        y: number;
        constructor(x?: number, y?: number);
        setTo(x: number, y: number): void;
        clone(): Point;
        toString(): string;
    }
}
declare namespace boxlayout {
    class Rectangle {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        containsPoint(point: Point): boolean;
        containsRect(rect: any): boolean;
        clone(): Rectangle;
    }
}
declare namespace boxlayout {
    class TabBarEvent extends boxlayout_event.Event {
        static CHANGE: string;
        static BEGINDRAG: string;
        static MENUSELECTED: string;
        static ITEMDOUBLECLICK: string;
        constructor(type: string, data?: any);
    }
}
declare namespace boxlayout {
    class TabGroupEvent extends boxlayout_event.Event {
        static PANEL_ADDED: string;
        static PANEL_REMOVING: string;
        static PANEL_REMOVED: string;
        constructor(type: string, data?: any);
    }
}
declare namespace boxlayout {
    class DragArea {
        constructor();
        private _root;
        readonly root: HTMLElement;
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        setBounds(x: number, y: number, width: number, height: number): void;
    }
}
declare namespace boxlayout {
    class Mask implements IRender {
        constructor();
        private _root;
        readonly root: HTMLElement;
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        setBounds(x: number, y: number, width: number, height: number): void;
    }
}
declare namespace boxlayout {
    /**分割条 */
    class Separator implements IRender {
        constructor();
        private _root;
        readonly root: HTMLElement;
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        setBounds(x: number, y: number, width: number, height: number): void;
    }
}
declare namespace boxlayout {
    interface ITabPanel extends IRender, boxlayout_event.IEventDispatcher {
        id: string;
        title: string;
        icon: string;
        show: boolean;
        hold: boolean;
        isDocumentPanel: boolean;
        getHeaderRender(): IRender;
        setFocus(): void;
    }
}
declare namespace boxlayout {
    class TabBar extends boxlayout_event.EventDispatcher implements IRender {
        constructor();
        private optionEventHandle(e);
        private itemContainer;
        private appendContainer;
        private optionContainer;
        private _root;
        readonly root: HTMLElement;
        _panels: ITabPanel[];
        panels: ITabPanel[];
        private _selectedIndex;
        selectedIndex: number;
        private setSelected(v);
        private _showOptionContainer;
        showOptionContainer: boolean;
        removePanel(v: ITabPanel): void;
        addPanel(v: ITabPanel): void;
        addPanelTo(target: ITabPanel, panel: ITabPanel, dir?: string): void;
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        private bx;
        private by;
        private bw;
        private bh;
        getBounds(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        setBounds(x: number, y: number, width: number, height: number): void;
        currentItems: TabBarItem[];
        private reDeployItems();
        private startP;
        private cancelClick;
        private targetPanel;
        private itemEventHandle(e);
        private currentHeaderRender;
        private commitSelected();
        private updateItemDisplay();
    }
}
declare namespace boxlayout {
    class TabBarItem implements IRender {
        static $itemPool: TabBarItem[];
        static getOneItem(): TabBarItem;
        private titleElement;
        private iconElement;
        constructor();
        private _root;
        readonly root: HTMLElement;
        private _panel;
        panel: ITabPanel;
        private _selected;
        selected: boolean;
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        private updateDisplay();
        private bx;
        private by;
        private bw;
        private bh;
        getBounds(): {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        setBounds(x: number, y: number, width: number, height: number): void;
    }
}
declare namespace boxlayout {
    class TabGroup extends boxlayout_event.EventDispatcher implements IDragRender {
        private tabBar;
        constructor();
        readonly root: HTMLElement;
        private _ownerElement;
        ownerElement: IBoxLayoutElement;
        panels: ITabPanel[];
        selectedIndex: number;
        removePanel(v: ITabPanel): void;
        addPanel(v: ITabPanel): void;
        addPanelTo(target: ITabPanel, panel: ITabPanel, dir?: string): void;
        private reDeployPanelTag;
        private currentPanles;
        private reDeployPanels();
        private commitSelected();
        adjustDragInfo(e: MouseEvent, info: DragInfo): DragInfo;
        private adjustDragInfo_tabBox(e, info);
        private adjustDragInfo_tabGroup(e, info);
        acceptDragInfo(v: DragInfo): void;
        private setHoldValue(groups, value);
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        setMaxSize(v: boolean): void;
        private configHandle(e);
        private tabBarEventHandle(e);
        private doForTabbarMenu(id);
        private tabBarHeight;
        private bx;
        private by;
        private bw;
        private bh;
        setBounds(x: number, y: number, width: number, height: number): void;
        private updatePanelDisplay();
    }
}
declare namespace boxlayout {
    class TabPanel extends boxlayout_event.EventDispatcher implements ITabPanel {
        constructor();
        private _id;
        id: string;
        private _title;
        title: string;
        private _icon;
        icon: string;
        private _show;
        show: boolean;
        private _isDocumentPanel;
        isDocumentPanel: boolean;
        private _root;
        readonly root: HTMLElement;
        getHeaderRender(): IRender;
        setFocus(): void;
        private _hold;
        hold: boolean;
        private isFirst;
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        private bw;
        private bh;
        setBounds(x: number, y: number, width: number, height: number): void;
        protected renderContent(container: HTMLElement): void;
        protected resize(newWidth: number, newHeight: any): void;
    }
}
declare namespace boxlayout {
    class TestDragPanel extends boxlayout_event.EventDispatcher implements IDragRender {
        constructor();
        private _root;
        readonly root: HTMLElement;
        private _ownerElement;
        ownerElement: IBoxLayoutElement;
        adjustDragInfo(e: MouseEvent, info: DragInfo): DragInfo;
        acceptDragInfo(v: DragInfo): void;
        private container;
        render(container: HTMLElement): void;
        private mouseHandle(e);
        removeFromParent(): void;
        private bx;
        private by;
        private bw;
        private bh;
        setBounds(x: number, y: number, width: number, height: number): void;
    }
}
declare namespace boxlayout {
    /**测试TabPanel */
    class TestTabPanel extends TabPanel {
        private headerRender;
        constructor();
        private element;
        protected renderContent(container: HTMLElement): void;
        getHeaderRender(): IRender;
        protected resize(newWidth: number, newHeight: number): void;
    }
    /**测试选项卡头部渲染器 */
    class HeaderRender implements IRender {
        root: HTMLButtonElement;
        constructor();
        private container;
        render(container: HTMLElement): void;
        removeFromParent(): void;
        setBounds(x: number, y: number, width: number, height: number): void;
    }
}
declare namespace boxlayout {
    class HtmlElementResizeHelper {
        private static listenList;
        /**
         * 监视目标标签，如果尺寸发生变化目标标签将会抛出'resize'事件
         */
        static watch(target: HTMLElement): void;
        static unWatch(target: HTMLElement): void;
        private static intervalTag;
        private static startListen();
        private static stopListen();
        private static checkSize();
    }
}
declare namespace boxlayout {
    class MatrixUtil {
        /**将一个标签的本地坐标转换为相对于body的坐标 */
        static localToGlobal(target: HTMLElement, p: Point): Point;
        /**将相对于窗口的坐标转换为目标标签的本地坐标*/
        static globalToLocal(target: HTMLElement, p: Point): Point;
        /**获取一个标签相对于窗口的变换矩阵 */
        static getMatrixToWindow(target: HTMLElement): Matrix;
        private static cssMatrixCache;
        /** 获取一个标签的矩阵信息*/
        static getMatrix(target: HTMLElement): Matrix;
        private static checkCssTransform(target, callback);
        private static keyToTag(key);
        private static transformValues(args);
        private static makeMatrix(tag, args);
    }
}
declare namespace boxlayout {
    class NumberUtil {
        static sin(value: number): number;
        static sinInt(value: number): number;
        static cos(value: number): number;
        static cosInt(value: number): number;
    }
}
declare namespace boxlayout {
    class PopupMenu {
        constructor();
        private static instance;
        static popup(target: HTMLElement, menus: any[], callback: (id: string) => void): void;
        private menuContainer;
        private callback;
        /**
         * 弹出菜单
         * @param target 要弹出菜单的目标对象
         * @param menus 菜单数据
         * @param callback 回调
         */
        popup(target: HTMLElement, menus: any[], callback: (id: string) => void): void;
        private itemHandle(e);
        private removePopup();
        private mouseEventHandle(e);
    }
}
