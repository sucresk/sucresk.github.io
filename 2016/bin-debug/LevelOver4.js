var LevelOver4 = (function (_super) {
    __extends(LevelOver4, _super);
    function LevelOver4() {
        _super.call(this, "lei");
    }
    var d = __define,c=LevelOver4,p=c.prototype;
    p.over = function () {
        this.stopSound();
        this.next("levelThanks");
    };
    p.stopSound = function () {
        if (LevelOver.bgChannel) {
            LevelOver.bgChannel.stop();
        }
    };
    return LevelOver4;
})(LevelOver);
egret.registerClass(LevelOver4,'LevelOver4');
//# sourceMappingURL=LevelOver4.js.map