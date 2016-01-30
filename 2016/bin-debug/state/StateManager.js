var StateManager = (function () {
    function StateManager(parent) {
        this._parent = parent;
        this._stateObj = {};
    }
    var d = __define,c=StateManager,p=c.prototype;
    p.startTick = function () {
        this._curTime = egret.getTimer();
        egret.startTick(this.tick, this);
    };
    p.stopTick = function () {
        egret.stopTick(this.tick, this);
    };
    p.tick = function (advancedTime) {
        this._lastTime = this._curTime;
        this._curTime = advancedTime;
        if (this._curState) {
            this._curState.tick(this._curTime - this._lastTime);
        }
        return true;
    };
    p.registerState = function (name, state) {
        this._stateObj[name] = state;
    };
    p.setCurStateName = function (name) {
        var state = this._stateObj[name];
        if (state) {
            this.setCurState(state);
        }
    };
    p.setCurState = function (state) {
        if (this._curState) {
            this._curState.removeEventListener(StateEvent.NEXT, this.onNext, this);
            this._prevState = this._curState;
        }
        this._curState = state;
        this._curState.show(this._parent);
        this._curState.addEventListener(StateEvent.NEXT, this.onNext, this);
    };
    p.onNext = function (e) {
        var state = this._stateObj[e.data];
        if (state) {
            this.setCurState(state);
        }
    };
    return StateManager;
})();
egret.registerClass(StateManager,'StateManager');
//# sourceMappingURL=StateManager.js.map