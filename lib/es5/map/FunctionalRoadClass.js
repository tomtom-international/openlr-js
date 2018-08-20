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
var FunctionalRoadClass;
(function (FunctionalRoadClass) {
    FunctionalRoadClass[FunctionalRoadClass["FRC_0"] = 0] = "FRC_0";
    FunctionalRoadClass[FunctionalRoadClass["FRC_1"] = 1] = "FRC_1";
    FunctionalRoadClass[FunctionalRoadClass["FRC_2"] = 2] = "FRC_2";
    FunctionalRoadClass[FunctionalRoadClass["FRC_3"] = 3] = "FRC_3";
    FunctionalRoadClass[FunctionalRoadClass["FRC_4"] = 4] = "FRC_4";
    FunctionalRoadClass[FunctionalRoadClass["FRC_5"] = 5] = "FRC_5";
    FunctionalRoadClass[FunctionalRoadClass["FRC_6"] = 6] = "FRC_6";
    FunctionalRoadClass[FunctionalRoadClass["FRC_7"] = 7] = "FRC_7";
})(FunctionalRoadClass = exports.FunctionalRoadClass || (exports.FunctionalRoadClass = {}));
exports.getFRCValues = function () { return [FunctionalRoadClass.FRC_0, FunctionalRoadClass.FRC_1, FunctionalRoadClass.FRC_2, FunctionalRoadClass.FRC_3, FunctionalRoadClass.FRC_4, FunctionalRoadClass.FRC_5, FunctionalRoadClass.FRC_6, FunctionalRoadClass.FRC_7]; };
exports.getId = function (frc) { return frc; };
exports.lower = function (frc) { return Math.min(frc + 1, FunctionalRoadClass.FRC_7); };
exports.higher = function (frc) { return Math.max(frc - 1, FunctionalRoadClass.FRC_0); };
exports.getHighestFrc = FunctionalRoadClass.FRC_0;
exports.getLowestFrc = FunctionalRoadClass.FRC_7;
//# sourceMappingURL=FunctionalRoadClass.js.map