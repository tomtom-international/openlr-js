"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var FRC_0 = 0;
var FRC_1 = 1;
var FRC_2 = 2;
var FRC_3 = 3;
var FRC_4 = 4;
var FRC_5 = 5;
var FRC_6 = 6;
var FRC_7 = 7;

exports.default = {
    FRC_0: FRC_0,
    FRC_1: FRC_1,
    FRC_2: FRC_2,
    FRC_3: FRC_3,
    FRC_4: FRC_4,
    FRC_5: FRC_5,
    FRC_6: FRC_6,
    FRC_7: FRC_7,
    getFRCValues: function getFRCValues() {
        return [FRC_0, FRC_1, FRC_2, FRC_3, FRC_4, FRC_5, FRC_6, FRC_7];
    },
    getId: function getId(frc) {
        return frc;
    },
    lower: function lower(frc) {
        return Math.min(frc + 1, FRC_7);
    },
    higher: function higher(frc) {
        return Math.max(frc - 1, FRC_0);
    },
    getHighestFrc: FRC_0,
    getLowestFrc: FRC_7
};