var LevelOver = (function (_super) {
    __extends(LevelOver, _super);
    function LevelOver(name) {
        //console.log(this.name);
        _super.call(this);
        //"lei","wei","kui","meng","zhi"];
        this.infoArr = ["程序员：苏魁",
            "美术：李孟",
            "策划：李经纬",
            "美术：李治",
            "策划：张晨"];
        this._curTime = 0;
        this._curIndex = 0;
        this.name = name;
    }
    var d = __define,c=LevelOver,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.bg = this.createBitmapByName(this.name + "_bg_png");
        this.bg.x = 300;
        this.bg.y = 480;
        this.addChild(this.bg);
        console.log("aaaaaaa", this.name);
        this.role = new Role(this.name, 0.8);
        //this.role.scaleX = 3;
        //this.role.scaleY = 3;
        this.role.x = 300;
        this.role.y = 700;
        this.addChild(this.role);
        this.txtInfo = new egret.TextField();
        this.txtInfo.x = 10;
        this.txtInfo.y = 520;
        //this.addChild(this.txtInfo);
        switch (this.name) {
            case "kui":
                this.txtInfo.text = this.infoArr[0];
                this.playSound();
                break;
            case "meng":
                this.txtInfo.text = this.infoArr[1];
                break;
            case "wei":
                this.txtInfo.text = this.infoArr[2];
                break;
            case "zhi":
                this.txtInfo.text = this.infoArr[3];
                break;
            case "lei":
                this.txtInfo.text = this.infoArr[4];
                break;
        }
        //this.role.play("hit")
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.playSound = function () {
        LevelOver.bgSound = RES.getRes("level_mp3");
        LevelOver.bgChannel = LevelOver.bgSound.play(0, 1);
    };
    p.dispose = function () {
        this.role.remove();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeChildren();
    };
    p.onTouchBegin = function (e) {
        this.dispose();
        this.over();
    };
    p.over = function () {
        //this.next("levelInfo");
    };
    p.tick = function (advancedTime) {
        this._curTime += advancedTime;
        if (this._curTime > 500) {
            while (this._curTime > 500) {
                this._curTime -= 500;
                this._curIndex += 1;
                if (this._curIndex >= 3) {
                    this._curIndex = 0;
                }
            }
            this.play();
        }
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    };
    p.play = function () {
        if (this._curIndex == 0) {
            this.role.play("hit");
        }
        else if (this._curIndex == 1) {
            this.role.play("left");
        }
        else {
            this.role.play("right");
        }
    };
    p.creatBg = function (name) {
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return LevelOver;
})(State);
egret.registerClass(LevelOver,'LevelOver');
//# sourceMappingURL=LevelOver.js.map