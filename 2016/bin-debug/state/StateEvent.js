var StateEvent = (function (_super) {
    __extends(StateEvent, _super);
    function StateEvent(type, data, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this.data = data;
    }
    var d = __define,c=StateEvent,p=c.prototype;
    StateEvent.NEXT = "NEXT";
    return StateEvent;
})(egret.Event);
egret.registerClass(StateEvent,'StateEvent');
//# sourceMappingURL=StateEvent.js.map