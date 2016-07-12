"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ON_ROAD_OR_UNKNOWN = Symbol();
var RIGHT = Symbol();
var LEFT = Symbol();
var BOTH = Symbol();

exports.default = {
    ON_ROAD_OR_UNKNOWN: ON_ROAD_OR_UNKNOWN,
    RIGHT: RIGHT,
    LEFT: LEFT,
    BOTH: BOTH,
    getSideOfRoadValues: function getSideOfRoadValues() {
        return [ON_ROAD_OR_UNKNOWN, RIGHT, LEFT, BOTH];
    },
    getDefault: function getDefault() {
        return ON_ROAD_OR_UNKNOWN;
    }
};