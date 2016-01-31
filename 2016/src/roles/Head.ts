class Head extends egret.Sprite
{
    public bmp:egret.Bitmap;
    public constructor(name:string)
    {
        super();
        
        this.bmp = this.createBitmapByName(name);
        /*
        con2.scaleX = 0.55;
        icon2.scaleY = 0.55;
        icon2.anchorOffsetX = icon2.width / 2;
        icon2.anchorOffsetY = icon2.height / 2;
        icon2.x = stageW / 2;
        icon2.y = stageH / 2 - 60;
        */
        this.bmp.anchorOffsetX = this.bmp.width / 2;
        this.bmp.anchorOffsetY = this.bmp.height / 2;
        this.bmp.scaleX = 0.5;
        this.bmp.scaleY = 0.5;
        this.addChild(this.bmp);
    }
    
    public play():void
    {
        var tw = egret.Tween.get(this.bmp);
        tw.to({"scaleX": 0.4}, 200);
        tw.wait(20);
        tw.to({"scaleX": 0.5}, 1);
        
        var twY = egret.Tween.get(this.bmp);
        twY.to({"scaleY": 0.4}, 200);
        twY.wait(20);
        twY.to({"scaleY": 0.5}, 1);
    }
    
    public left():void
    {
        var tw = egret.Tween.get(this.bmp);
        tw.to({"rotation": 90}, 200);
        tw.wait(20);
        tw.to({"rotation": 0}, 1);
    }
    
    public right():void
    {
        var tw = egret.Tween.get(this.bmp);
        tw.to({"rotation": -90}, 200);
        tw.wait(20);
        tw.to({"rotation": 0}, 1);
    }
    
    
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}