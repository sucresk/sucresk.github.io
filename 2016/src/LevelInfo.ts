class LevelInfo extends State
{
    
    public imageNames:string[] = ["info0_jpg","info1_jpg","info2_jpg","info3_jpg","info4_jpg","info5_jpg"];
    public images:egret.Bitmap[] = [];
    public bg:egret.Bitmap;
    
    public centerX:number = 300;
    public centerY:number = 480;
    
    private _curIndex:number;
    
    
    public bg1Sound:egret.Sound;
    public bg1Channel:egret.SoundChannel;
    public bg2Sound:egret.Sound;
    public bg2Channel:egret.SoundChannel;
    
    public constructor()
    {
        super();
        
        this.bg1Sound = RES.getRes("title_bg_1_mp3");
        this.bg2Sound = RES.getRes("title_bg_2_mp3");
    }
    
    public init()
    {
        super.init();
        
        this.bg1Channel = this.bg1Sound.play(0,1);
        
        var i:number;
        var len:number;
        for(i = 0,len = this.imageNames.length; i < len; i++)
        {
            var image:egret.Bitmap = this.createBitmapByName(this.imageNames[i]);
            this.images.push(image);
            image.x = this.centerX;
            image.y = this.centerY;
            this.addChild(image);
            image.visible = false
            
        }
        this._curIndex = 0;
        this.images[this._curIndex].visible = true;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    
    private dispose():void
    {
        this.removeChildren();
        this.images.length = 0;
        
         this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    private onTouchBegin(e:egret.TouchEvent):void
    {
        this._curIndex++
        if(this._curIndex == 4)
        {
            if(this.bg1Channel)
            {
                this.bg1Channel.stop();
            }
            
            this.bg2Channel = this.bg2Sound.play(0,1);
        }
        if(this._curIndex >= this.imageNames.length)
        {
            this.over();
            return;
        }
        var i:number;
        var len:number;
        for(i = 0,len = this.images.length; i < len; i++)
        {
            var image:egret.Bitmap = this.images[i];
            image.visible = false;
        }
        
        this.images[this._curIndex].visible = true;
    }
    
    private over():void
    {
        this.dispose();
        this.next("levelTitle");
        //this.next("levelOver4");
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