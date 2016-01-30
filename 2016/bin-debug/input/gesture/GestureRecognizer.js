var GestureRecognizer = (function () {
    function GestureRecognizer() {
        this.templates = new Array();
    }
    var d = __define,c=GestureRecognizer,p=c.prototype;
    p.recognize = function (points) {
        points = GestureRecognizer.resample(points, GestureRecognizer.numPoints);
        points = GestureRecognizer.rotate2Zero(points);
        points = GestureRecognizer.scale2Square(points, GestureRecognizer.squareSize);
        points = GestureRecognizer.translate2Origin(points);
        var b = Number.POSITIVE_INFINITY;
        var t;
        for (var i = 0, len = this.templates.length; i < len; i++) {
            var d = GestureRecognizer.distanceAtBestAngle(points, this.templates[i], -GestureRecognizer.angleRange, GestureRecognizer.angleRange, GestureRecognizer.anglePrecision);
            if (d < b) {
                b = d;
                t = i;
            }
        }
        var score = 1.0 - (b / GestureRecognizer.halfDiagonal);
        return new GestureResult(this.templates[t].name, score);
    };
    // add/delete new templates
    //
    p.addTemplate = function (name, points) {
        this.templates[this.templates.length] = new GestureTemplate(name, points); // append new template
        var num = 0;
        for (var i = 0; i < this.templates.length; i++) {
            if (this.templates[i].name == name)
                num++;
        }
        return num;
    };
    // Helper functions
    GestureRecognizer.resample = function (points, n) {
        var I = GestureRecognizer.pathLength(points) / (n - 1); // interval length
        var D = 0.0;
        var newpoints = new Array(points[0]);
        for (var i = 1; i < points.length; i++) {
            var d = GestureRecognizer.Distance(points[i - 1], points[i]);
            if ((D + d) >= I) {
                var qx = points[i - 1].x + ((I - D) / d) * (points[i].x - points[i - 1].x);
                var qy = points[i - 1].y + ((I - D) / d) * (points[i].y - points[i - 1].y);
                var q = new egret.Point(qx, qy);
                newpoints[newpoints.length] = q; // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            }
            else
                D += d;
        }
        // somtimes we fall a rounding-error short of adding the last point, so add it if so
        if (newpoints.length == n - 1) {
            newpoints[newpoints.length] = points[points.length - 1];
        }
        return newpoints;
    };
    GestureRecognizer.rotate2Zero = function (points) {
        var c = GestureRecognizer.Centroid(points);
        var theta = Math.atan2(c.y - points[0].y, c.x - points[0].x);
        return GestureRecognizer.RotateBy(points, -theta);
    };
    GestureRecognizer.scale2Square = function (points, size) {
        var B = GestureRecognizer.BoundingBox(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = points[i].x * (size / B.width);
            var qy = points[i].y * (size / B.height);
            newpoints[newpoints.length] = new egret.Point(qx, qy);
        }
        return newpoints;
    };
    GestureRecognizer.translate2Origin = function (points) {
        var c = GestureRecognizer.Centroid(points);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = points[i].x - c.x;
            var qy = points[i].y - c.y;
            newpoints[newpoints.length] = new egret.Point(qx, qy);
        }
        return newpoints;
    };
    GestureRecognizer.distanceAtBestAngle = function (points, T, a, b, threshold) {
        var x1 = GestureRecognizer.phi * a + (1.0 - GestureRecognizer.phi) * b;
        var f1 = GestureRecognizer.DistanceAtAngle(points, T, x1);
        var x2 = (1.0 - GestureRecognizer.phi) * a + GestureRecognizer.phi * b;
        var f2 = GestureRecognizer.DistanceAtAngle(points, T, x2);
        while (Math.abs(b - a) > threshold) {
            if (f1 < f2) {
                b = x2;
                x2 = x1;
                f2 = f1;
                x1 = GestureRecognizer.phi * a + (1.0 - GestureRecognizer.phi) * b;
                f1 = this.DistanceAtAngle(points, T, x1);
            }
            else {
                a = x1;
                x1 = x2;
                f1 = f2;
                x2 = (1.0 - GestureRecognizer.phi) * a + GestureRecognizer.phi * b;
                f2 = GestureRecognizer.DistanceAtAngle(points, T, x2);
            }
        }
        return Math.min(f1, f2);
    };
    GestureRecognizer.pathLength = function (points) {
        var d = 0.0;
        for (var i = 1; i < points.length; i++)
            d += GestureRecognizer.Distance(points[i - 1], points[i]);
        return d;
    };
    GestureRecognizer.Distance = function (p1, p2) {
        var dx = p2.x - p1.x;
        var dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    GestureRecognizer.Centroid = function (points) {
        var x = 0.0, y = 0.0;
        for (var i = 0; i < points.length; i++) {
            x += points[i].x;
            y += points[i].y;
        }
        x /= points.length;
        y /= points.length;
        return new egret.Point(x, y);
    };
    GestureRecognizer.RotateBy = function (points, theta) {
        var c = GestureRecognizer.Centroid(points);
        var cos = Math.cos(theta);
        var sin = Math.sin(theta);
        var newpoints = new Array();
        for (var i = 0; i < points.length; i++) {
            var qx = (points[i].x - c.x) * cos - (points[i].y - c.y) * sin + c.x;
            var qy = (points[i].x - c.x) * sin + (points[i].y - c.y) * cos + c.y;
            newpoints[newpoints.length] = new egret.Point(qx, qy);
        }
        return newpoints;
    };
    GestureRecognizer.BoundingBox = function (points) {
        var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
        for (var i = 0; i < points.length; i++) {
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
    };
    GestureRecognizer.DistanceAtAngle = function (points, T, theta) {
        var newpoints = GestureRecognizer.RotateBy(points, theta);
        return GestureRecognizer.PathDistance(newpoints, T.points);
    };
    GestureRecognizer.PathDistance = function (pts1, pts2) {
        var d = 0.0;
        for (var i = 0; i < pts1.length; i++)
            d += GestureRecognizer.Distance(pts1[i], pts2[i]);
        return d / pts1.length;
    };
    GestureRecognizer.numPoints = 64;
    GestureRecognizer.squareSize = 250;
    GestureRecognizer.halfDiagonal = 0.5 * Math.sqrt(250 * 250 + 250 * 250);
    GestureRecognizer.angleRange = 45;
    GestureRecognizer.anglePrecision = 2;
    GestureRecognizer.phi = 0.5 * (-1.0 + Math.sqrt(5.0)); //golden Ratio
    return GestureRecognizer;
})();
egret.registerClass(GestureRecognizer,'GestureRecognizer');
//# sourceMappingURL=GestureRecognizer.js.map