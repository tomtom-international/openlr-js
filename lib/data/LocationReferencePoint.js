"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LocationReferencePoint = function () {
    function LocationReferencePoint() {
        _classCallCheck(this, LocationReferencePoint);
    }

    _createClass(LocationReferencePoint, [{
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
    }, {
        key: "equals",
        value: function equals(otherLocationReferencePoint) {
            return this._bearing == otherLocationReferencePoint._bearing && this._distanceToNext == otherLocationReferencePoint._distanceToNext && this._frc.equals(otherLocationReferencePoint._frc) && this._fow.equals(otherLocationReferencePoint._fow) && this._lfrcnp.equals(otherLocationReferencePoint._lfrcnp) && this._isLast == otherLocationReferencePoint._isLast && this._longitude == otherLocationReferencePoint._longitude && this._latitude == otherLocationReferencePoint._latitude;
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