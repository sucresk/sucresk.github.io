class Game extends egret.DisplayObjectContainer
{
    public constructor()
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    }
    
    private onAdded(e:egret.Event):void
    {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.init();
    }
    private init():void
    {
        console.log("this is a new game!");
        
        var stateManager:StateManager = new StateManager(this);
        
        stateManager.registerState("levelInfo", new LevelInfo());
        stateManager.registerState("level1", new Level1());
        stateManager.registerState("levelOver0", new LevelOver0());
        stateManager.registerState("levelOver1", new LevelOver1());
        stateManager.registerState("levelOver2", new LevelOver2());
        stateManager.registerState("levelOver3", new LevelOver3());
        stateManager.registerState("levelOver4", new LevelOver4());
        stateManager.setCurStateName("levelInfo");
        stateManager.startTick();
        /*
        stateManager.registerState("first",new TestState());
        stateManager.registerState("end",new EndState());
        //p2 demo
        stateManager.registerState("physics",new PhysicState());
        stateManager.registerState("buoyancy",new BuoyancyState());
        stateManager.registerState("heightfield",new HeightfieldScene());
        stateManager.registerState("kinematic",new KinematicState());
        stateManager.registerState("lock",new LockState());
        stateManager.registerState("piston",new PistonState());
        stateManager.registerState("rayReflect",new RayReflectState());
        stateManager.registerState("restitution",new RestitutionState());
        stateManager.registerState("sleep",new SleepState());
        stateManager.registerState("spring",new SpringsState());
        stateManager.registerState("tearable",new TearableState());
        stateManager.registerState("applePhy",new AppleState());
        stateManager.registerState("p2",new P2State());
        
        stateManager.setCurStateName("p2");
        stateManager.startTick();
        console.log("aa")
        var pad:GamePad = new GamePad(this.stage,"");
        pad.radius = 50;
        //pad.init();
        
        var padBg:egret.Shape = new egret.Shape();
        padBg.graphics.beginFill(0xff0000,0.5);
        padBg.graphics.drawCircle(0,0,50);
        var padCircle:egret.Shape = new egret.Shape();
        padCircle.graphics.beginFill(0x00ff00,0.5);
        padCircle.graphics.drawCircle(0,0,20);
        
        //this.addChild(padBg);
        //this.addChild(padCircle);
        
        pad.bg = padBg;
        pad.pad = padCircle;
        
        var gesture:GestureController = new GestureController(this.stage);
        //test banana/////////
        var bObject:BananaObject = new BananaObject("first bananaObj");
        var aObj:APhysicsObject = new APhysicsObject("firstAphyObj");
        
        /////////////////
        
        var w:AppleWorld = new AppleWorld();
        var ab:AppleBody = new AppleBody();
        w.add(ab);
        */
    }
    
    
}