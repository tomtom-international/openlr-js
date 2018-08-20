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
var LocationReferencePoint = /** @class */ (function () {
    function LocationReferencePoint() {
    }
    LocationReferencePoint.prototype.getLongitudeDeg = function () {
        return this._longitude;
    };
    LocationReferencePoint.prototype.getLatitudeDeg = function () {
        return this._latitude;
    };
    LocationReferencePoint.prototype.getBearing = function () {
        return this._bearing;
    };
    LocationReferencePoint.prototype.getDistanceToNext = function () {
        return this._distanceToNext;
    };
    LocationReferencePoint.prototype.getFRC = function () {
        return this._frc;
    };
    LocationReferencePoint.prototype.getFOW = function () {
        return this._fow;
    };
    LocationReferencePoint.prototype.getLfrc = function () {
        return this._lfrcnp;
    };
    LocationReferencePoint.prototype.isLastLRP = function () {
        return this._isLast;
    };
    LocationReferencePoint.fromValues = function (sequenceNumber, frc, fow, longitude, latitude, bearing, distanceToNext, lfrcnp, isLast) {
        var lrp = new LocationReferencePoint();
        lrp._bearing = bearing;
        lrp._distanceToNext = distanceToNext;
        lrp._frc = frc;
        lrp._fow = fow;
        lrp._lfrcnp = lfrcnp;
        lrp._isLast = isLast;
        lrp._longitude = longitude;
        lrp._latitude = latitude;
        lrp._sequenceNumber = sequenceNumber;
        return lrp;
    };
    LocationReferencePoint.fromGeoCoordinate = function (coord) {
        var lrp = new LocationReferencePoint();
        lrp._longitude = coord.getLongitudeDeg();
        lrp._latitude = coord.getLatitudeDeg();
        lrp._frc = null;
        lrp._fow = null;
        lrp._bearing = 0;
        lrp._lfrcnp = null;
        lrp._isLast = false;
        lrp._distanceToNext = 0;
        lrp._sequenceNumber = 1;
        return lrp;
    };
    return LocationReferencePoint;
}());
exports.LocationReferencePoint = LocationReferencePoint;
//# sourceMappingURL=LocationReferencePoint.js.map