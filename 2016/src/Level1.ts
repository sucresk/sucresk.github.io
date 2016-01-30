class Level1 extends State
{
    public testSprite:egret.Sprite;
    
    public goodTime:number = 900;
    public perfectTime:number = 50;
    
    private _rhythmArr:number[] = [];
    private _curTime:number;
    private _curIndex:number;
    private _curHitTime:number;
    private _endIndex:number;
    
    private _goodDuring:boolean;
    private _perfectDuring:boolean;
    
    private _startGame:boolean;
    private _touching:boolean;
    private _touched:boolean;
    private _touchedOver:boolean;
    
    private _debugText:egret.TextField;
    
    public constructor()
    {
        super();
    }
    
    public init():void
    {
        this.initRhythm();
        this.testSprite = new egret.Sprite();
        this.addChild(this.testSprite);
        this.testSprite.x = 200;
        this.testSprite.y = 50;
        this._debugText = new egret.TextField();
        this._debugText.x = 300;
        this.addChild(this._debugText);
        
        this.startTime();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd,this);
        
        var sound:egret.Sound = RES.getRes("sound_test");
        sound.play();
        
        var image:egret.Bitmap = this.createBitmapByName("end_jpg");
       console.log("image_test",image)
       image.x = 0;
       image.y = 0;
       this.addChild(image);
    }
    private goodTip():void
    {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xffff00);
        this.testSprite.graphics.drawCircle(0,0,100);
        this.testSprite.graphics.endFill();
    }
    private perfectTip():void
    {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xff0000);
        this.testSprite.graphics.drawCircle(0,0,100);
        this.testSprite.graphics.endFill();
    }
    private normalTip():void
    {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0x0000ff);
        this.testSprite.graphics.drawCircle(0,0,100);
        this.testSprite.graphics.endFill();
    }
    private initRhythm():void
    {
        for(var i:number = 0; i < 10; i++)
        {
            this._rhythmArr.push(i * 2000);
        }
        this._endIndex = this._rhythmArr.length;
    }
    private onTouchBegin(e:egret.TouchEvent):void
    {
        this._touching = true;   
    }
    private onTouchEnd(e:egret.TouchEvent):void
    {
        this._touching = false;
        this._touchedOver = true;
    }
    public startTime():void
    {
        this._curTime = 0;
        this._curIndex = 0;
        this._startGame = true;
        this._curHitTime = this._rhythmArr[this._curIndex];
    }
    public levelEnd():void
    {
        this._startGame = false;
        console.log("end game");
    }
    
    private goodTouch():void
    {
        this._touched = true;
        this._touchedOver = false;
        console.log("good touch");
    }
    
    private perfectTouch():void
    {
        this._touched = true;
        this._touchedOver = false;
        console.log("perfect touch");
    }
    
    private missTouch():void
    {
        this._touched = true;
        this._touchedOver = false;
        console.log("missing");
    }
    
    private nextRhythm():void
    {
       this._curIndex++;
       this._curHitTime = this._rhythmArr[this._curIndex];
       if(!this._touched)
       {
           this.missTouch();
       }
       this._touched = false;
       
    }
    public tick(advancedTime:number):void
    {
        if(!this._startGame)
        {
            return;
        }
        this._curTime += advancedTime;
        this._debugText.text = this._curTime.toString();
        while(this._curTime > this._curHitTime + this.goodTime && this._curIndex < this._endIndex)
        {
            this.nextRhythm();
        }
        if(this._curIndex >= this._endIndex)
        {
            this.levelEnd();
        }
        
        if(this._curTime > this._curHitTime - this.perfectTime &&
           this._curTime < this._curHitTime + this.perfectTime)
           {
               this._perfectDuring = true;
               this.perfectTip();
           }
        else
        {
            this._perfectDuring = false;
            if(this._curTime > this._curHitTime - this.goodTime &&
                this._curTime < this._curHitTime + this.goodTime)
            {
                this._goodDuring = true;
                this.goodTip();
            }
            else
            {
                this._goodDuring = false;
                this.normalTip();
            }
        }
        
        if(this._perfectDuring && this._touching && !this._touched && this._touchedOver)
        {
            this.perfectTouch();
        }
        else if(this._goodDuring && this._touching && !this._touched && this._touchedOver)
        {
            this.goodTouch();
        }
        else if(!this._goodDuring && this._touching && this._touchedOver)
        {
            this.missTouch();
        }
        
    }
    
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}