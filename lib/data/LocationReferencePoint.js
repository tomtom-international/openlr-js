"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Copyright 2016 TomTom International B.V
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

var LocationReferencePoint = function () {
    function LocationReferencePoint() {
        _classCallCheck(this, LocationReferencePoint);
    }

    _createClass(LocationReferencePoint, [{
        key: "getLongitudeDeg",
        value: function getLongitudeDeg() {
            return this._longitude;
        }
    }, {
        key: "getLatitudeDeg",
        value: function getLatitudeDeg() {
            return this._latitude;
        }
    }, {
        key: "getBearing",
        value: function getBearing() {
            return this._bearing;
        }
    }, {
        key: "getDistanceToNext",
        value: function getDistanceToNext() {
            return this._distanceToNext;
        }
    }, {
        key: "getFRC",
        value: function getFRC() {
            return this._frc;
        }
    }, {
        key: "getFOW",
        value: function getFOW() {
            return this._fow;
        }
    }, {
        key: "getLfrc",
        value: function getLfrc() {
            return this._lfrcnp;
        }
    }, {
        key: "isLastLRP",
        value: function isLastLRP() {
            return this._isLast;
        }
    }], [{
        key: "fromValues",


        /** The latitude coordinate. */


        /** indicate that this is the last LRP */


        /** The form of way of the line referenced by the LRP. */


        /** The distance to the next LRP along the shortest-path. */
        value: function fromValues(sequenceNumber, frc, fow, longitude, latitude, bearing, distanceToNext, lfrcnp, isLast) {
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
        }

        /** The sequence number. */


        /** The longitude coordinate. */


        /** The lowest functional road class to the next LRP. */


        /** The functional road class of the line referenced by the LRP. */

        /** The bearing of the line referenced by the LRP. */

    }, {
        key: "fromGeoCoordinate",
        value: function fromGeoCoordinate(coord) {
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
        }
    }]);

    return LocationReferencePoint;
}();

exports.default = LocationReferencePoint;
;