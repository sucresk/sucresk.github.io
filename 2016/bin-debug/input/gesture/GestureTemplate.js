var GestureTemplate = (function () {
    function GestureTemplate(name, points) {
        this.name = name;
        this.points = GestureRecognizer.resample(points, GestureRecognizer.numPoints);
        this.points = GestureRecognizer.rotate2Zero(this.points);
        this.points = GestureRecognizer.scale2Square(this.points, GestureRecognizer.squareSize);
        this.points = GestureRecognizer.translate2Origin(this.points);
    }
    var d = __define,c=GestureTemplate,p=c.prototype;
    return GestureTemplate;
})();
egret.registerClass(GestureTemplate,'GestureTemplate');
//# sourceMappingURL=GestureTemplate.js.map