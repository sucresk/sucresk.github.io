class PageInfo extends State
{
    
    private _bg:egret.Bitmap;

    public constructor()
    {
        super();
    }
    
    public init()
    {
        super.init();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this._bg = this.createBitmapByName("bg_jpg");
        this.addChild(this._bg);
        this.x = this.stage.stageWidth / 2;
        this.y = this.stage.stageHeight / 2;
    }
    
    public tick(advancedTime:number):void
    {
    }

    private dispose():void
    {
        this.removeChildren();
         this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    private onTouchBegin(e:egret.TouchEvent):void
    {
       this.over();
    }
    
    private over():void
    {
        this.dispose();
        this.next("pageGame");
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