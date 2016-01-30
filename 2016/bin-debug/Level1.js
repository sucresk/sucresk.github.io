var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        _super.call(this);
        this.goodTime = 900;
        this.perfectTime = 50;
        this._rhythmArr = [];
    }
    var d = __define,c=Level1,p=c.prototype;
    p.init = function () {
        this.initRhythm();
        this.testSprite = new egret.Sprite();
        this.addChild(this.testSprite);
        this.testSprite.x = 200;
        this.testSprite.y = 50;
        this._debugText = new egret.TextField();
        this._debugText.x = 300;
        this.addChild(this._debugText);
        this.startTime();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        var sound = RES.getRes("sound_test");
        sound.play();
        var image = this.createBitmapByName("end_jpg");
        console.log("image_test", image);
        image.x = 0;
        image.y = 0;
        this.addChild(image);
    };
    p.goodTip = function () {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xffff00);
        this.testSprite.graphics.drawCircle(0, 0, 100);
        this.testSprite.graphics.endFill();
    };
    p.perfectTip = function () {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xff0000);
        this.testSprite.graphics.drawCircle(0, 0, 100);
        this.testSprite.graphics.endFill();
    };
    p.normalTip = function () {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0x0000ff);
        this.testSprite.graphics.drawCircle(0, 0, 100);
        this.testSprite.graphics.endFill();
    };
    p.initRhythm = function () {
        for (var i = 0; i < 10; i++) {
            this._rhythmArr.push(i * 2000);
        }
        this._endIndex = this._rhythmArr.length;
    };
    p.onTouchBegin = function (e) {
        this._touching = true;
    };
    p.onTouchEnd = function (e) {
        this._touching = false;
        this._touchedOver = true;
    };
    p.startTime = function () {
        this._curTime = 0;
        this._curIndex = 0;
        this._startGame = true;
        this._curHitTime = this._rhythmArr[this._curIndex];
    };
    p.levelEnd = function () {
        this._startGame = false;
        console.log("end game");
    };
    p.goodTouch = function () {
        this._touched = true;
        this._touchedOver = false;
        console.log("good touch");
    };
    p.perfectTouch = function () {
        this._touched = true;
        this._touchedOver = false;
        console.log("perfect touch");
    };
    p.missTouch = function () {
        this._touched = true;
        this._touchedOver = false;
        console.log("missing");
    };
    p.nextRhythm = function () {
        this._curIndex++;
        this._curHitTime = this._rhythmArr[this._curIndex];
        if (!this._touched) {
            this.missTouch();
        }
        this._touched = false;
    };
    p.tick = function (advancedTime) {
        if (!this._startGame) {
            return;
        }
        this._curTime += advancedTime;
        this._debugText.text = this._curTime.toString();
        while (this._curTime > this._curHitTime + this.goodTime && this._curIndex < this._endIndex) {
            this.nextRhythm();
        }
        if (this._curIndex >= this._endIndex) {
            this.levelEnd();
        }
        if (this._curTime > this._curHitTime - this.perfectTime &&
            this._curTime < this._curHitTime + this.perfectTime) {
            this._perfectDuring = true;
            this.perfectTip();
        }
        else {
            this._perfectDuring = false;
            if (this._curTime > this._curHitTime - this.goodTime &&
                this._curTime < this._curHitTime + this.goodTime) {
                this._goodDuring = true;
                this.goodTip();
            }
            else {
                this._goodDuring = false;
                this.normalTip();
            }
        }
        if (this._perfectDuring && this._touching && !this._touched && this._touchedOver) {
            this.perfectTouch();
        }
        else if (this._goodDuring && this._touching && !this._touched && this._touchedOver) {
            this.goodTouch();
        }
        else if (!this._goodDuring && this._touching && this._touchedOver) {
            this.missTouch();
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Level1;
})(State);
egret.registerClass(Level1,'Level1');
//# sourceMappingURL=Level1.js.map