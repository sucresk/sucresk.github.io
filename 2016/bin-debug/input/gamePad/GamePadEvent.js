var GamePadEvent = (function (_super) {
    __extends(GamePadEvent, _super);
    function GamePadEvent(type, bubbles, cancelable, data) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        if (data === void 0) { data = null; }
        _super.call(this, type, bubbles, cancelable, data);
    }
    var d = __define,c=GamePadEvent,p=c.prototype;
    GamePadEvent.START = "START";
    return GamePadEvent;
})(egret.Event);
egret.registerClass(GamePadEvent,'GamePadEvent');
//# sourceMappingURL=GamePadEvent.js.map