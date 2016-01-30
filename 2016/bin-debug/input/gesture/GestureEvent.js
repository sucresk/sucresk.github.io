var GestureEvent = (function (_super) {
    __extends(GestureEvent, _super);
    function GestureEvent(type, bubbles, cancelable, data) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        if (data === void 0) { data = null; }
        _super.call(this, type, bubbles, cancelable, data);
    }
    var d = __define,c=GestureEvent,p=c.prototype;
    GestureEvent.GESTURE = "GESTURE";
    return GestureEvent;
})(egret.Event);
egret.registerClass(GestureEvent,'GestureEvent');
//# sourceMappingURL=GestureEvent.js.map