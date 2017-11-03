"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SideOfRoad;
(function (SideOfRoad) {
    SideOfRoad[SideOfRoad["ON_ROAD_OR_UNKNOWN"] = 0] = "ON_ROAD_OR_UNKNOWN";
    SideOfRoad[SideOfRoad["RIGHT"] = 1] = "RIGHT";
    SideOfRoad[SideOfRoad["LEFT"] = 2] = "LEFT";
    SideOfRoad[SideOfRoad["BOTH"] = 3] = "BOTH";
})(SideOfRoad = exports.SideOfRoad || (exports.SideOfRoad = {}));
exports.getSideOfRoadValues = () => [SideOfRoad.ON_ROAD_OR_UNKNOWN, SideOfRoad.RIGHT, SideOfRoad.LEFT, SideOfRoad.BOTH];
exports.getDefault = () => SideOfRoad.ON_ROAD_OR_UNKNOWN;
exports.getId = (sideOfRoad) => sideOfRoad;
exports.default = SideOfRoad;
//# sourceMappingURL=SideOfRoad.js.map