var LevelTitle = (function (_super) {
    __extends(LevelTitle, _super);
    function LevelTitle() {
        _super.call(this);
        this.imageNames = [];
        this.images = [];
        this.centerX = 300;
        this.centerY = 480;
    }
    var d = __define,c=LevelTitle,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
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
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this._curIndex++;
        if (this._curIndex >= this.images.length) {
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
        this.next("level1");
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return LevelTitle;
})(State);
egret.registerClass(LevelTitle,'LevelTitle');
//# sourceMappingURL=LevelTitlet.js.map