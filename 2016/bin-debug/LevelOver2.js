var LevelOver2 = (function (_super) {
    __extends(LevelOver2, _super);
    function LevelOver2() {
        _super.call(this, "wei");
    }
    var d = __define,c=LevelOver2,p=c.prototype;
    p.over = function () {
        this.next("levelOver3");
    };
    return LevelOver2;
})(LevelOver);
egret.registerClass(LevelOver2,'LevelOver2');
//# sourceMappingURL=LevelOver2.js.map