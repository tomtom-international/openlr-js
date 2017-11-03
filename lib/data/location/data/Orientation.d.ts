export declare enum Orientation {
    NO_ORIENTATION_OR_UNKNOWN = 0,
    WITH_LINE_DIRECTION = 1,
    AGAINST_LINE_DIRECTION = 2,
    BOTH = 3,
}
export declare const getOrientationValues: () => Orientation[];
export declare const getDefault: () => Orientation;
export declare const getId: (orientation: Orientation) => number;
export default Orientation;
