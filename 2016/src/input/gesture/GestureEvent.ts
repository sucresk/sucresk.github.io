class GestureEvent extends egret.Event
{
    public static GESTURE:string = "GESTURE";
    
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type,bubbles,cancelable,data)
    }
}
