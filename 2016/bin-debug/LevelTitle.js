var LevelTitle = (function (_super) {
    __extends(LevelTitle, _super);
    function LevelTitle() {
        _super.call(this);
        this.imageNames = ["title_1_png", "title_2_png", "title_3_png", "title_4_png"];
        this.images = [];
        this.centerX = 300;
        this.centerY = 480;
    }
    var d = __define,c=LevelTitle,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.bgSound = RES.getRes("sound_test");
        //this.bgSound = RES.getRes("level_mp3");
        this.bgChannel = this.bgSound.play(0, 1);
        this.bg = this.createBitmapByName("title_bg_jpg");
        this.bg.x = this.centerX;
        this.bg.y = this.centerY;
        this.addChild(this.bg);
        var i;
        var len;
        for (i = 0, len = this.imageNames.length; i < len; i++) {
            var image = this.createBitmapByName(this.imageNames[i]);
            this.images.push(image);
            image.x = this.centerX;
            if (i == 0) {
                image.y = this.centerY;
            }
            else if (i == 1) {
                image.y = this.centerY;
            }
            else if (i == 2) {
                image.y = this.centerY;
            }
            else {
                image.y = this.centerY + 350;
            }
            this.addChild(image);
            image.visible = false;
        }
        this._curIndex = 0;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        if (this._curIndex < this.images.length) {
            this.images[this._curIndex].visible = true;
        }
        this._curIndex++;
        console.log(this._curIndex, this.images.length);
        if (this._curIndex > this.images.length) {
            this.over();
            return;
        }
    };
    p.dispose = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        if (this.bgChannel) {
            this.bgChannel.stop();
        }
    };
    p.over = function () {
        this.dispose();
        this.next("story");
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
//# sourceMappingURL=LevelTitle.js.map