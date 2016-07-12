"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var NO_ORIENTATION_OR_UNKNOWN = Symbol();
var WITH_LINE_DIRECTION = Symbol();
var AGAINST_LINE_DIRECTION = Symbol();
var BOTH = Symbol();

exports.default = {
    NO_ORIENTATION_OR_UNKNOWN: NO_ORIENTATION_OR_UNKNOWN,
    WITH_LINE_DIRECTION: WITH_LINE_DIRECTION,
    AGAINST_LINE_DIRECTION: AGAINST_LINE_DIRECTION,
    BOTH: BOTH,
    getOrientationValues: [NO_ORIENTATION_OR_UNKNOWN, WITH_LINE_DIRECTION, AGAINST_LINE_DIRECTION, BOTH],
    getDefault: function getDefault() {
        return NO_ORIENTATION_OR_UNKNOWN;
    }
};