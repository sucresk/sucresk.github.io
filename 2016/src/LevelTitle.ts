class LevelTitle extends State
{
    
    public imageNames:string[] = ["title_1_png","title_2_png","title_3_png","title_4_png"];
    public images:egret.Bitmap[] = [];
    public bg:egret.Bitmap;
    
    public centerX:number = 300;
    public centerY:number = 480;
    
    private _curIndex:number;
    
    public bgSound:egret.Sound;
    public bgChannel:egret.SoundChannel;
    
    public constructor()
    {
        super();
    }
    
    public init()
    {
        super.init();
        
        this.bgSound = RES.getRes("sound_test");
        //this.bgSound = RES.getRes("level_mp3");
        this.bgChannel = this.bgSound.play(0,1);
        
        
        this.bg = this.createBitmapByName("title_bg_jpg");
        this.bg.x = this.centerX;
        this.bg.y = this.centerY;
        this.addChild(this.bg);
        
        var i:number;
        var len:number;
        for(i = 0,len = this.imageNames.length; i < len; i++)
        {
            var image:egret.Bitmap = this.createBitmapByName(this.imageNames[i]);
            this.images.push(image);
            image.x = this.centerX;
            if(i == 0)
            {
                image.y = this.centerY;
            }
            else if(i == 1)
            {
                image.y = this.centerY;
            }
            else if(i == 2)
            {
                image.y = this.centerY ;
            }
            else
            {
                image.y = this.centerY + 350;
            }
            
            this.addChild(image);
            image.visible = false;
        }
        this._curIndex = 0;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    
    private onTouchBegin(e:egret.TouchEvent):void
    {
        if(this._curIndex < this.images.length)
        {
            this.images[this._curIndex].visible = true;
        }
        
        this._curIndex++;
        console.log(this._curIndex, this.images.length);
        
        if(this._curIndex > this.images.length)
        {
            this.over();
            return;
        }
    }
   
    private dispose():void
    {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        if(this.bgChannel)
        {
            this.bgChannel.stop();
        }
    }
    private over():void
    {
        this.dispose();
        this.next("story");
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