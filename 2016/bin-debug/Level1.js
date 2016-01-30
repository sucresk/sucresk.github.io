var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        _super.call(this);
        this.goodTime = 200;
        this.perfectTime = 50;
        this._rhythmArr = [];
        this._rhythmTypeArr = [];
        this._touchType = -1;
    }
    var d = __define,c=Level1,p=c.prototype;
    p.init = function () {
        var image = this.createBitmapByName("end_jpg");
        console.log("image_test", image);
        image.x = 0;
        image.y = 0;
        this.addChild(image);
        //this.initRhythm();
        this.testSprite = new egret.Sprite();
        this.addChild(this.testSprite);
        this.testSprite.x = 200;
        this.testSprite.y = 50;
        this._debugText = new egret.TextField();
        this._debugText.x = 300;
        this.addChild(this._debugText);
        this.initConfig();
        this.initUI();
        this.startTime();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        var sound = RES.getRes("sound_test");
        sound.play(0, 1);
    };
    p.initUI = function () {
        this._score = 0;
        this._comboo = 0;
        this._labelScore = new egret.TextField;
        this._txtScore = new egret.TextField;
        this._labelComboo = new egret.TextField;
        this._txtComboo = new egret.TextField;
        this._labelScore.text = "分数";
        this._labelScore.x = 10;
        this._txtScore.text = "0";
        this._txtScore.x = 100;
        this._labelComboo.text = "连击";
        this._labelComboo.x = 170;
        this._txtComboo.text = "0";
        this._txtComboo.x = 270;
        this.addChild(this._labelScore);
        this.addChild(this._txtScore);
        this.addChild(this._labelComboo);
        this.addChild(this._txtComboo);
    };
    p.updateUI = function () {
        this._txtScore.text = this._score.toString();
        this._txtComboo.text = this._comboo.toString();
    };
    p.initConfig = function () {
        var levelConfig = RES.getRes("level1_rhy_json");
        console.log(levelConfig);
        for (var i = 0, len = levelConfig.length; i < len; i++) {
            this._rhythmArr.push(levelConfig[i].beat * 500);
            this._rhythmTypeArr.push(levelConfig[i].action);
        }
        console.log(this._rhythmArr, this._rhythmTypeArr);
        this._endIndex = this._rhythmArr.length;
    };
    p.initRhythm = function () {
        for (var i = 0; i < 10; i++) {
            this._rhythmArr.push(i * 2000);
            this._rhythmTypeArr.push(0);
        }
        this._endIndex = this._rhythmArr.length;
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
    p.onTouchBegin = function (e) {
        this._touching = true;
        this._startTouchX = e.localX;
    };
    p.onTouchEnd = function (e) {
        this._touching = false;
        this._touchedOver = true;
        var d = e.localX - this._startTouchX;
        if (d > 0) {
            this._touchType = 1;
        }
        else {
            this._touchType = 2;
        }
        console.log("touch", this._touchType);
    };
    p.startTime = function () {
        this._curTime = 0;
        this._curIndex = 0;
        this._startGame = true;
        this._curHitTime = this._rhythmArr[this._curIndex];
        this._curTouchType = this._rhythmTypeArr[this._curTouchType];
    };
    p.levelEnd = function () {
        this._startGame = false;
        console.log("end game");
    };
    p.goodTouch = function () {
        this._touched = true;
        this._touchedOver = false;
        console.log("good touch");
        this._comboo++;
        this._score += this._comboo * 10 + 10;
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
        this._comboo = 0;
    };
    p.nextRhythm = function () {
        this._curIndex++;
        this._curHitTime = this._rhythmArr[this._curIndex];
        this._curTouchType = this._rhythmTypeArr[this._curIndex];
        if (!this._touched) {
            this.missTouch();
        }
        this._touched = false;
        this._touchType = -1;
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
            //this.perfectTip();
            this.goodTip();
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
        /*
        if(this._perfectDuring && this.checkTouchType(this._touchType))
        {
            this.perfectTouch();
        }
        */
        if (this._goodDuring && !this._touched && this.checkTouchType(this._touchType)) {
            this.goodTouch();
        }
        //else if(!this._goodDuring)
        /*
        if(this._perfectDuring && this._touching && !this._touched && this._touchedOver)
        {
            this.perfectTouch();
        }
        else if(this._goodDuring && this._touching && !this._touched && this._touchedOver)
        {
            this.goodTouch();
        }
        else if(!this._goodDuring && this._touching && this._touchedOver)
        {
            this.missTouch();
        }
        */
        this.updateUI();
    };
    p.checkTouchType = function (type) {
        console.log(this._curTouchType, type, "checktouchtype");
        if (this._curTouchType == 0) {
            if (type >= 0) {
                return true;
            }
        }
        else if (this._curTouchType == type) {
            return true;
        }
        return false;
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