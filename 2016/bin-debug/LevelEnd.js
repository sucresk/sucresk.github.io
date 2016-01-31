var LevelEnd = (function (_super) {
    __extends(LevelEnd, _super);
    function LevelEnd() {
        _super.call(this);
        this.bg = this.createBitmapByName("ending_png");
        this.bg.x = 300;
        this.bg.y = 480;
        this.addChild(this.bg);
    }
    var d = __define,c=LevelEnd,p=c.prototype;
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return LevelEnd;
})(State);
egret.registerClass(LevelEnd,'LevelEnd');
//# sourceMappingURL=LevelEnd.js.map