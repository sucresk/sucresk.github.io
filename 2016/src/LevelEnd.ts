class LevelEnd extends State
{
    public bg:egret.Bitmap;
    
    public constructor()
    {
        super();
        this.bg = this.createBitmapByName("ending_png");
        this.bg.x = 300;
        this.bg.y = 480;
        this.addChild(this.bg);
    }
    
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        
        result.anchorOffsetX = result.width / 2;
        result.anchorOffsetY = result.height / 2;
        
        return result;
    }
}