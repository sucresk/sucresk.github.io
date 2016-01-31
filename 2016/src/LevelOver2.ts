class LevelOver2 extends LevelOver
{
    public constructor()
    {
        super("wei");
    }
    
    public over():void
    {
        this.next("levelOver3");
    }
}