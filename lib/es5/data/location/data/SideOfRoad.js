"use strict";
/**
 * Copyright 2017 TomTom International B.V
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var SideOfRoad;
(function (SideOfRoad) {
    SideOfRoad[SideOfRoad["ON_ROAD_OR_UNKNOWN"] = 0] = "ON_ROAD_OR_UNKNOWN";
    SideOfRoad[SideOfRoad["RIGHT"] = 1] = "RIGHT";
    SideOfRoad[SideOfRoad["LEFT"] = 2] = "LEFT";
    SideOfRoad[SideOfRoad["BOTH"] = 3] = "BOTH";
})(SideOfRoad = exports.SideOfRoad || (exports.SideOfRoad = {}));
exports.getSideOfRoadValues = function () { return [SideOfRoad.ON_ROAD_OR_UNKNOWN, SideOfRoad.RIGHT, SideOfRoad.LEFT, SideOfRoad.BOTH]; };
exports.getDefault = function () { return SideOfRoad.ON_ROAD_OR_UNKNOWN; };
exports.getId = function (sideOfRoad) { return sideOfRoad; };
//# sourceMappingURL=SideOfRoad.js.map