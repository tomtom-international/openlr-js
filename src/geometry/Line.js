export default class Line {
    _x1;

    _y1;

    _x2;

    _y2;

    static fromValues(x1, y1, x2, y2) {
        const line = new Line();
        line._x1 = x1;
        line._y1 = y1;
        line._x2 = x2;
        line._y2 = y2;
        return line;
    }

    get x1() {
        return this._x1;
    }

    get y1() {
        return this._y1;
    }

    get x2() {
        return this._x2;
    }

    get y2() {
        return this._y2;
    }

    intersectsLineValues(x1, y1, x2, y2) {
        return Line.linesIntersect(x1, y1, x2, y2, this._x1, this._y1, this._x2, this._y2);
    }

    intersectsLineObject(line) {
        return Line.linesIntersect(line.x1, line.y1, line.x2, line.y2, this._x1, this._y1, this._x2, this._y2);
    }

    static relativeCCW(x1, y1, x2, y2, px, py) {
        x2 -= x1;
        y2 -= y1;
        px -= x1;
        py -= y1;
        let ccw = px * y2 - py * x2;
        if (ccw == 0.0) {
            ccw = px * x2 + py * y2;
            if (ccw > 0.0) {
                px -= x2;
                py -= y2;
                ccw = px * x2 + py * y2;
                if (ccw < 0.0) {
                    ccw = 0.0;
                }
            }
        }
        return (ccw < 0.0) ? -1 : ((ccw > 0.0) ? 1 : 0);
    }

    static linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        return ((Line.relativeCCW(x1, y1, x2, y2, x3, y3) * Line.relativeCCW(x1, y1, x2, y2, x4, y4) <= 0) && (Line.relativeCCW(x3, y3, x4, y4, x1, y1) * Line.relativeCCW(x3, y3, x4, y4, x2, y2) <= 0));
    }
};
