class LevelOver4 extends LevelOver
{
    public constructor()
    {
        super("lei");
    }
    
    public over():void
    {
        this.stopSound();
        this.next("levelEnd");
    }
    
    private stopSound():void
    {
        if(LevelOver.bgChannel)
        {
            LevelOver.bgChannel.stop();
        }
    }
}