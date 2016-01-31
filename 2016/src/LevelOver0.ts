class LevelOver0 extends LevelOver
{
    public constructor()
    {
        super("kui");
    }
    
    public over():void
    {
        this.next("levelOver1");
    }
}