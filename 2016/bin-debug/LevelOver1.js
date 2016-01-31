var LevelOver1 = (function (_super) {
    __extends(LevelOver1, _super);
    function LevelOver1() {
        _super.call(this, "meng");
    }
    var d = __define,c=LevelOver1,p=c.prototype;
    p.over = function () {
        this.next("levelOver2");
    };
    return LevelOver1;
})(LevelOver);
egret.registerClass(LevelOver1,'LevelOver1');
//# sourceMappingURL=LevelOver1.js.map