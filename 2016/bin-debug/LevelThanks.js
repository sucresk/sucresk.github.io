var LevelThanks = (function (_super) {
    __extends(LevelThanks, _super);
    function LevelThanks() {
        _super.call(this);
        this.bg = this.createBitmapByName("thanks_png");
        this.bg.x = 300;
        this.bg.y = 480;
    }
    var d = __define,c=LevelThanks,p=c.prototype;
    p.init = function () {
        this.addChild(this.bg);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this.dispose();
        this.next("levelEnd");
    };
    p.dispose = function () {
        this.removeChildren();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return LevelThanks;
})(State);
egret.registerClass(LevelThanks,'LevelThanks');
//# sourceMappingURL=LevelThanks.js.map