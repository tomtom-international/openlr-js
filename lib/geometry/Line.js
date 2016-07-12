"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Line = function () {
    function Line() {
        _classCallCheck(this, Line);
    }

    _createClass(Line, [{
        key: "intersectsLineValues",
        value: function intersectsLineValues(x1, y1, x2, y2) {
            return Line.linesIntersect(x1, y1, x2, y2, this._x1, this._y1, this._x2, this._y2);
        }
    }, {
        key: "intersectsLineObject",
        value: function intersectsLineObject(line) {
            return Line.linesIntersect(line.x1, line.y1, line.x2, line.y2, this._x1, this._y1, this._x2, this._y2);
        }
    }, {
        key: "x1",
        get: function get() {
            return this._x1;
        }
    }, {
        key: "y1",
        get: function get() {
            return this._y1;
        }
    }, {
        key: "x2",
        get: function get() {
            return this._x2;
        }
    }, {
        key: "y2",
        get: function get() {
            return this._y2;
        }
    }], [{
        key: "fromValues",
        value: function fromValues(x1, y1, x2, y2) {
            var line = new Line();
            line._x1 = x1;
            line._y1 = y1;
            line._x2 = x2;
            line._y2 = y2;
            return line;
        }
    }, {
        key: "relativeCCW",
        value: function relativeCCW(x1, y1, x2, y2, px, py) {
            x2 -= x1;
            y2 -= y1;
            px -= x1;
            py -= y1;
            var ccw = px * y2 - py * x2;
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
            return ccw < 0.0 ? -1 : ccw > 0.0 ? 1 : 0;
        }
    }, {
        key: "linesIntersect",
        value: function linesIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
            return Line.relativeCCW(x1, y1, x2, y2, x3, y3) * Line.relativeCCW(x1, y1, x2, y2, x4, y4) <= 0 && Line.relativeCCW(x3, y3, x4, y4, x1, y1) * Line.relativeCCW(x3, y3, x4, y4, x2, y2) <= 0;
        }
    }]);

    return Line;
}();

exports.default = Line;
;