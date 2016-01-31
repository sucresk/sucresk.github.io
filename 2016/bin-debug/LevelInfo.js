var LevelInfo = (function (_super) {
    __extends(LevelInfo, _super);
    function LevelInfo() {
        _super.call(this);
        this.imageNames = ["info0_jpg", "info1_jpg", "info2_jpg", "info3_jpg", "info4_jpg", "info5_jpg"];
        this.images = [];
        this.centerX = 300;
        this.centerY = 480;
        this.bg1Sound = RES.getRes("title_bg_1_mp3");
        this.bg2Sound = RES.getRes("title_bg_2_mp3");
    }
    var d = __define,c=LevelInfo,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.bg1Channel = this.bg1Sound.play(0, 1);
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
        if (this._curIndex == 4) {
            if (this.bg1Channel) {
                this.bg1Channel.stop();
            }
            this.bg2Channel = this.bg2Sound.play(0, 1);
        }
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
        this.next("levelTitle");
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
    return LevelInfo;
})(State);
egret.registerClass(LevelInfo,'LevelInfo');
//# sourceMappingURL=LevelInfo.js.map