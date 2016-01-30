class GamePad extends egret.EventDispatcher
{
    private _stage:egret.Stage;
    private _type:string;
    private _startX:number;
    private _startY:number;
    private _endX:number;
    private _endY:number;
    private _lastX:number;
    private _lastY:number;
    private _touchId:number;
    
    public up:boolean;
    public down:boolean;
    public left:boolean;
    public right:boolean;
    public leftUp:boolean;
    public leftDown:boolean;
    public rightUp:boolean;
    public rightDown:boolean;
    public angle:number;
    public radian:number;
    
    public touchX:number;
    public touchY:number;
    public padX:number;
    public padY:number;
    public radius:number;
    public force:number;
    
    public bg:egret.DisplayObject;
    public pad:egret.DisplayObject;
    
    public constructor(stage:egret.Stage, type:string)
    {
        super();
        this._stage = stage;
        this._type = type;
    }
    
    public init():void
    {
        this._stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }
    
    private onTouchBegin(e:egret.TouchEvent):void
    {
        if(this._touchId != undefined)
        {
            return;
        }
        this._touchId = e.touchPointID;
        console.log(this._touchId)
        this._startX = e.stageX;
        this._startY = e.stageY;
        this._endX = this._startX;
        this._endY = this._startY;
        
        this.touchX = this._startX;
        this.touchY = this._startY;
        //console.log("touch begin", this._startX, this._startY)
        //var evt0:GamePadEvent = new GamePadEvent("a");
        //var evt1:egret.Event = new egret.Event("a");
        //dispatchEvent(evt1);
        if(this.bg)
        {
            this.bg.visible = true;
            this.bg.x = this._startX;
            this.bg.y = this._startY;
        }
        if(this.pad)
        {
            this.pad.visible = true;
            this.pad.x = this.touchX;
            this.pad.y = this.touchY;
        }
        this._stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    
    private onTouchEnd(e:egret.TouchEvent):void
    {
        //console.log("touch end")
        if(e.touchPointID != this._touchId)
        {
            return;
        }
        this._touchId = undefined;
        if(this.bg)
        {
            this.bg.visible =false;
        }
        if(this.pad)
        {
            this.pad.visible = false;
        }
        this._stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this._stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    }
    private onTouchMove(e:egret.TouchEvent):void
    {
        if(e.touchPointID != this._touchId)
        {
            return;
        }
        this._lastX = this._endX;
        this._lastY = this._endY;
        this._endX = e.stageX;
        this._endY = e.stageY;
        
        var deltaX:number = this._endX - this._startX;
        var deltaY:number = this._endY - this._startY;
        
       
        
        this.force = Math.abs(deltaX) + Math.abs(deltaY);
        
        this.left = deltaX > 0;
        this.right = deltaX < 0;
        this.up = deltaY < 0;
        this.down = deltaY > 0;
        
        var len:number =Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        // if(deltaX <0)
        // {
        //     len = -len;
        // }
        this.radian = Math.atan( deltaX/deltaY );
        if(deltaY < 0)
        {
            this.radian += Math.PI;
        }
        this.angle = this.radian * 57.2957800;
        
        
        var realRadius = len > this.radius ? this.radius : len;
        if(this.radius > 0)
        {
            this.padX = realRadius * Math.sin(this.radian);
            this.padY = realRadius * Math.cos(this.radian);
        }
                
        //console.log(this.angle, this.padX, this.padY);
        
        if(this.bg)
        {
            this.bg.x = this.touchX;
            this.bg.y = this.touchY;
        }
        if(this.pad)
        {
            this.pad.x = this.touchX + this.padX;
            this.pad.y = this.touchY + this.padY;
        }
    }
    
    
}