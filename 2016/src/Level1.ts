class Level1 extends State
{
    public testSprite:egret.Sprite;
    
    public static TYPE_TAP:number = 0;
    public static TYPE_DRAW:number = -1;
    public static TYPE_CLEAR:number = -2;
    public static TYPE_GESTURE:number = 3;
    public static TYPE_RIGHT:number = 1;
    public static TYPE_LEFT:number = 2;
    
    public goodTime:number = 200;
    public perfectTime:number = 50;
    public hitStepTime:number = 500;
    
    public maxToken:number = 4;
    private _curHitIndex:number = -1;
    
    private _rhythmObjs:any[];
    private _rhythmArr:number[] = [];
    private _rhythmTypeArr:number[] = [];
    
    private _curTime:number;
    private _curIndex:number;
    private _curHitTime:number;
    private _endIndex:number;
    
    private _goodDuring:boolean;
    private _perfectDuring:boolean;
    
    private _startGame:boolean;
    private _touchType:number = -1;
    private _curTouchType:number;
    private _touching:boolean;
    private _touched:boolean;
    private _touchedOver:boolean;
    private _startTouchX:number;
    
    private _debugText:egret.TextField;
    private _labelScore:egret.TextField;
    private _txtScore:egret.TextField;
    private _labelComboo:egret.TextField;
    private _txtComboo:egret.TextField;
    
    private _drawed:boolean;
    private _score:number;
    private _comboo:number;
    
    private _pillarArr:egret.Point[] = [];
    public heads:Head[] = [];
    public helpSprite:egret.Sprite;
    public gesture:GestureController;
    
    public tokens:egret.Bitmap[] = [];
    public roleNames:string[] = ["man0","wei"];
    public roles:Role[] = [];
    
    public decorationNames:string[] = ["barrel_png","flower_png","chair_png","toilet_png"];
    public decorationPos:number[] = [150,200,480,200,150,700,480,700];
    public decorations:Decoration[] = [];
    public playDecorationNum:number = 4;
    
    public constructor()
    {
        super();
    }
    
    public init():void
    {
        
        var image:egret.Bitmap = this.createBitmapByName("bg2_jpg");
       console.log("image_test",image)
       image.x = 0;
       image.y = 0;
       this.addChild(image);
       
        //this.initRhythm();
        this.testSprite = new egret.Sprite();
        this.addChild(this.testSprite);
        this.testSprite.x = 200;
        this.testSprite.y = 50;
        this._debugText = new egret.TextField();
        this._debugText.x = 400;
        this.addChild(this._debugText);
        
        this.initConfig();
        this.initUI();
        
        
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd,this);
        
        var sound:egret.Sound = RES.getRes("sound_test");
        sound.play(0,1);
        
        this.gesture = new GestureController(this.stage);
        this.gesture.addEventListener(GestureEvent.GESTURE, this.onGesture, this);
        //this.gesture.start();
        
        this.initPillar();
        this.initDecoration();
        /*
        var man:Man = new Man();
        man.x = 100;
        man.y = 300;
        this.addChild(man);
        man.play("hit");
        */
        var head0:Head = this.createHead("head0_png")
        this.addHeadTo(head0,0);
        /*
        var head1:Head = this.createHead("head0_png")
        this.addHeadTo(head1,1);
        var head2:Head = this.createHead("head0_png")
        this.addHeadTo(head2,2);
        var head3:Head = this.createHead("head0_png")
        this.addHeadTo(head3,3);
        var head4:Head = this.createHead("head0_png")
        this.addHeadTo(head4,4);
        */
        //head.play();
        this.helpSprite = new egret.Sprite();
        this.addChild(this.helpSprite);
        this.startTime();
    }
    
    private initUI():void
    {
        this._score = 0;
        this._comboo = 0;
        this._labelScore = new egret.TextField;
        this._txtScore = new egret.TextField;
        this._labelComboo = new egret.TextField;
        this._txtComboo = new egret.TextField;
        
        this._labelScore.text = "分数";
        this._labelScore.x = 10;
        
        this._txtScore.text = "0";
        this._txtScore.x = 100;
        this._labelComboo.text = "连击";
        this._labelComboo.x = 170;
        this._txtComboo.text = "0";
        this._txtComboo.x = 270;
        
        this.addChild(this._labelScore);
        this.addChild(this._txtScore);
        this.addChild(this._labelComboo);
        this.addChild(this._txtComboo);
    }
    private updateUI():void
    {
        this._txtScore.text = this._score.toString();
        this._txtComboo.text= this._comboo.toString();
    }
    private initConfig():void
    {
        var levelConfig:any = RES.getRes("level_1_json");
        console.log(levelConfig)
        this._rhythmObjs = levelConfig;
        for(var i:number = 0, len:number = levelConfig.length; i < len; i++)
        {
            this._rhythmArr.push(levelConfig[i].beat * 500);
            this._rhythmTypeArr.push(levelConfig[i].action);
        }
        console.log(this._rhythmArr.length , "aaaaaaaaaaaaa");
        this._endIndex = this._rhythmArr.length;
    }
    
    private initRhythm():void
    {
        for(var i:number = 0; i < 10; i++)
        {
            this._rhythmArr.push(i * 2000);
            this._rhythmTypeArr.push(0);
        }
        this._endIndex = this._rhythmArr.length;
    }
    
    private initPillar():void
    {
        var p0:egret.Point = new egret.Point(299,310);
        var p1:egret.Point = new egret.Point(453,424);
        var p2:egret.Point = new egret.Point(389,567);
        var p3:egret.Point = new egret.Point(202,569);
        var p4:egret.Point = new egret.Point(153,398);
        this._pillarArr.push(p0);
        this._pillarArr.push(p1);
        this._pillarArr.push(p2);
        this._pillarArr.push(p3);
        this._pillarArr.push(p4);
    }
    private initDecoration():void
    {
        for(var i:number = 0, len:number = this.decorationNames.length; i < len; i++)
        {
            var d:Decoration = new Decoration(this.decorationNames[i]);
            d.x = this.decorationPos[i * 2];
            d.y = this.decorationPos[i * 2 + 1];
            this.decorations.push(d);
            this.addChild(d);
        }
    }
    private goodTip():void
    {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xffff00);
        this.testSprite.graphics.drawCircle(0,0,30);
        this.testSprite.graphics.endFill();
    }
    private perfectTip():void
    {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0xff0000);
        this.testSprite.graphics.drawCircle(0,0,30);
        this.testSprite.graphics.endFill();
    }
    private normalTip():void
    {
        this.testSprite.graphics.clear();
        this.testSprite.graphics.beginFill(0x0000ff);
        this.testSprite.graphics.drawCircle(0,0,30);
        this.testSprite.graphics.endFill();
    }
    
    private onTouchBegin(e:egret.TouchEvent):void
    {
        this._touching = true;
        this._startTouchX = e.localX;
    }
    private onTouchEnd(e:egret.TouchEvent):void
    {
        this._touching = false;
        this._touchedOver = true;
        var d:number = e.localX - this._startTouchX;
        if(this._curTouchType == Level1.TYPE_TAP)
        {
            if(d > 0)// right
            {
                this._touchType = 1;
            }
            else //lefts
            {
                this._touchType = 2;
            }
            console.log("touch", this._touchType)
        }
        
    }
    private onGesture(e:GestureEvent):void
    {
        console.log("ongesture",e.data);
        if(this._curTouchType == Level1.TYPE_GESTURE)
        {
            var obj:any = this._rhythmObjs[this._curIndex];
            console.log("ddddddddd", obj.gesture, e.data)
            if(obj.gesture == e.data)
            {
                this._touchType = Level1.TYPE_GESTURE;
            }
            else
            {
                this.missGesture();
            }
        }
        
    }
    public startTime():void
    {
        this._curTime = 0;
        this._curIndex = 0;
        this._startGame = true;
        this._curHitTime = this._rhythmArr[this._curIndex];
        this._curTouchType = this._rhythmTypeArr[this._curTouchType]
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
        this._comboo++;
        this._score += this._comboo * 10 + 10;
    }
    private goodGesture():void
    {
        this._touched = true;
        this._touchedOver = false;
        console.log("good gesture");
        this._comboo++;
        this._score += this._comboo * 10 + 10;
        this.addOneToken();
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
        this._comboo = 0;
    }
    
    private missGesture():void
    {
        this.missTouch();
        console.log("miss gesture");
        this.addOneToken();
    }
    
    private nextRhythm():void
    {
       this._curIndex++;
       
       if(!this._touched)
       {
           if(this._curTouchType == Level1.TYPE_TAP)
           {
               this.missTouch();
           }
           else if(this._curTouchType == Level1.TYPE_GESTURE)
           {
               this.missGesture();
           }
           
       }
       this._drawed = false;
       this._curHitTime = this._rhythmArr[this._curIndex];
       this._curTouchType = this._rhythmTypeArr[this._curIndex];
       
       this._touched = false;
       this._touchType = -1;
       if(this._curTouchType == Level1.TYPE_GESTURE)
       {
           var obj:any = this._rhythmObjs[this._curIndex];
           this.goodTime = obj.duration * this.hitStepTime;
           console.log("gesture begin");
           this.gesture.start();
       }
       else
       {
           this.goodTime = 200;
           console.log("gesture over");
           this.gesture.stop();
           if(this._curTouchType == Level1.TYPE_LEFT)
           {
               this.AllLeft();
           }
           else if(this._curTouchType == Level1.TYPE_RIGHT)
           {
               this.AllRight();
           }
       }
       //this.addOneToken();
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
        if(this._curTouchType == Level1.TYPE_TAP)
        {
            if(this._curTime > this._curHitTime - this.perfectTime &&
            this._curTime < this._curHitTime + this.perfectTime)
            {
                this._perfectDuring = true;
                //this.perfectTip();
                this.goodTip();
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
            
            if(this._goodDuring && !this._touched && this.checkTouchType(this._touchType))
            {
                this.goodTouch();
            }
        }
        else if(this._curTouchType == Level1.TYPE_DRAW)
        {
            if(this._curTime > this._curHitTime)
            {
                this.drawHelp(this._curIndex);
            }
        }
        else if(this._curTouchType == Level1.TYPE_CLEAR)
        {
            if(this._curTime > this._curHitTime)
            {
                this.clearHelp();
            }
        }
        else if(this._curTouchType == Level1.TYPE_GESTURE)
        {
            var obj:any = this._rhythmObjs[this._curIndex];
            
            if(this._curTime > this._curHitTime 
            && this._curTime < this._curHitTime + obj.duration * this.hitStepTime)
            {
                this._goodDuring = true;
            }
            else
            {
                this._goodDuring = false;
            }
            if(this._goodDuring && !this._touched && this.checkTouchType(this._touchType))
            {
                this.goodGesture();
            }
        }
        
        
        /*
        if(this._perfectDuring && this.checkTouchType(this._touchType))
        {
            this.perfectTouch();
        }
        */
        
        //else if(!this._goodDuring)
        /*
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
        */
        this.updateUI();
        this.hitStep(this._curTime);
        dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
    }
    
    private checkTouchType(type:number):boolean
    {
        //console.log(this._curTouchType, type, "checktouchtype")
        if(this._curTouchType == 0)
        {
            if(type >= 0)
            {
                return true;
            }
        }
        else if(this._curTouchType == type)
        {
            return true;
        }
        return false;
    }
    
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    
    public addHeadTo(head:Head, index:number):void
    {
        var x:number = this._pillarArr[index].x;
        var y:number = this._pillarArr[index].y;
        head.x = x;
        head.y = y;
        this.heads.push(head);
        this.addChild(head);
    }
    public createHead(name:string):Head
    {
        return new Head(name);
    }
    public hitStep(curTime:number):void
    {
        var i:number = Math.floor(curTime/this.hitStepTime);
        if( i != this._curHitIndex)
        {
            this._curHitIndex = i;
            this.AllHit();
            return;
            if(this._curTouchType == Level1.TYPE_LEFT)
            {
                console.log("left");
                this.AllLeft();
            }
            else if(this._curTouchType == Level1.TYPE_RIGHT)
            {
                console.log("right");
                this.AllRight();
            }
            else
            {
                console.log("hit");
                this.AllHit();
            }
        }
    }
    
    public AllHit():void
    {
        for(var i:number = 0,len:number = this.heads.length; i < len; i++)
        {
            this.heads[i].play();
        }
        for(i = 0,len = this.roles.length; i < len; i++)
        {
            this.roles[i].play("hit");
        }
        var n:number = this.playDecorationNum < this.decorations.length ? 
                       this.playDecorationNum : this.decorations.length;
        for(i = 0, len = n; i < len; i++)
        {
            this.decorations[i].play();
        }
    }
    
    public AllLeft():void
    {
        for(var i:number = 0,len:number = this.heads.length; i < len; i++)
        {
            this.heads[i].left();
        }
        for(i = 0,len = this.roles.length; i < len; i++)
        {
            this.roles[i].play("left");
        }
        
        var n:number = this.playDecorationNum < this.decorations.length ? 
                       this.playDecorationNum : this.decorations.length;
        for(i = 0, len = n; i < len; i++)
        {
            this.decorations[i].play();
        }
    }
    
    public AllRight():void
    {
        for(var i:number = 0,len:number = this.heads.length; i < len; i++)
        {
            this.heads[i].right();
        }
        for(i = 0,len = this.roles.length; i < len; i++)
        {
            this.roles[i].play("left");
        }
        
        var n:number = this.playDecorationNum < this.decorations.length ? 
                       this.playDecorationNum : this.decorations.length;
        for(i = 0, len = n; i < len; i++)
        {
            this.decorations[i].play();
        }
    }
    
    public drawHelp(index:number):void
    {
        if(!this._drawed)
        {
            this._drawed = true;
            var obj:any = this._rhythmObjs[index];
            this.helpSprite.graphics.lineStyle(20,0xff0000,1);
            
            this.helpSprite.graphics.moveTo(<number>obj.line[0],<number>obj.line[1]);
            this.helpSprite.graphics.lineTo(<number>obj.line[2],<number>obj.line[3]);
        }
        
    }
    public clearHelp():void
    {
        this.helpSprite.graphics.clear();
    }
    
    private addOneToken():void
    {
        if(this.tokens.length >= this.maxToken)
        {
            this.clearToken();
        }
        var i:number = Math.floor(Math.random() * 4);
        var t:egret.Bitmap = this.createToken(i);
        this.addToken(t);
        if(this.tokens.length >= this.maxToken)
        {
            this.addOneRole();
        }
    }
    private createToken(index:number):egret.Bitmap
    {
        var bmp:egret.Bitmap = this.createBitmapByName("token_" + index + "_png");
        return bmp;
    }
    
    private addToken(bmp:egret.Bitmap):void
    {
        this.tokens.push(bmp);
        bmp.x = this.tokens.length * 100;
        this.addChild(bmp);
    }
    
    private clearToken():void
    {
        for(var i:number = 0 ,len:number = this.tokens.length; i < len; i++)
        {
            if(this.tokens[i].parent)
            {
                this.removeChild(this.tokens[i]);
            }
        }
        this.tokens.length = 0;
    }
    
    private addOneRole():void
    {
        var i:number = Math.floor(Math.random() * this.roleNames.length);
        console.log("ccccccccccccc", i , this.roleNames.length)
        var r:Role = this.createRole(i);
        this.addRole(r);
    }
    private createRole(index:number):Role
    {
        var name:string = this.roleNames[index];
        var role:Role = new Role(name);
        return role;
    }
    
    private addRole(r:Role):void
    {
        this.roles.push(r);
        r.play("hit");
        r.x = this.roles.length * 100;
        r.y = 955;
        this.addChild(r);
    }
    
    private clearRole():void
    {
        for(var i:number = 0 ,len:number = this.roles.length; i < len; i++)
        {
            this.roles[i].remove();
            if(this.roles[i].parent)
            {
                this.removeChild(this.roles[i]);
            }
        }
        this.roles.length = 0;
    }
}