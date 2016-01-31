var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        _super.call(this);
        this.goodTime = 200;
        this.perfectTime = 50;
        this.hitStepTime = 500;
        this.maxToken = 4;
        this._curHitIndex = -1;
        this._rhythmArr = [];
        this._rhythmTypeArr = [];
        this._touchType = -1;
        this._pillarArr = [];
        this.heads = [];
        this.tokens = [];
        this.headNames = ["lei_png", "wei_png", "kui_png", "meng_png", "zhi_png"];
        this.roleNames = ["lei", "wei", "kui", "meng", "zhi"];
        this.roles = [];
        this.decorationNames = ["barrel_png", "flower_png", "chair_png", "toilet_png"];
        this.decorationPos = [150, 200, 480, 200, 150, 700, 480, 700];
        this.decorations = [];
        this.playDecorationNum = 4;
        this.tokenNames = ["v_png", "caret_png", "x_png", "delete_png", "triangle_png", "left_square_bracket_png",
            "right_square_bracket_png", "rectangle_png", "star_png", "arrow_png"];
        this.headLayer = new egret.DisplayObjectContainer();
        this.userGestureLayer = new egret.DisplayObjectContainer();
    }
    var d = __define,c=Level1,p=c.prototype;
    p.init = function () {
        var image = this.createBitmapByName("bgImage");
        console.log("image_test", image);
        image.x = 0;
        image.y = 0;
        this.addChild(image);
        //this.initRhythm();
        this.testSprite = new egret.Sprite();
        //this.addChild(this.testSprite);
        this.testSprite.x = 200;
        this.testSprite.y = 50;
        this._debugText = new egret.TextField();
        this._debugText.x = 400;
        //this.addChild(this._debugText);
        this.initConfig();
        //this.initUI();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        // this.bgSound = RES.getRes("sound_test");
        this.bgSound = RES.getRes("level_mp3");
        this.bgChannel = this.bgSound.play(0, 1);
        this.gesture = new GestureController(this.stage, this.userGestureLayer);
        this.gesture.addEventListener(GestureEvent.GESTURE, this.onGesture, this);
        //this.gesture.start();
        this.initAltar();
        this.initPillar();
        this.initDecoration();
        this.addChild(this.headLayer);
        this.addChild(this.userGestureLayer);
        /*
        var man:Man = new Man();
        man.x = 100;
        man.y = 300;
        this.addChild(man);
        man.play("hit");
        */
        //var head0:Head = this.createHead("head0_png")
        //this.addHeadTo(head0,0);
        this.addOneRole();
        /*
        var head1:Head = this.createHead("head0_png")
        this.addHeadTo(head1,1);
        var head2:Head = this.createHead("head0_png")
        this.addHeadTo(head2,2);
        var head3:Head = this.createHead("head0_png")
        this.addHeadTo(head3,3);
        var head4:Head = this.createHead("head0_png")
        this.addHeadTo(head4,4);
        */
        //head.play();
        this.helpSprite = new egret.Sprite();
        this.addChild(this.helpSprite);
        this.startTime();
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
        var levelConfig = RES.getRes("level_1_json");
        console.log(levelConfig);
        this._rhythmObjs = levelConfig;
        for (var i = 0, len = levelConfig.length; i < len; i++) {
            this._rhythmArr.push(levelConfig[i].beat * 500);
            this._rhythmTypeArr.push(levelConfig[i].action);
        }
        console.log(this._rhythmArr.length, "aaaaaaaaaaaaa");
        this._endIndex = this._rhythmArr.length;
    };
    p.initRhythm = function () {
        for (var i = 0; i < 10; i++) {
            this._rhythmArr.push(i * 2000);
            this._rhythmTypeArr.push(0);
        }
        this._endIndex = this._rhythmArr.length;
    };
    p.initAltar = function () {
        this.altar = new Altar();
        this.altar.x = 300;
        this.altar.y = 580;
        this.addChild(this.altar);
        this.altar.normal();
    };
    p.initPillar = function () {
        var p0 = new egret.Point(299, 310);
        var p1 = new egret.Point(453, 424);
        var p2 = new egret.Point(389, 567);
        var p3 = new egret.Point(202, 569);
        var p4 = new egret.Point(153, 398);
        this._pillarArr.push(p0);
        this._pillarArr.push(p1);
        this._pillarArr.push(p2);
        this._pillarArr.push(p3);
        this._pillarArr.push(p4);
    };
    p.initDecoration = function () {
        for (var i = 0, len = this.decorationNames.length; i < len; i++) {
            var d = new Decoration(this.decorationNames[i]);
            d.x = this.decorationPos[i * 2];
            d.y = this.decorationPos[i * 2 + 1] + 120;
            this.decorations.push(d);
            this.addChild(d);
        }
    };
    p.goodTip = function () {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xffff00);
        this.testSprite.graphics.drawCircle(0, 0, 30);
        this.testSprite.graphics.endFill();
    };
    p.perfectTip = function () {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xff0000);
        this.testSprite.graphics.drawCircle(0, 0, 30);
        this.testSprite.graphics.endFill();
    };
    p.normalTip = function () {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0x0000ff);
        this.testSprite.graphics.drawCircle(0, 0, 30);
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
        if (this._curTouchType == Level1.TYPE_TAP) {
            if (d > 0) {
                this._touchType = 1;
            }
            else {
                this._touchType = 2;
            }
            console.log("touch", this._touchType);
        }
    };
    p.onGesture = function (e) {
        console.log("ongesture", e.data);
        if (this._curTouchType == Level1.TYPE_GESTURE) {
            var obj = this._rhythmObjs[this._curIndex];
            console.log("ddddddddd", obj.gesture, e.data);
            if (obj.gesture == e.data) {
                this._touchType = Level1.TYPE_GESTURE;
            }
            else {
                this.missGesture();
            }
        }
    };
    p.startTime = function () {
        this._curTime = 0;
        this._curIndex = 0;
        this._startGame = true;
        this._curHitTime = this._rhythmArr[this._curIndex];
        this._curTouchType = this._rhythmTypeArr[this._curTouchType];
    };
    p.levelEnd = function () {
        var end = function () {
            this.dispose();
            console.log("end end end ");
            this.next("levelOver0");
        };
        this._startGame = false;
        var self = this;
        console.log("end game");
        var black = new egret.Shape();
        black.graphics.beginFill(0);
        black.graphics.drawRect(0, 0, 600, 960);
        black.graphics.endFill();
        black.alpha = 0;
        this.addChild(black);
        if (this.bgChannel) {
            this.bgChannel.stop();
        }
        var tw = egret.Tween.get(black);
        tw.wait(2000);
        tw.to({ "alpha": 1 }, 5000);
        tw.wait(20);
        tw.to({ "scaleX": 1 }, 1);
        tw.call(end, self);
    };
    p.dispose = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.gesture.removeEventListener(GestureEvent.GESTURE, this.onGesture, this);
        this.removeChildren();
    };
    p.goodTouch = function () {
        this._touched = true;
        this._touchedOver = false;
        console.log("good touch");
        this._comboo++;
        this._score += this._comboo * 10 + 10;
        this.altar.correct();
    };
    p.goodGesture = function () {
        this._touched = true;
        this._touchedOver = false;
        console.log("good gesture");
        this._comboo++;
        this._score += this._comboo * 10 + 10;
        this.addOneToken(this.curTokenName);
        this.altar.correct();
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
        this.altar.wrong();
    };
    p.missGesture = function () {
        this.missTouch();
        console.log("miss gesture");
        this.addOneToken();
    };
    p.nextRhythm = function () {
        this._curIndex++;
        if (!this._touched) {
            if (this._curTouchType == Level1.TYPE_TAP) {
                this.missTouch();
            }
            else if (this._curTouchType == Level1.TYPE_GESTURE) {
                this.missGesture();
            }
        }
        this._drawed = false;
        this._curHitTime = this._rhythmArr[this._curIndex];
        this._curTouchType = this._rhythmTypeArr[this._curIndex];
        this._touched = false;
        this._touchType = -1;
        if (this._curTouchType == Level1.TYPE_GESTURE) {
            var obj = this._rhythmObjs[this._curIndex];
            this.goodTime = obj.duration * this.hitStepTime;
            this.curTokenName = obj.gesture;
            console.log("gesture begin", this.curTokenName);
            this.gesture.start();
        }
        else {
            this.goodTime = 200;
            console.log("gesture over");
            this.gesture.stop();
            if (this._curTouchType == Level1.TYPE_LEFT) {
                this.AllLeft();
            }
            else if (this._curTouchType == Level1.TYPE_RIGHT) {
                this.AllRight();
            }
        }
        //this.addOneToken();
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
        if (this._curTouchType == Level1.TYPE_TAP) {
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
            if (this._goodDuring && !this._touched && this.checkTouchType(this._touchType)) {
                this.goodTouch();
            }
        }
        else if (this._curTouchType == Level1.TYPE_DRAW) {
            if (this._curTime > this._curHitTime) {
                this.drawHelp(this._curIndex);
            }
        }
        else if (this._curTouchType == Level1.TYPE_CLEAR) {
            if (this._curTime > this._curHitTime) {
                this.clearHelp();
            }
        }
        else if (this._curTouchType == Level1.TYPE_GESTURE) {
            var obj = this._rhythmObjs[this._curIndex];
            if (this._curTime > this._curHitTime
                && this._curTime < this._curHitTime + obj.duration * this.hitStepTime) {
                this._goodDuring = true;
            }
            else {
                this._goodDuring = false;
            }
            if (this._goodDuring && !this._touched && this.checkTouchType(this._touchType)) {
                this.goodGesture();
            }
        }
        /*
        if(this._perfectDuring && this.checkTouchType(this._touchType))
        {
            this.perfectTouch();
        }
        */
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
        //this.updateUI();
        this.hitStep(this._curTime);
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    };
    p.checkTouchType = function (type) {
        //console.log(this._curTouchType, type, "checktouchtype")
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
    p.addHeadTo = function (head, index) {
        var x = this._pillarArr[index].x;
        var y = this._pillarArr[index].y;
        head.x = x;
        head.y = y + 120;
        this.heads.push(head);
        this.headLayer.addChild(head);
    };
    p.createHead = function (name) {
        return new Head(name);
    };
    p.hitStep = function (curTime) {
        var i = Math.floor(curTime / this.hitStepTime);
        if (i != this._curHitIndex) {
            this._curHitIndex = i;
            this.AllHit();
            return;
            if (this._curTouchType == Level1.TYPE_LEFT) {
                console.log("left");
                this.AllLeft();
            }
            else if (this._curTouchType == Level1.TYPE_RIGHT) {
                console.log("right");
                this.AllRight();
            }
            else {
                console.log("hit");
                this.AllHit();
            }
        }
    };
    p.AllHit = function () {
        for (var i = 0, len = this.heads.length; i < len; i++) {
            this.heads[i].play();
        }
        for (i = 0, len = this.roles.length; i < len; i++) {
            this.roles[i].play("hit");
        }
        var n = this.playDecorationNum < this.decorations.length ?
            this.playDecorationNum : this.decorations.length;
        for (i = 0, len = n; i < len; i++) {
            this.decorations[i].play();
        }
    };
    p.AllLeft = function () {
        for (var i = 0, len = this.heads.length; i < len; i++) {
            this.heads[i].left();
        }
        for (i = 0, len = this.roles.length; i < len; i++) {
            this.roles[i].play("left");
        }
        var n = this.playDecorationNum < this.decorations.length ?
            this.playDecorationNum : this.decorations.length;
        for (i = 0, len = n; i < len; i++) {
            this.decorations[i].play();
        }
    };
    p.AllRight = function () {
        for (var i = 0, len = this.heads.length; i < len; i++) {
            this.heads[i].right();
        }
        for (i = 0, len = this.roles.length; i < len; i++) {
            this.roles[i].play("right");
        }
        var n = this.playDecorationNum < this.decorations.length ?
            this.playDecorationNum : this.decorations.length;
        for (i = 0, len = n; i < len; i++) {
            this.decorations[i].play();
        }
    };
    p.drawHelp = function (index) {
        if (!this._drawed) {
            this._drawed = true;
            var obj = this._rhythmObjs[index];
            this.helpSprite.graphics.lineStyle(20, 0xff0000, 1);
            this.helpSprite.graphics.moveTo(obj.line[0], obj.line[1]);
            this.helpSprite.graphics.lineTo(obj.line[2], obj.line[3]);
        }
    };
    p.clearHelp = function () {
        this.helpSprite.graphics.clear();
    };
    p.addOneToken = function (name) {
        if (name === void 0) { name = null; }
        if (this.tokens.length >= this.maxToken) {
            this.clearToken();
        }
        var i;
        if (name == null) {
            i = Math.floor(Math.random() * this.tokenNames.length);
        }
        else {
            i = this.getTokenIndex(name);
        }
        var t = this.createToken(i);
        this.addToken(t);
        if (this.tokens.length >= this.maxToken) {
            this.addOneRole();
        }
    };
    p.createToken = function (index) {
        var bmp = this.createBitmapByName(this.tokenNames[index]);
        return bmp;
    };
    p.addToken = function (bmp) {
        this.tokens.push(bmp);
        bmp.x = this.tokens.length * 100;
        bmp.y = 800;
        this.addChild(bmp);
    };
    p.clearToken = function () {
        for (var i = 0, len = this.tokens.length; i < len; i++) {
            if (this.tokens[i].parent) {
                this.removeChild(this.tokens[i]);
            }
        }
        this.tokens.length = 0;
    };
    p.addOneRole = function () {
        var i = Math.floor(Math.random() * this.roleNames.length);
        var r = this.createRole(i);
        this.addRole(r);
        if (this.heads.length < 5) {
            var head = this.createHead(this.headNames[i]);
            this.addHeadTo(head, this.heads.length);
        }
    };
    p.createRole = function (index) {
        var name = this.roleNames[index];
        var role = new Role(name);
        return role;
    };
    p.addRole = function (r) {
        this.roles.push(r);
        r.play("hit");
        r.x = this.roles.length * 120 - 60;
        r.y = 200;
        this.addChild(r);
    };
    p.clearRole = function () {
        for (var i = 0, len = this.roles.length; i < len; i++) {
            this.roles[i].remove();
            if (this.roles[i].parent) {
                this.removeChild(this.roles[i]);
            }
        }
        this.roles.length = 0;
    };
    p.getTokenIndex = function (name) {
        switch (name) {
            case "v":
                return 0;
            case "caret":
                return 1;
            case "x":
                return 2;
            case "delete":
                return 3;
            case "triangle":
                return 4;
            case "left square bracket":
                return 5;
            case "right square bracket":
                return 6;
            case "rectangle":
                return 7;
            case "star":
                return 8;
            case "arrow":
                return 9;
            default:
                return 0;
        }
    };
    Level1.TYPE_TAP = 0;
    Level1.TYPE_DRAW = -1;
    Level1.TYPE_CLEAR = -2;
    Level1.TYPE_GESTURE = 3;
    Level1.TYPE_RIGHT = 1;
    Level1.TYPE_LEFT = 2;
    return Level1;
})(State);
egret.registerClass(Level1,'Level1');
//# sourceMappingURL=Level1.js.map