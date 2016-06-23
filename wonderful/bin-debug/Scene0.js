var Scene0 = (function (_super) {
    __extends(Scene0, _super);
    function Scene0() {
        _super.call(this);
        this._pos = 0;
        this._speed = -0.003;
        this._comeSpeed = 0.05;
    }
    var d = __define,c=Scene0,p=c.prototype;
    p.init = function () {
        _super.prototype.init.call(this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this._role = new Role("wonderful", 1);
        this.addChild(this._role);
        this._role.play("wan");
        this._role.x = 100;
        this._role.y = 300;
    };
    p.tick = function (advancedTime) {
        if (this._pos > 1) {
            this._pos += this._speed;
        }
        this._role.gotoAndStop("wan", this._pos);
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    };
    p.dispose = function () {
        this.removeChildren();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this._pos += this._comeSpeed;
        console.log(this._pos);
    };
    p.over = function () {
        this.dispose();
        this.next("levelTitle");
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return Scene0;
}(State));
egret.registerClass(Scene0,'Scene0');
//# sourceMappingURL=Scene0.js.map