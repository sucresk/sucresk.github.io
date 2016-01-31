class LevelOver4 extends LevelOver
{
    public constructor()
    {
        super("lei");
    }
    
    public over():void
    {
        this.stopSound();
        this.next("levelThanks");
    }
    
    private stopSound():void
    {
        if(LevelOver.bgChannel)
        {
            LevelOver.bgChannel.stop();
        }
    }
}