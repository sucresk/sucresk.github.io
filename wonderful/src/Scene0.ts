class Scene0 extends State
{
    
    private _role:Role;
    private _pos:number = 0;
    private _speed:number = -0.003;
    private _comeSpeed:number = 0.05;
    public constructor()
    {
        super();
    }
    
    public init()
    {
        super.init();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);

        this._role = new Role("wonderful",1);
        this.addChild(this._role);
        this._role.play("wan");
        this._role.x = 100;
        this._role.y = 300;
    }
    
    public tick(advancedTime:number):void
    {
        if(this._pos > 1)
        {
            this._pos += this._speed;
        }
        this._role.gotoAndStop("wan",this._pos);
        
        dragonBones.WorldClock.clock.advanceTime(advancedTime/1000);
    }

    private dispose():void
    {
        this.removeChildren();
         this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    private onTouchBegin(e:egret.TouchEvent):void
    {
        this._pos += this._comeSpeed;
        console.log(this._pos);
    }
    
    private over():void
    {
        this.dispose();
        this.next("levelTitle");
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