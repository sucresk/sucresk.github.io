var Altar = (function (_super) {
    __extends(Altar, _super);
    function Altar() {
        _super.call(this);
        var name = "altar";
        var skeletonData = RES.getRes(name + "_json");
        var textureData = RES.getRes(name + "_texture_json");
        var texture = RES.getRes(name + "_texture_png");
        console.log(skeletonData);
        console.log(textureData);
        console.log(texture);
        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        this.armature = factory.buildArmature(name);
        var armatureDisplay = this.armature.display;
        //armatureDisplay.scaleX = this._scale;
        //armatureDisplay.scaleY = this._scale;
        dragonBones.WorldClock.clock.add(this.armature);
        this.addChild(armatureDisplay);
    }
    var d = __define,c=Altar,p=c.prototype;
    p.play = function (name) {
        this.armature.animation.gotoAndPlay(name, 0, -1, 1);
    };
    p.normal = function () {
        this.play("normal");
    };
    p.correct = function () {
        this.play("correct");
    };
    p.wrong = function () {
        this.play("wrong");
    };
    p.remove = function () {
        dragonBones.WorldClock.clock.remove(this.armature);
    };
    return Altar;
})(egret.Sprite);
egret.registerClass(Altar,'Altar');
//# sourceMappingURL=Altar.js.map