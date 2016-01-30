var Head = (function (_super) {
    __extends(Head, _super);
    function Head(name) {
        _super.call(this);
        this.bmp = this.createBitmapByName(name);
        /*
        con2.scaleX = 0.55;
        icon2.scaleY = 0.55;
        icon2.anchorOffsetX = icon2.width / 2;
        icon2.anchorOffsetY = icon2.height / 2;
        icon2.x = stageW / 2;
        icon2.y = stageH / 2 - 60;
        */
        this.bmp.anchorOffsetX = this.bmp.width / 2;
        this.bmp.anchorOffsetY = this.bmp.height / 2;
        this.addChild(this.bmp);
    }
    var d = __define,c=Head,p=c.prototype;
    p.play = function () {
        var tw = egret.Tween.get(this.bmp);
        tw.to({ "scaleX": 0.8 }, 200);
        tw.wait(20);
        tw.to({ "scaleX": 1 }, 1);
        var twY = egret.Tween.get(this.bmp);
        twY.to({ "scaleY": 0.8 }, 200);
        twY.wait(20);
        twY.to({ "scaleY": 1 }, 1);
    };
    p.left = function () {
        var tw = egret.Tween.get(this.bmp);
        tw.to({ "rotation": 90 }, 200);
        tw.wait(20);
        tw.to({ "rotation": 0 }, 1);
    };
    p.right = function () {
        var tw = egret.Tween.get(this.bmp);
        tw.to({ "rotation": -90 }, 200);
        tw.wait(20);
        tw.to({ "rotation": 0 }, 1);
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Head;
})(egret.Sprite);
egret.registerClass(Head,'Head');
//# sourceMappingURL=Head.js.map