class Man extends egret.Sprite
{
    
    public armature:dragonBones.Armature;
    public constructor()
    {
        super();
        var skeletonData = RES.getRes("man0_json");
        var textureData = RES.getRes("man0_texture_json");
        var texture = RES.getRes("man0_texture_png");
        
        console.log(skeletonData);
        console.log(textureData);
        console.log(texture);
        
        var factory:dragonBones.EgretFactory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        
        this.armature = factory.buildArmature("man0");
        var armatureDisplay = this.armature.display;
        dragonBones.WorldClock.clock.add(this.armature);
        this.addChild(armatureDisplay);
    }
    
    public play(name:string):void
    {
        this.armature.animation.gotoAndPlay(name,0,-1,0);
    }
    
    
}