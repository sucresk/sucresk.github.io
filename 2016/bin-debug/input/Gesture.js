var Gesture = (function () {
    function Gesture() {
        this._symbol = ["28", "46", "82", "64", "141", "585", "3", "7", "5", "1", "4321876", "2345678"];
        this._symbolG = [0, 0, 3, 3, 5, 5, 1, 1, 2, 2, 4, 4];
    }
    var d = __define,c=Gesture,p=c.prototype;
    p.addEvent = function (layer) {
        this._layer = layer;
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    p.removeEvent = function () {
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    };
    p.mouseDown = function (evt) {
        this._layer.graphics.clear();
        this._mouseDatas = [];
        var p = new egret.Point(evt.stageX, evt.stageY);
        this._mouseDatas.push(p);
        this._currentPoint = p;
    };
    p.mouseMove = function (evt) {
        var p = new egret.Point(evt.stageX, evt.stageY);
        this._mouseDatas.push(p);
        this._layer.graphics.lineStyle(5, 0);
        this._layer.graphics.moveTo(this._currentPoint.x, this._currentPoint.y);
        this._layer.graphics.lineTo(p.x, p.y);
        this._layer.graphics.endFill();
        this._currentPoint = p;
    };
    p.mouseUp = function (evt) {
        var p = new egret.Point(evt.stageX, evt.stageY);
        this._mouseDatas.push(p);
        this._layer.graphics.clear();
        this.motion();
    };
    p.motion = function () {
        var _arr = [];
        var currentIndex = 0;
        var len = this._mouseDatas.length;
        _arr.push(this._mouseDatas[currentIndex]);
        for (var i = 0; i < len; i++) {
            if (egret.Point.distance(this._mouseDatas[currentIndex], this._mouseDatas[i]) > 30) {
                currentIndex = i;
                _arr.push(this._mouseDatas[currentIndex]);
            }
        }
        this._mouseDatas = _arr;
        //console.log(this._mouseDatas);
        //console.log("ll:",_arr);
        this.parseDirection();
    };
    p.parseDirection = function () {
        this._dirsArr = [];
        var len = this._mouseDatas.length;
        for (var i = 0; i < len; i++) {
            if (this._mouseDatas[i + 1]) {
                var p1 = this._mouseDatas[i];
                var p2 = this._mouseDatas[i + 1];
                var a = p1.y - p2.y;
                var b = egret.Point.distance(p1, p2);
                var rad = Math.asin(a / b);
                var ang = rad * 57.2957800; // rad * 180/Math.PI 直接求常量，优化
                var quad = this.quadrant(p1, p2);
                var dir = this.getDirByAngQuad(ang, quad);
                this._dirsArr.push(dir);
            }
        }
        //console.log(this._dirsArr);
        var dirstr = this.repDiff(this._dirsArr);
        console.log(dirstr);
        var rel = this.sweep(dirstr);
        console.log("type: ", rel);
        this.disEvent(rel);
    };
    p.disEvent = function (type) {
        //Data.type = type;
        if (type != -1) {
            egret.MainContext.instance.stage.dispatchEvent(new egret.Event("action"));
        }
    };
    // v 0
    // | 1
    // - 2
    // ^ 3
    // 6 4
    // z 5
    p.sweep = function (str) {
        var maxType = -1;
        var max = -1;
        var len = this._symbol.length;
        for (var i = 0; i < len; i++) {
            var val = this.Levenshtein_Distance_Percent(this._symbol[i], str);
            if (val > max) {
                max = val;
                maxType = this._symbolG[i];
            }
        }
        if (max < 0.4) {
            maxType = -1;
        }
        return maxType;
    };
    /*
    对比去重
     */
    p.repDiff = function (data) {
        var str = "";
        var len = data.length;
        var currentType = 0;
        for (var i = 0; i < len; i++) {
            if (currentType != data[i]) {
                currentType = data[i];
                str += data[i];
            }
        }
        return str;
    };
    /*
    根据所在象限与角度计算出方向编号。
    方向编号，以第一象限0度为基础，按照顺时针方向，将圆等分为8份。
     */
    p.getDirByAngQuad = function (ang, quad) {
        switch (quad) {
            case 1:
                if (ang <= 22.5 && ang >= 0) {
                    return 1;
                }
                else if (ang <= 67.5 && ang > 22.5) {
                    return 8;
                }
                else {
                    return 7;
                }
                break;
            case 2:
                if (ang <= 22.5 && ang >= 0) {
                    return 5;
                }
                else if (ang <= 67.5 && ang > 22.5) {
                    return 6;
                }
                else {
                    return 7;
                }
                break;
            case 3:
                if (ang <= -67.5 && ang >= -90) {
                    return 3;
                }
                else if (ang <= -22.5 && ang > -67.5) {
                    return 4;
                }
                else {
                    return 5;
                }
                break;
            case 4:
                if (ang <= -67.5 && ang >= -90) {
                    return 3;
                }
                else if (ang <= -22.5 && ang > -67.5) {
                    return 2;
                }
                else {
                    return 1;
                }
                break;
        }
    };
    /*
    计算两点关系所形成的象限
    以P1 作为坐标原点，P2为设定点，判断P2相对于P1时所在象限
     */
    p.quadrant = function (p1, p2) {
        if (p2.x >= p1.x) {
            if (p2.y <= p1.y) {
                return 1;
            }
            else {
                return 4;
            }
        }
        else {
            if (p2.y <= p1.y) {
                return 2;
            }
            else {
                return 3;
            }
        }
    };
    p.Levenshtein_Distance = function (s, t) {
        var n = s.length; // length of s
        var m = t.length; // length of t
        var d = []; // matrix
        var i; // iterates through s
        var j; // iterates through t
        var s_i; // ith character of s
        var t_j; // jth character of t
        var cost; // cost
        // Step 1
        if (n == 0)
            return m;
        if (m == 0)
            return n;
        // Step 2
        for (i = 0; i <= n; i++) {
            d[i] = [];
            d[i][0] = i;
        }
        for (j = 0; j <= m; j++) {
            d[0][j] = j;
        }
        // Step 3
        for (i = 1; i <= n; i++) {
            s_i = s.charAt(i - 1);
            // Step 4
            for (j = 1; j <= m; j++) {
                t_j = t.charAt(j - 1);
                // Step 5
                if (s_i == t_j) {
                    cost = 0;
                }
                else {
                    cost = 1;
                }
                // Step 6
                d[i][j] = this.Minimum(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
            }
        }
        // Step 7
        return d[n][m];
    };
    p.Levenshtein_Distance_Percent = function (s, t) {
        var l = s.length > t.length ? s.length : t.length;
        var d = this.Levenshtein_Distance(s, t);
        return (1 - d / l); //.toFixed(4);
    };
    p.Minimum = function (a, b, c) {
        return a < b ? (a < c ? a : c) : (b < c ? b : c);
    };
    return Gesture;
})();
egret.registerClass(Gesture,'Gesture');
//# sourceMappingURL=Gesture.js.map