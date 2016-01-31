class LevelOver3 extends LevelOver
{
    public constructor()
    {
        super("zhi");
    }
    
    public over():void
    {
        this.next("levelOver4");
    }
}