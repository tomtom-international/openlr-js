const ON_ROAD_OR_UNKNOWN = 0;
const RIGHT = 1;
const LEFT = 2;
const BOTH = 3;

export default {
    ON_ROAD_OR_UNKNOWN,
    RIGHT,
    LEFT,
    BOTH,
    getSideOfRoadValues: () => [ON_ROAD_OR_UNKNOWN, RIGHT, LEFT, BOTH],
    getDefault: () => ON_ROAD_OR_UNKNOWN,
    getId: sideOfRoad => sideOfRoad
};
