export var Orientation;
(function (Orientation) {
    Orientation[Orientation["NO_ORIENTATION_OR_UNKNOWN"] = 0] = "NO_ORIENTATION_OR_UNKNOWN";
    Orientation[Orientation["WITH_LINE_DIRECTION"] = 1] = "WITH_LINE_DIRECTION";
    Orientation[Orientation["AGAINST_LINE_DIRECTION"] = 2] = "AGAINST_LINE_DIRECTION";
    Orientation[Orientation["BOTH"] = 3] = "BOTH";
})(Orientation || (Orientation = {}));
export const getOrientationValues = () => [Orientation.NO_ORIENTATION_OR_UNKNOWN, Orientation.WITH_LINE_DIRECTION, Orientation.AGAINST_LINE_DIRECTION, Orientation.BOTH];
export const getDefault = () => Orientation.NO_ORIENTATION_OR_UNKNOWN;
export const getId = (orientation) => orientation;
export default Orientation;
//# sourceMappingURL=Orientation.js.map