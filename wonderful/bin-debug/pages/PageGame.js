var PageGame = (function (_super) {
    __extends(PageGame, _super);
    function PageGame() {
        _super.call(this);
        this._pos = 0;
        this._comeSpeed = 0.05;
        this._totalTime = 4.5;
        this.conSpeeds = [];
        this.curSpeed = PageGame.SPEED_0;
        this.curLevel = 0;
        this.difficult = 1;
        this.bottomNum = 0;
        this.curState = 0;
        this._curTime = 0;
        this._curHit = 0;
        this._roleQueue = [];
        this._roleBoss = [];
        this._roleManager = new RoleManager();
        this._roleContainer = new egret.Sprite();
        this._uiContainer = new egret.Sprite();
        this._roleBgContainer = new egret.Sprite();
    }
    var d = __define,c=PageGame,p=c.prototype;
    p.init = function () {
        console.log("init pageGame ");
        _super.prototype.init.call(this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this._curTime = PageGame.TOTAL_TIME;
        this.initRoleQueue();
        this._roleContainer.removeChildren();
        this._uiContainer.removeChildren();
        this.initBg();
        this.addChild(this._roleBgContainer);
        this.addChild(this._roleContainer);
        this.addChild(this._uiContainer);
        this.initUI();
        this.initRoleBg();
        this.initRole();
        this.initDifficult();
        this.initLevel();
    };
    p.initRoleQueue = function () {
        this._roleQueue.length = 0;
        for (var i = 0; i < 10; i++) {
            if (i == 5) {
                this.randomRole(true);
            }
            else {
                this.randomRole();
            }
        }
    };
    p.initRole = function () {
        if (this._role != null && this._role.parent != null) {
            this._roleContainer.addChild(this._role);
        }
        this._curRoleName = this._roleQueue.shift();
        this._curBoss = this._roleBoss.shift();
        this._role = this._roleManager.getRole(this._curRoleName);
        this._role.gotoAndStop("wan", 0);
        dragonBones.WorldClock.clock.advanceTime(0);
        this._curRoleSex = this._roleManager.getRoleSex(this._curRoleName);
        if (this._curBoss) {
            this._role.scaleX = this._role.scaleY = 1.2;
        }
        else {
            this._role.scaleX = this._role.scaleY = 1;
        }
        this._roleContainer.addChild(this._role);
        this._role.x = this.stage.stageWidth / 2;
        this._role.y = this.stage.stageHeight - 200;
        this._totalTime = this._role.totleTime;
        var isBoss = Math.random() < 0.2;
        this.randomRole(isBoss);
    };
    p.initRoleBg = function () {
        this._roleBgContainer.removeChildren();
        for (var i = this._roleQueue.length - 1; i >= 1; i--) {
            console.log("aaaaaaaaa", i);
            var rolebg = this.createBitmapByName(this._roleQueue[i] + "_png");
            //var rolebg:egret.Bitmap = this.createBitmapByName("man1" + "_png");
            rolebg.x = this.stage.stageWidth / 2 + (i * 20);
            rolebg.y = this.stage.stageHeight - 200 - (i * 50) - rolebg.height / 2;
            this._roleBgContainer.addChild(rolebg);
        }
    };
    p.randomRole = function (boss) {
        if (boss === void 0) { boss = false; }
        var index = Math.floor(Math.random() * RoleManager.ROLES.length);
        var roleName = RoleManager.ROLES[index];
        this._roleQueue.push(roleName);
        this._roleBoss.push(boss);
    };
    p.initBg = function () {
        this._bg = this.createBitmapByName("bgGame_jpg");
        this._bg.x = this.stage.stageWidth / 2;
        this._bg.y = this.stage.stageHeight / 2;
        this.addChild(this._bg);
    };
    p.initUI = function () {
        this._btn0 = this.createBitmapByName("btn_nv_png");
        this._btn0.x = this.stage.stageWidth / 2 - 100;
        this._btn0.y = this.stage.stageHeight - 100;
        this._uiContainer.addChild(this._btn0);
        this._btn1 = this.createBitmapByName("btn_nv1_png");
        this._btn1.x = this.stage.stageWidth / 2 - 100;
        this._btn1.y = this.stage.stageHeight - 100;
        this._uiContainer.addChild(this._btn1);
        this._btn1.visible = false;
        this._btn2 = this.createBitmapByName("btn_nan_png");
        this._btn2.x = this.stage.stageWidth / 2 + 100;
        this._btn2.y = this.stage.stageHeight - 100;
        this._uiContainer.addChild(this._btn2);
        this._btn3 = this.createBitmapByName("btn_nan1_png");
        this._btn3.x = this.stage.stageWidth / 2 + 100;
        this._btn3.y = this.stage.stageHeight - 100;
        this._uiContainer.addChild(this._btn3);
        this._btn3.visible = false;
        this._txtTime = new egret.TextField();
        this._txtTime.x = 10;
        this._txtTime.y = 10;
        this._uiContainer.addChild(this._txtTime);
    };
    p.refreshBtn = function () {
        if (this._curBoss) {
            this._btn0.visible = false;
            this._btn1.visible = false;
            this._btn2.visible = false;
            this._btn3.visible = false;
        }
        else {
            this._btn0.visible = true;
            this._btn1.visible = false;
            this._btn2.visible = true;
            this._btn3.visible = false;
        }
    };
    p.refreshUI = function () {
        this._txtTime.text = this._curTime / 1000 + "seconds";
    };
    p.initDifficult = function () {
        this.difficult = Math.floor(Math.random() * 3);
        if (this._curBoss) {
            this.difficult = 3;
        }
        this.conSpeeds = PageGame.CON_SPEED_ARR[this.difficult]; //PageGame.CON_SPEED_0;
        this.curConSpeed = this.conSpeeds[0];
        this.curSpeed = this._totalTime / PageGame.SPEED_ARR[this.difficult];
    };
    p.initLevel = function () {
        this.curState = PageGame.STATE_START;
        this._pos = 0;
    };
    p.tick = function (advancedTime) {
        this._curTime -= advancedTime;
        if (this._curTime <= 0) {
            this.endGame();
        }
        switch (this.curState) {
            case PageGame.STATE_START:
                this.tickStart(advancedTime);
                break;
            case PageGame.STATE_RUN:
                this.tickRun(advancedTime);
                break;
            case PageGame.STATE_END:
                this.tickEnd(advancedTime);
                break;
            default:
                break;
        }
        this.refreshUI();
    };
    p.tickStart = function (advancedTime) {
        this.curState = PageGame.STATE_RUN;
    };
    p.tickEnd = function (advancedTime) {
        var self = this;
        var tw = egret.Tween.get(this._role);
        //tw.
        if (this._curRoleSex == 1) {
            tw.to({ "x": this.stage.stageWidth + 200 }, 200);
        }
        else {
            tw.to({ "x": -200 }, 200);
        }
        tw.call(this.nextLevel, self);
    };
    p.nextLevel = function () {
        egret.Tween.removeTweens(this._role);
        this.curLevel++;
        this.initRoleBg();
        this.initRole();
        this.initDifficult();
        this.initLevel();
        this.refreshBtn();
    };
    p.tickRun = function (advancedTime) {
        if (this._pos > this._totalTime * 0.9) {
            this.curConSpeed = this.conSpeeds[2];
        }
        else if (this._pos > this._totalTime * 0.3) {
            this.curConSpeed = this.conSpeeds[1];
        }
        else {
            this.curConSpeed = this.conSpeeds[0];
        }
        this._pos += this.curConSpeed;
        if (this._pos >= this._totalTime) {
            this._realPos = this._totalTime - 0.001;
            this.bottomNum++;
            if (this.bottomNum >= PageGame.LEVEL_COMPLETE_BOTTOM_NUM) {
                this.levelComplete();
            }
        }
        else {
            this._realPos = this._pos;
            if (this.bottomNum > 0) {
                this.bottomNum--;
            }
        }
        this._role.gotoAndStop("wan", this._realPos);
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    };
    p.endGame = function () {
        this.curState = PageGame.STATE_OVER;
        this.over();
    };
    p.dispose = function () {
        this.removeChildren();
        if (this.stage) {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
    };
    p.onTouchBegin = function (e) {
        var touchX = e.stageX;
        var halfStageX = this.stage.stageWidth / 2;
        if (this._curBoss) {
            this._pos += this.curSpeed;
            this._curHit++;
        }
        else {
            if (this._curRoleSex == 1) {
                if (touchX < halfStageX) {
                }
                else {
                    this._pos += this.curSpeed;
                    this._curHit++;
                    this._btn2.visible = false;
                    this._btn3.visible = true;
                }
            }
            else if (this._curRoleSex == 0) {
                if (touchX < halfStageX) {
                    this._pos += this.curSpeed;
                    this._curHit++;
                    this._btn0.visible = false;
                    this._btn1.visible = true;
                }
                else {
                }
            }
        }
    };
    p.onTouchEnd = function (e) {
        if (this._curBoss) {
        }
        else {
            this._btn1.visible = false;
            this._btn0.visible = true;
            this._btn3.visible = false;
            this._btn2.visible = true;
        }
    };
    p.levelComplete = function () {
        this.curState = PageGame.STATE_END;
        console.log("level complete");
    };
    p.over = function () {
        this.dispose();
        this.next("pageOver");
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    PageGame.SPEED_0 = 1;
    PageGame.SPEED_1 = 2;
    PageGame.SPEED_2 = 3;
    PageGame.SPEED_3 = 50;
    PageGame.SPEED_ARR = [PageGame.SPEED_0,
        PageGame.SPEED_1,
        PageGame.SPEED_2,
        PageGame.SPEED_3];
    PageGame.CON_SPEED_0 = [0, 0, 0]; // 0%  30%  90% 
    PageGame.CON_SPEED_1 = [0, 0, 0]; // 0%  30%  90% 
    PageGame.CON_SPEED_2 = [0, 0, 0]; // 0%  30%  90% 
    PageGame.CON_SPEED_3 = [-0.001, -0.002, -0.003];
    PageGame.CON_SPEED_ARR = [PageGame.CON_SPEED_0,
        PageGame.CON_SPEED_1,
        PageGame.CON_SPEED_2,
        PageGame.CON_SPEED_3];
    PageGame.LEVEL_COMPLETE_BOTTOM_NUM = 3;
    PageGame.TOTAL_TIME = 60000;
    PageGame.STATE_START = 0;
    PageGame.STATE_RUN = 1;
    PageGame.STATE_END = 2;
    PageGame.STATE_OVER = 4;
    return PageGame;
}(State));
egret.registerClass(PageGame,'PageGame');
//# sourceMappingURL=PageGame.js.map