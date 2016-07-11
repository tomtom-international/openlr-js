/** Location is UNKNOWN. */
const UNKNOWN = Symbol();

/** line location. */
const LINE_LOCATION = Symbol();

/** simple geo coordinates */
const GEO_COORDINATES = Symbol();

/** point along a line */
const POINT_ALONG_LINE = Symbol();

/** point of interest with an access point along a line */
const POI_WITH_ACCESS_POINT = Symbol();

/** circle area location */
const CIRCLE = Symbol();

/** polygon area location */
const POLYGON = Symbol();

/** closed line area location */
const CLOSED_LINE = Symbol();

/** rectangular area location */
const RECTANGLE = Symbol();

/** grid area location */
const GRID = Symbol();

export default {
    UNKNOWN,
    LINE_LOCATION,
    GEO_COORDINATES,
    POINT_ALONG_LINE,
    POI_WITH_ACCESS_POINT,
    CIRCLE,
    POLYGON,
    CLOSED_LINE,
    RECTANGLE,
    GRID
};
