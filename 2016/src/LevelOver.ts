class LevelOver extends State
{
    public static bgSound:egret.Sound;
    public static bgChannel:egret.SoundChannel;
    
    public role:Role;
    public txtInfo:egret.TextField;
    //"lei","wei","kui","meng","zhi"];
    public infoArr:string[] = ["程序员：苏魁",
                               "美术：李孟",
                               "策划：李经纬",
                               "美术：李治",
                               "策划：张晨"];
    
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
        this.role = new Role(this.name, 0.8);
        
        //this.role.scaleX = 3;
        //this.role.scaleY = 3;
        
        this.role.x = 300;
        this.role.y = 500;
        
        this.addChild(this.role);
        this.txtInfo = new egret.TextField();
        this.txtInfo.x = 10;
        this.txtInfo.y = 520;
        this.addChild(this.txtInfo);
        
        switch(this.name)
        {
            case "kui":
                this.txtInfo.text = this.infoArr[0];
                this.playSound();
                break;
            case "meng":
                this.txtInfo.text = this.infoArr[1];
                break;
            case "wei":
                this.txtInfo.text = this.infoArr[2];
                break;
            case "zhi":
                this.txtInfo.text = this.infoArr[3];
                break;
            case "lei":
                this.txtInfo.text = this.infoArr[4];
                break;
        }
        //this.role.play("hit")
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
    }
    
    private playSound():void
    {
        LevelOver.bgSound = RES.getRes("level_mp3");
        LevelOver.bgChannel = LevelOver.bgSound.play(0,1);
    }
    
    private dispose():void
    {
        this.role.remove();
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.removeChildren();
    }
    private onTouchBegin(e:egret.TouchEvent):void
    {
        this.dispose();
        this.over();
    }
    
    public over():void
    {
        //this.next("levelInfo");
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