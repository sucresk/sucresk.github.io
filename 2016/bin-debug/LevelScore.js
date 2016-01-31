var LevelScore = (function (_super) {
    __extends(LevelScore, _super);
    function LevelScore() {
        _super.call(this);
        this.centerX = 300;
        this.centerY = 480;
        this.score0 = this.createBitmapByName("S_png");
        this.score1 = this.createBitmapByName("A_png");
        this.score2 = this.createBitmapByName("B_png");
        this.score3 = this.createBitmapByName("C_png");
        this.score4 = this.createBitmapByName("D_png");
        this.txtScore = new egret.TextField();
        this.txtComboo = new egret.TextField();
    }
    var d = __define,c=LevelScore,p=c.prototype;
    p.init = function () {
        if (GameData.score > 1500) {
            this.curScore = this.score0;
        }
        else if (GameData.score > 1000) {
            this.curScore = this.score1;
        }
        else if (GameData.score > 800) {
            this.curScore = this.score2;
        }
        else if (GameData.score > 500) {
            this.curScore = this.score3;
        }
        else {
            this.curScore = this.score4;
        }
        this.curScore.x = this.centerX;
        this.curScore.y = this.centerY;
        this.addChild(this.curScore);
        this.txtScore.text = GameData.score.toString();
        this.txtComboo.text = GameData.maxComboo.toString();
        this.txtScore.x = 350;
        this.txtScore.y = 400;
        this.txtComboo.x = 350;
        this.txtComboo.y = 450;
        this.addChild(this.txtScore);
        this.addChild(this.txtComboo);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    p.onTouchBegin = function (e) {
        this.dispose();
        this.next("levelOver0");
    };
    p.dispose = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeChildren();
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        return result;
    };
    return LevelScore;
})(State);
egret.registerClass(LevelScore,'LevelScore');
//# sourceMappingURL=LevelScore.js.map