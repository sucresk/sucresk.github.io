var PageInfo = (function (_super) {
    __extends(PageInfo, _super);
    function PageInfo() {
        _super.call(this);
    }
    var d = __define,c=PageInfo,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._bg = this.createBitmapByName("bg_jpg");
        this.addChild(this._bg);
        this.x = this.stage.stageWidth / 2;
        this.y = this.stage.stageHeight / 2;
    };
    p.tick = function (advancedTime) {
    };
    p.dispose = function () {
        this.removeChildren();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this.over();
    };
    p.over = function () {
        this.dispose();
        this.next("pageGame");
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return PageInfo;
}(State));
egret.registerClass(PageInfo,'PageInfo');
//# sourceMappingURL=PageInfo.js.map