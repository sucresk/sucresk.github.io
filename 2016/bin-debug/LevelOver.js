var LevelOver = (function (_super) {
    __extends(LevelOver, _super);
    function LevelOver(name) {
        //console.log(this.name);
        _super.call(this);
        this._curTime = 0;
        this._curIndex = 0;
        this.name = name;
    }
    var d = __define,c=LevelOver,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        console.log("aaaaaaa", this.name);
        this.role = new Role(this.name, 1);
        //this.role.scaleX = 3;
        //this.role.scaleY = 3;
        this.role.x = 300;
        this.role.y = 500;
        this.addChild(this.role);
        //this.role.play("hit")
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.dispose = function () {
        this.role.remove();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
    };
    p.over = function () {
        this.next("levelInfo");
    };
    p.tick = function (advancedTime) {
        this._curTime += advancedTime;
        if (this._curTime > 500) {
            this._curTime = 0;
            this._curIndex += 1;
            if (this._curIndex >= 3) {
                this._curIndex = 0;
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
    return LevelOver;
})(State);
egret.registerClass(LevelOver,'LevelOver');
//# sourceMappingURL=LevelOver.js.map