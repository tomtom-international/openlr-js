"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/** Location is UNKNOWN. */
var UNKNOWN = Symbol();

/** line location. */
var LINE_LOCATION = Symbol();

/** simple geo coordinates */
var GEO_COORDINATES = Symbol();

/** point along a line */
var POINT_ALONG_LINE = Symbol();

/** point of interest with an access point along a line */
var POI_WITH_ACCESS_POINT = Symbol();

/** circle area location */
var CIRCLE = Symbol();

/** polygon area location */
var POLYGON = Symbol();

/** closed line area location */
var CLOSED_LINE = Symbol();

/** rectangular area location */
var RECTANGLE = Symbol();

/** grid area location */
var GRID = Symbol();

exports.default = {
    UNKNOWN: UNKNOWN,
    LINE_LOCATION: LINE_LOCATION,
    GEO_COORDINATES: GEO_COORDINATES,
    POINT_ALONG_LINE: POINT_ALONG_LINE,
    POI_WITH_ACCESS_POINT: POI_WITH_ACCESS_POINT,
    CIRCLE: CIRCLE,
    POLYGON: POLYGON,
    CLOSED_LINE: CLOSED_LINE,
    RECTANGLE: RECTANGLE,
    GRID: GRID
};