var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }
    var d = __define,c=Game,p=c.prototype;
    p.onAdded = function (e) {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.init();
    };
    p.init = function () {
        console.log("this is a new game!");
        var stateManager = new StateManager(this);
        stateManager.registerState("pageInfo", new PageInfo());
        stateManager.registerState("pageGame", new PageGame());
        stateManager.registerState("pageOver", new PageOver());
        stateManager.setCurStateName("pageGame");
        stateManager.startTick();
    };
    return Game;
}(egret.DisplayObjectContainer));
egret.registerClass(Game,'Game');
//# sourceMappingURL=Game.js.map