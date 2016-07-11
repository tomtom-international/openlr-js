const ON_ROAD_OR_UNKNOWN = Symbol();
const RIGHT = Symbol();
const LEFT = Symbol();
const BOTH = Symbol();

export default {
    ON_ROAD_OR_UNKNOWN,
    RIGHT,
    LEFT,
    BOTH,
    getSideOfRoadValues: () => [ON_ROAD_OR_UNKNOWN, RIGHT, LEFT, BOTH],
    getDefault: () => ON_ROAD_OR_UNKNOWN
};
