var Man = (function (_super) {
    __extends(Man, _super);
    function Man() {
        _super.call(this);
        var skeletonData = RES.getRes("man0_json");
        var textureData = RES.getRes("man0_texture_json");
        var texture = RES.getRes("man0_texture_png");
        console.log(skeletonData);
        console.log(textureData);
        console.log(texture);
        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        this.armature = factory.buildArmature("man0");
        var armatureDisplay = this.armature.display;
        dragonBones.WorldClock.clock.add(this.armature);
        this.addChild(armatureDisplay);
    }
    var d = __define,c=Man,p=c.prototype;
    p.play = function (name) {
        this.armature.animation.gotoAndPlay(name, 0, -1, 0);
    };
    return Man;
})(egret.Sprite);
egret.registerClass(Man,'Man');
//# sourceMappingURL=Man.js.map