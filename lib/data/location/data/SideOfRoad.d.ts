export declare enum SideOfRoad {
    ON_ROAD_OR_UNKNOWN = 0,
    RIGHT = 1,
    LEFT = 2,
    BOTH = 3,
}
export declare const getSideOfRoadValues: () => SideOfRoad[];
export declare const getDefault: () => SideOfRoad;
export declare const getId: (sideOfRoad: SideOfRoad) => number;
export default SideOfRoad;
