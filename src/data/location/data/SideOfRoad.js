const ON_ROAD_OR_UNKNOWN = Symbol('ON_ROAD_OR_UNKNOWN');
const RIGHT = Symbol('RIGHT');
const LEFT = Symbol('LEFT');
const BOTH = Symbol('BOTH');

export default {
    ON_ROAD_OR_UNKNOWN,
    RIGHT,
    LEFT,
    BOTH,
    getSideOfRoadValues: () => [ON_ROAD_OR_UNKNOWN, RIGHT, LEFT, BOTH],
    getDefault: () => ON_ROAD_OR_UNKNOWN
};
