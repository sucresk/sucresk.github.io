class LevelOver1 extends LevelOver
{
    public constructor()
    {
        super("meng");
    }
    
    public over():void
    {
        this.next("levelOver2");
    }
}