class LevelOver extends State
{

    public role:Role;
    private _name:string;
    private _curTime:number = 0;
    private _curIndex:number = 0;
    
    public constructor(name:string)
    {
        //console.log(this.name);
        
        super();
        this.name = name;
    }
    
    public init()
    {
        super.init();
        console.log("aaaaaaa",this.name);
        this.role = new Role(this.name, 1);
        
        //this.role.scaleX = 3;
        //this.role.scaleY = 3;
        
        this.role.x = 300;
        this.role.y = 500;
        
        this.addChild(this.role);
        //this.role.play("hit")
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    
    private dispose():void
    {
        this.role.remove();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    private onTouchBegin(e:egret.TouchEvent):void
    {
        
    }
    
    private over():void
    {
        this.next("levelInfo");
    }
    
    public tick(advancedTime:number):void
    {
        this._curTime += advancedTime;
        if(this._curTime > 500)
        {
            this._curTime = 0;
            this._curIndex += 1
            if(this._curIndex >= 3)
            {
                this._curIndex = 0;
            }
            this.play();
            
        }
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    }
    
    public play():void
    {
        if(this._curIndex == 0)
        {
            this.role.play("hit");
        }
        else if(this._curIndex == 1)
        {
            this.role.play("left");
        }
        else 
        {
            this.role.play("right");
        }
    }
    
}