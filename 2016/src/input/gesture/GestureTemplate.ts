class GestureTemplate
{
    public name:String;
	public points:Array<egret.Point>;
    
    public constructor(name:string, points:egret.Point[])
    {
        this.name = name;
        this.points = GestureRecognizer.resample(points, GestureRecognizer.numPoints);
        this.points = GestureRecognizer.rotate2Zero(this.points);
        this.points = GestureRecognizer.scale2Square(this.points, GestureRecognizer.squareSize);
        this.points = GestureRecognizer.translate2Origin(this.points);
    }
}