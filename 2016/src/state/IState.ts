interface IState extends egret.IEventDispatcher{
    show(parent:egret.DisplayObjectContainer):void
    next(state:string):void
    tick(advancedTime:number):void
}