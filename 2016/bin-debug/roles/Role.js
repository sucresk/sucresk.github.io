var Role = (function (_super) {
    __extends(Role, _super);
    function Role(name) {
        if (name === void 0) { name = "man0"; }
        _super.call(this);
        this.name = name;
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
        armatureDisplay.scaleX = 0.4;
        armatureDisplay.scaleY = 0.4;
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