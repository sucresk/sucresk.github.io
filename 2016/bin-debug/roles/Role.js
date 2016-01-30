var Role = (function (_super) {
    __extends(Role, _super);
    function Role(name, scale) {
        if (name === void 0) { name = "man0"; }
        if (scale === void 0) { scale = 0.35; }
        _super.call(this);
        this.name = name;
        this._scale = scale;
        console.log("name armature", name);
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
        armatureDisplay.scaleX = this._scale;
        armatureDisplay.scaleY = this._scale;
        dragonBones.WorldClock.clock.add(this.armature);
        this.addChild(armatureDisplay);
    }
    var d = __define,c=Role,p=c.prototype;
    p.play = function (name) {
        if (name == "right") {
            this.armature.animation.gotoAndPlay("left", 0, -1, 1);
            this.scaleX = -1;
        }
        else if (name == "left") {
            this.armature.animation.gotoAndPlay("left", 0, -1, 1);
            this.scaleX = 1;
        }
        else {
            this.armature.animation.gotoAndPlay(name, 0, -1, 1);
        }
    };
    p.remove = function () {
        dragonBones.WorldClock.clock.remove(this.armature);
    };
    return Role;
})(egret.Sprite);
egret.registerClass(Role,'Role');
//# sourceMappingURL=Role.js.map