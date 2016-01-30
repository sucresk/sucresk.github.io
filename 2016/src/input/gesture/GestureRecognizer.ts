class GestureRecognizer
{
    public static numPoints:number = 64;
    public static squareSize:number = 250;
    public static halfDiagonal:number = 0.5 * Math.sqrt(250 * 250 + 250 * 250);
    public static angleRange:number = 45;
    public static anglePrecision:number = 2;
    public static phi:number = 0.5 * (-1.0 + Math.sqrt(5.0));//golden Ratio
    public templates:Array<any>;
    
    public constructor()
    {
        this.templates = new Array();
    }
    
    public recognize(points:egret.Point[]):GestureResult
    {
        if(points[0] == null)
        {
            return null;
        }
        points = GestureRecognizer.resample(points,GestureRecognizer.numPoints);
        points = GestureRecognizer.rotate2Zero(points);
        points = GestureRecognizer.scale2Square(points, GestureRecognizer.squareSize);
        points = GestureRecognizer.translate2Origin(points);
        
        var b:number = Number.POSITIVE_INFINITY;
        var t;
        for(var i:number = 0,len:number = this.templates.length; i < len; i++)
        {
            var d:number = GestureRecognizer.distanceAtBestAngle(points,
                                               this.templates[i],
                                               -GestureRecognizer.angleRange,
                                               GestureRecognizer.angleRange,
                                               GestureRecognizer.anglePrecision
                                               )
            if(d < b)
            {
                b = d;
                t = i;
            }
        }
        var score = 1.0 - (b / GestureRecognizer.halfDiagonal);
		return new GestureResult(this.templates[t].name, score);
    }
    
    // add/delete new templates
    //
    public addTemplate(name:string, points:egret.Point[]):number
    {
        this.templates[this.templates.length] = new GestureTemplate(name, points); // append new template
        var num:number = 0;
        for (var i = 0; i < this.templates.length; i++)
        {
            if (this.templates[i].name == name)
                num++;
        }
        return num;
    }
    
    // Helper functions
		
    public static resample(points:egret.Point[], n:number):egret.Point[]
    {
        var I = GestureRecognizer.pathLength(points) / (n - 1); // interval length
        var D = 0.0;
        var newpoints:any[] = new Array(points[0]);
        for (var i = 1; i < points.length; i++)
        {
            var d = GestureRecognizer.Distance(points[i - 1], points[i]);
            if ((D + d) >= I)
            {
                var qx = points[i - 1].x + ((I - D) / d) * (points[i].x - points[i - 1].x);
                var qy = points[i - 1].y + ((I - D) / d) * (points[i].y - points[i - 1].y);
                var q = new egret.Point(qx, qy);
                newpoints[newpoints.length] = q; // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            }
            else D += d;
        }
        // somtimes we fall a rounding-error short of adding the last point, so add it if so
        if (newpoints.length == n - 1)
        {
            newpoints[newpoints.length] = points[points.length - 1];
        }
        return newpoints;
    }
    
    public static  rotate2Zero(points:egret.Point[]):egret.Point[]
    {
        var c = GestureRecognizer.Centroid(points);
        if(points[0] == null)
        {
            theta = 0;
        }
        var theta = Math.atan2(c.y - points[0].y, c.x - points[0].x);
        return GestureRecognizer.RotateBy(points, -theta);
    }
    
    public static scale2Square(points:egret.Point[], size:number):egret.Point[]
    {
        var B = GestureRecognizer.BoundingBox(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++)
        {
            var qx = points[i].x * (size / B.width);
            var qy = points[i].y * (size / B.height);
            newpoints[newpoints.length] = new egret.Point(qx, qy);
        }
        return newpoints;
    }			
    public static translate2Origin(points:egret.Point[]):egret.Point[]
    {
        var c = GestureRecognizer.Centroid(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++)
        {
            var qx = points[i].x - c.x;
            var qy = points[i].y - c.y;
            newpoints[newpoints.length] = new egret.Point(qx, qy);
        }
        return newpoints;
    }
    
    public static distanceAtBestAngle(points:egret.Point[], T, a, b, threshold):number
    {
        var x1 = GestureRecognizer.phi * a + (1.0 - GestureRecognizer.phi) * b;
        var f1 = GestureRecognizer.DistanceAtAngle(points, T, x1);
        var x2 = (1.0 - GestureRecognizer.phi) * a + GestureRecognizer.phi * b;
        var f2 = GestureRecognizer.DistanceAtAngle(points, T, x2);
        while (Math.abs(b - a) > threshold)
        {
            if (f1 < f2)
            {
                b = x2;
                x2 = x1;
                f2 = f1;
                x1 = GestureRecognizer.phi * a + (1.0 - GestureRecognizer.phi) * b;
                f1 = this.DistanceAtAngle(points, T, x1);
            }
            else
            {
                a = x1;
                x1 = x2;
                f1 = f2;
                x2 = (1.0 - GestureRecognizer.phi) * a + GestureRecognizer.phi * b;
                f2 = GestureRecognizer.DistanceAtAngle(points, T, x2);
            }
        }
        return Math.min(f1, f2);
    }
    
    public static pathLength(points):number
    {
        var d = 0.0;
        for (var i = 1; i < points.length; i++)
            d += GestureRecognizer.Distance(points[i - 1], points[i]);
        return d;
    }
    
    public static Distance(p1, p2):number
    {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    public static Centroid(points):egret.Point
    {
        var x = 0.0, y = 0.0;
        for (var i = 0; i < points.length; i++)
        {
            if(points[1] == null)
            {
                continue;
            }
            x += points[i].x;
            y += points[i].y;
        }
        x /= points.length;
        y /= points.length;
        return new egret.Point(x, y);
    }
    public  static RotateBy(points, theta):egret.Point[]
    {
        var c = GestureRecognizer.Centroid(points);
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++)
        {
            var qx = (points[i].x - c.x) * cos - (points[i].y - c.y) * sin + c.x
            var qy = (points[i].x - c.x) * sin + (points[i].y - c.y) * cos + c.y;
            newpoints[newpoints.length] = new egret.Point(qx, qy);
        }
        return newpoints;
    }
    public static BoundingBox(points):egret.Rectangle
    {
        var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
        for (var i = 0; i < points.length; i++)
        {
            if (points[i].x < minX)
                minX = points[i].x;
            if (points[i].x > maxX)
                maxX = points[i].x;
            if (points[i].y < minY)
                minY = points[i].y;
            if (points[i].y > maxY)
                maxY = points[i].y;
        }
        return new egret.Rectangle(minX, minY, maxX - minX, maxY - minY);
    }
    
    public static DistanceAtAngle(points, T, theta)
    {
        var newpoints = GestureRecognizer.RotateBy(points, theta);
        return GestureRecognizer.PathDistance(newpoints, T.points);
    }
    
    public static PathDistance(pts1, pts2):number
    {
        var d = 0.0;
        for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
            d += GestureRecognizer.Distance(pts1[i], pts2[i]);
        return d / pts1.length;
    }
}