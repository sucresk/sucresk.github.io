class LevelThanks extends State
{
    public bg:egret.Bitmap;
    
    public constructor()
    {
        super();
        this.bg = this.createBitmapByName("thanks_png");
        this.bg.x = 300;
        this.bg.y = 480;
        
         
    }
    public init():void
    {
        this.addChild(this.bg);   
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    
    private onTouchBegin(e:egret.TouchEvent):void
    {
        this.dispose();
        this.next("levelEnd");
    }
    
    private dispose():void
    {
        this.removeChildren();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
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