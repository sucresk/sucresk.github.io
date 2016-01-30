var State = (function (_super) {
    __extends(State, _super);
    function State() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }
    var d = __define,c=State,p=c.prototype;
    p.onAdded = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.init();
    };
    p.init = function () {
        console.log("this is a state");
    };
    p.show = function (parent) {
        parent.addChild(this);
    };
    p.next = function (state) {
        this.dispatchEvent(new StateEvent(StateEvent.NEXT, state));
        this.parent.removeChild(this);
    };
    p.tick = function (advancedTime) {
    };
    return State;
})(egret.DisplayObjectContainer);
egret.registerClass(State,'State',["IState","egret.IEventDispatcher"]);
//# sourceMappingURL=State.js.map