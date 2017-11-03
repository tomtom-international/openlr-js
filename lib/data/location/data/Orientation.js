"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Orientation;
(function (Orientation) {
    Orientation[Orientation["NO_ORIENTATION_OR_UNKNOWN"] = 0] = "NO_ORIENTATION_OR_UNKNOWN";
    Orientation[Orientation["WITH_LINE_DIRECTION"] = 1] = "WITH_LINE_DIRECTION";
    Orientation[Orientation["AGAINST_LINE_DIRECTION"] = 2] = "AGAINST_LINE_DIRECTION";
    Orientation[Orientation["BOTH"] = 3] = "BOTH";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
exports.getOrientationValues = () => [Orientation.NO_ORIENTATION_OR_UNKNOWN, Orientation.WITH_LINE_DIRECTION, Orientation.AGAINST_LINE_DIRECTION, Orientation.BOTH];
exports.getDefault = () => Orientation.NO_ORIENTATION_OR_UNKNOWN;
exports.getId = (orientation) => orientation;
exports.default = Orientation;
//# sourceMappingURL=Orientation.js.map