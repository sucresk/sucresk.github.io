class GamePadEvent extends egret.Event
{
    public static START:string = "START";
    
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false, data:any = null)
    {
        super(type,bubbles,cancelable,data)
    }
}
