class StateEvent extends egret.Event
{
    public static NEXT:string = "NEXT";
    public data:string;
    
    public constructor(type:string, data:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type, bubbles, cancelable);
        this.data = data;
    }
}