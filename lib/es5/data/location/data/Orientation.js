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
var Orientation;
(function (Orientation) {
    Orientation[Orientation["NO_ORIENTATION_OR_UNKNOWN"] = 0] = "NO_ORIENTATION_OR_UNKNOWN";
    Orientation[Orientation["WITH_LINE_DIRECTION"] = 1] = "WITH_LINE_DIRECTION";
    Orientation[Orientation["AGAINST_LINE_DIRECTION"] = 2] = "AGAINST_LINE_DIRECTION";
    Orientation[Orientation["BOTH"] = 3] = "BOTH";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
exports.getOrientationValues = function () { return [Orientation.NO_ORIENTATION_OR_UNKNOWN, Orientation.WITH_LINE_DIRECTION, Orientation.AGAINST_LINE_DIRECTION, Orientation.BOTH]; };
exports.getDefault = function () { return Orientation.NO_ORIENTATION_OR_UNKNOWN; };
exports.getId = function (orientation) { return orientation; };
//# sourceMappingURL=Orientation.js.map