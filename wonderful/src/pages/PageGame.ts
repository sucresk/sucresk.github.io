class PageGame extends State
{
    public static SPEED_0:number = 1;
    public static SPEED_1:number = 2;
    public static SPEED_2:number = 3;
    public static SPEED_3:number = 50;

    public static SPEED_ARR = [PageGame.SPEED_0,
                               PageGame.SPEED_1,
                               PageGame.SPEED_2,
                               PageGame.SPEED_3];

    public static CON_SPEED_0 = [0,0,0]; // 0%  30%  90% 
    public static CON_SPEED_1 = [0,0,0]; // 0%  30%  90% 
    public static CON_SPEED_2 = [0,0,0]; // 0%  30%  90% 
    public static CON_SPEED_3 = [-0.001, -0.002, -0.003];

    public static CON_SPEED_ARR = [PageGame.CON_SPEED_0,
                                   PageGame.CON_SPEED_1,
                                   PageGame.CON_SPEED_2,
                                   PageGame.CON_SPEED_3];

    public static LEVEL_COMPLETE_BOTTOM_NUM:number = 3;

    public static TOTAL_TIME:number = 60000;
    public static STATE_START:number = 0;
    public static STATE_RUN:number = 1;
    public static STATE_END:number = 2;
    public static STATE_OVER:number = 4;
    
    private _bg:egret.Bitmap;
    private _btn0:egret.Bitmap;
    private _btn1:egret.Bitmap;
    private _btn2:egret.Bitmap;
    private _btn3:egret.Bitmap;

    private _txtTime:egret.TextField;

    private _role:Role;
    private _curRoleName:string;
    private _curRoleSex:number;
    private _curBoss:boolean;
    private _roleContainer:egret.Sprite;
    private _uiContainer:egret.Sprite;
    private _roleBgContainer:egret.Sprite;

    private _pos:number = 0;
    private _realPos:number;

    private _comeSpeed:number = 0.05;
    private _totalTime:number = 4.5;

    
    public conSpeeds = [];
    public curConSpeed:number;
    public curSpeed:number = PageGame.SPEED_0;

    public curLevel:number = 0;
    public difficult:number = 1;
    
    public bottomNum:number = 0;
    public curState:number = 0;
    
    private _curTime:number = 0;
    private _curHit:number = 0;

    private _roleManager:RoleManager;

    private _roleQueue = [];
    private _roleBoss = [];

    public constructor()
    {
        super();
        this._roleManager = new RoleManager();
        this._roleContainer = new egret.Sprite();
        this._uiContainer = new egret.Sprite();
        this._roleBgContainer = new egret.Sprite();
    }
    
    public init()
    {
        console.log("init pageGame ")
        super.init();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd,this);

        this._curTime = PageGame.TOTAL_TIME;
        this.initRoleQueue();
        this._roleContainer.removeChildren();
        this._uiContainer.removeChildren();

        this.initBg();
        this.addChild(this._roleBgContainer)
        this.addChild(this._roleContainer);
        this.addChild(this._uiContainer)
        this.initUI();

        this.initRoleBg();
        this.initRole();
        this.initDifficult();
        this.initLevel();
    }
    
    private initRoleQueue():void
    {
        this._roleQueue.length = 0;
        for(var i:number = 0; i < 10; i++)
        {
            if(i == 5)
            {
                this.randomRole(true);
            }
            else
            {
                this.randomRole();
            }
            
        }
    }
    private initRole():void
    {
        if(this._role != null && this._role.parent != null)
        {
            this._roleContainer.addChild(this._role);
        }
        this._curRoleName = this._roleQueue.shift();
        this._curBoss = this._roleBoss.shift();
        this._role = this._roleManager.getRole(this._curRoleName);
        this._role.gotoAndStop("wan", 0);
        dragonBones.WorldClock.clock.advanceTime(0);

        this._curRoleSex = this._roleManager.getRoleSex(this._curRoleName);

        if(this._curBoss)
        {
            this._role.scaleX = this._role.scaleY = 1.2;
        }
        else
        {
            this._role.scaleX = this._role.scaleY = 1;
        }
        this._roleContainer.addChild(this._role);
        this._role.x = this.stage.stageWidth / 2;
        this._role.y = this.stage.stageHeight - 200;
        this._totalTime = this._role.totleTime;
        
        var isBoss:boolean = Math.random() < 0.2;
        this.randomRole(isBoss);
    }
    private initRoleBg():void
    {
        this._roleBgContainer.removeChildren();
        for(var i:number = this._roleQueue.length - 1; i >= 1; i--)
        {
            console.log("aaaaaaaaa",i)
            var rolebg:egret.Bitmap = this.createBitmapByName(this._roleQueue[i] + "_png");
            //var rolebg:egret.Bitmap = this.createBitmapByName("man1" + "_png");
            rolebg.x = this.stage.stageWidth / 2 + (i * 20);
            rolebg.y = this.stage.stageHeight - 200 - (i * 50) - rolebg.height / 2;
            this._roleBgContainer.addChild(rolebg);
        }
    }
    private randomRole(boss:boolean = false):void
    {
        var index:number = Math.floor(Math.random() * RoleManager.ROLES.length)
        var roleName:string = RoleManager.ROLES[index];
        this._roleQueue.push(roleName);
        this._roleBoss.push(boss);
    }
    private initBg():void
    {
        this._bg = this.createBitmapByName("bgGame_jpg");
        this._bg.x = this.stage.stageWidth/ 2;
        this._bg.y = this.stage.stageHeight / 2;
        this.addChild(this._bg);
    }
    private initUI():void
    {
        this._btn0 = this.createBitmapByName("btn_nv_png");
        this._btn0.x = this.stage.stageWidth/ 2 - 100;
        this._btn0.y = this.stage.stageHeight  - 100;
        this._uiContainer.addChild(this._btn0);

        this._btn1 = this.createBitmapByName("btn_nv1_png");
        this._btn1.x = this.stage.stageWidth/ 2 - 100;
        this._btn1.y = this.stage.stageHeight  - 100;
        this._uiContainer.addChild(this._btn1);
        this._btn1.visible = false;

        this._btn2 = this.createBitmapByName("btn_nan_png");
        this._btn2.x = this.stage.stageWidth/ 2 + 100;
        this._btn2.y = this.stage.stageHeight  - 100;
        this._uiContainer.addChild(this._btn2);

        this._btn3 = this.createBitmapByName("btn_nan1_png");
        this._btn3.x = this.stage.stageWidth/ 2 + 100;
        this._btn3.y = this.stage.stageHeight  - 100;
        this._uiContainer.addChild(this._btn3);
        this._btn3.visible = false;

        this._txtTime = new egret.TextField();
        this._txtTime.x = 10;
        this._txtTime.y = 10;
        this._uiContainer.addChild(this._txtTime);
    }
    private refreshBtn():void
    {
        if(this._curBoss)
        {
            this._btn0.visible = false;
            this._btn1.visible = false;
            this._btn2.visible = false;
            this._btn3.visible = false;
            
        }
        else
        {
            this._btn0.visible = true;
            this._btn1.visible = false;
            this._btn2.visible = true;
            this._btn3.visible = false;
        }
    }
    private refreshUI():void
    {
        this._txtTime.text = this._curTime / 1000 + "seconds";
    }
    private initDifficult():void
    {
        this.difficult = Math.floor(Math.random() * 3);
        if(this._curBoss)
        {
            this.difficult = 3;
        }
        this.conSpeeds = PageGame.CON_SPEED_ARR[this.difficult];//PageGame.CON_SPEED_0;
        this.curConSpeed = this.conSpeeds[0];
        this.curSpeed = this._totalTime / PageGame.SPEED_ARR[this.difficult];
    }
    private initLevel():void
    {
        this.curState = PageGame.STATE_START;
        this._pos = 0;
        
    }

    public tick(advancedTime:number):void
    {
        this._curTime-= advancedTime;
        if(this._curTime <= 0)
        {
            this.endGame();
        }
        switch (this.curState) {
            case PageGame.STATE_START:
                this.tickStart(advancedTime);
                break;
            case PageGame.STATE_RUN:
                this.tickRun(advancedTime);
                break;
            case PageGame.STATE_END:
                this.tickEnd(advancedTime);
                break;
            default:
                break;
        }
        this.refreshUI();
    }
    public tickStart(advancedTime:number):void
    {
        this.curState = PageGame.STATE_RUN;
    }
    public tickEnd(advancedTime:number):void
    {
        var self:any = this;
        var tw = egret.Tween.get(this._role);
        //tw.
        if(this._curRoleSex == 1)
        {
            tw.to({"x": this.stage.stageWidth + 200}, 200);
        }
        else
        {
            tw.to({"x": -200}, 200);
        }
        tw.call(this.nextLevel, self);

    }
    private nextLevel():void
    {
        egret.Tween.removeTweens(this._role);
        this.curLevel++;

        this.initRoleBg();
        this.initRole();
        this.initDifficult();
        this.initLevel();
        this.refreshBtn();

    }
    public tickRun(advancedTime:number):void
    {
        if(this._pos > this._totalTime * 0.9)
        {
            this.curConSpeed = this.conSpeeds[2];
        }
        else if(this._pos > this._totalTime * 0.3)
        {
            this.curConSpeed = this.conSpeeds[1];
        }
        else
        {
            this.curConSpeed = this.conSpeeds[0];
        }
        this._pos += this.curConSpeed;

        if(this._pos >= this._totalTime)
        {
            this._realPos = this._totalTime - 0.001;
            this.bottomNum ++;
            if(this.bottomNum >= PageGame.LEVEL_COMPLETE_BOTTOM_NUM)
            {
                this.levelComplete();
            }
        }
        else
        {
            this._realPos = this._pos;
            if(this.bottomNum > 0)
            {
                this.bottomNum--;
            }     
        }

        this._role.gotoAndStop("wan",this._realPos);
        
        dragonBones.WorldClock.clock.advanceTime(advancedTime/1000);
    }

    private endGame():void
    {
        this.curState = PageGame.STATE_OVER;
        this.over();
    }
    private dispose():void
    {
        this.removeChildren();
        if(this.stage)
        {
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        }
         
    }
    private onTouchBegin(e:egret.TouchEvent):void
    {
        var touchX:number = e.stageX;
        var halfStageX:number = this.stage.stageWidth / 2;

        if(this._curBoss)
        {
            this._pos += this.curSpeed;
            this._curHit++;
        }
        else
        {
            if(this._curRoleSex == 1)
            {
                if(touchX < halfStageX)
                {
                    
                }
                else
                {
                    this._pos += this.curSpeed;
                    this._curHit++;
                    this._btn2.visible = false;
                    this._btn3.visible = true;
                }
            }
            else if(this._curRoleSex == 0)
            {
                if(touchX < halfStageX)
                {
                    this._pos += this.curSpeed;
                    this._curHit++;
                    this._btn0.visible = false;
                    this._btn1.visible = true;
                }
                else
                {

                }
            }
        }
        
    }

    private onTouchEnd(e:egret.TouchEvent):void
    {
        if(this._curBoss)
        {

        }
        else
        {
            this._btn1.visible = false;
            this._btn0.visible = true;
            this._btn3.visible = false;
            this._btn2.visible = true;
        }
        
    }
    
    private levelComplete():void
    {
        this.curState = PageGame.STATE_END;
        console.log("level complete");
    }
    private over():void
    {
        this.dispose();
        this.next("pageOver");
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