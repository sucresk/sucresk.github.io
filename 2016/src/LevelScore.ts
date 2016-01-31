class LevelScore extends State
{
    public bg:egret.Bitmap;
    public score0:egret.Bitmap;
    public score1:egret.Bitmap;
    public score2:egret.Bitmap;
    public score3:egret.Bitmap;
    public score4:egret.Bitmap;
    
    public txtScore:egret.TextField;
    public txtComboo:egret.TextField;
    
    public centerX:number = 300;
    public centerY:number = 480;
    
    public curScore:egret.Bitmap;
    
    public constructor()
    {
        super();
        
        this.score0 = this.createBitmapByName("S_png");
        this.score1 = this.createBitmapByName("A_png");
        this.score2 = this.createBitmapByName("B_png");
        this.score3 = this.createBitmapByName("C_png");
        this.score4 = this.createBitmapByName("D_png");
        this.txtScore = new egret.TextField();
        this.txtComboo = new egret.TextField();
        
    }
    
    public init():void
    {
        if(GameData.score > 1500) //s
        {
            this.curScore = this.score0;
        
        }
        else if(GameData.score > 1000)
        {
            this.curScore = this.score1;
        }
        else if(GameData.score > 800)
        {
            this.curScore = this.score2;
        }
        else if(GameData.score > 500)
        {
            this.curScore = this.score3;
        }
        else
        {
            this.curScore = this.score4;
        }
        this.curScore.x = this.centerX;
        this.curScore.y = this.centerY;
        this.addChild(this.curScore);
        
        this.txtScore.text = GameData.score.toString();
        this.txtComboo.text = GameData.maxComboo.toString();
        
        this.txtScore.x = 350;
        this.txtScore.y = 400;
        
        this.txtComboo.x = 350;
        this.txtComboo.y = 450;
        
        this.addChild(this.txtScore);
        this.addChild(this.txtComboo);
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
   
    private onTouchBegin(e:egret.TouchEvent):void
    {
        this.dispose();
        this.next("levelOver0");
    }
    
    private dispose():void
    {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.removeChildren();
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