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
var GeometryUtils_1 = require("./utils/GeometryUtils");
var GeoCoordinates = /** @class */ (function () {
    function GeoCoordinates() {
    }
    GeoCoordinates.prototype.getLatitudeDeg = function () {
        return this._latitude;
    };
    GeoCoordinates.prototype.getLongitudeDeg = function () {
        return this._longitude;
    };
    GeoCoordinates.fromValues = function (longitude, latitude) {
        if (!GeometryUtils_1.GeometryUtils.checkCoordinateBounds(longitude, latitude)) {
            throw new Error('Coordinates out of bounds');
        }
        var geoCoordinates = new GeoCoordinates();
        geoCoordinates._longitude = longitude;
        geoCoordinates._latitude = latitude;
        return geoCoordinates;
    };
    return GeoCoordinates;
}());
exports.GeoCoordinates = GeoCoordinates;
//# sourceMappingURL=GeoCoordinates.js.map