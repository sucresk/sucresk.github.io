var LevelStroy = (function (_super) {
    __extends(LevelStroy, _super);
    function LevelStroy() {
        _super.call(this);
        this.imageNames = ["story0_png", "story1_png", "story2_png"];
        this.images = [];
        this.centerX = 300;
        this.centerY = 480;
    }
    var d = __define,c=LevelStroy,p=c.prototype;
    p.init = function () {
        var i;
        var len;
        for (i = 0, len = this.imageNames.length; i < len; i++) {
            var image = this.createBitmapByName(this.imageNames[i]);
            this.images.push(image);
            image.x = this.centerX;
            image.y = this.centerY;
            this.addChild(image);
            image.visible = false;
        }
        this._curIndex = 0;
        this.images[this._curIndex].visible = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.dispose = function () {
        this.removeChildren();
        this.images.length = 0;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this._curIndex++;
        if (this._curIndex >= this.imageNames.length) {
            this.over();
            return;
        }
        var i;
        var len;
        for (i = 0, len = this.images.length; i < len; i++) {
            var image = this.images[i];
            image.visible = false;
        }
        this.images[this._curIndex].visible = true;
    };
    p.over = function () {
        this.dispose();
        this.next("level1");
        //this.next("levelOver4");
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return LevelStroy;
})(State);
egret.registerClass(LevelStroy,'LevelStroy');
//# sourceMappingURL=LevelStroy.js.map