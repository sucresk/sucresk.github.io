class State extends egret.DisplayObjectContainer implements IState
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
    
    public init():void
    {
        console.log("this is a state");
    }
    public show(parent:egret.DisplayObjectContainer):void
    {
        parent.addChild(this);
    }
    
    public next(state:string):void
    {
        this.dispatchEvent(new StateEvent(StateEvent.NEXT,state));
        this.parent.removeChild(this);
    }
    
    public tick(advancedTime:number):void
    {
        
    }
}