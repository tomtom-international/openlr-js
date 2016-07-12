'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GeometryUtils = require('./utils/GeometryUtils');

var _GeometryUtils2 = _interopRequireDefault(_GeometryUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeoCoordinates = function () {
    function GeoCoordinates() {
        _classCallCheck(this, GeoCoordinates);
    }

    _createClass(GeoCoordinates, [{
        key: 'getLatitudeDeg',
        value: function getLatitudeDeg() {
            return this._latitude;
        }
    }, {
        key: 'getLongitudeDeg',
        value: function getLongitudeDeg() {
            return this._longitude;
        }
    }, {
        key: 'equals',
        value: function equals(otherGeoCoordinates) {
            return this._longitude == otherGeoCoordinates._longitude && this._latitude == otherGeoCoordinates._latitude;
        }
    }], [{
        key: 'fromValues',

        /** The longitude. */
        value: function fromValues(longitude, latitude) {
            if (!_GeometryUtils2.default.checkCoordinateBounds(longitude, latitude)) {
                throw new Error('Coordinates out of bounds');
            }
            var geoCoordinates = new GeoCoordinates();
            geoCoordinates._longitude = longitude;
            geoCoordinates._latitude = latitude;
            return geoCoordinates;
        }

        /** The latitude. */

    }]);

    return GeoCoordinates;
}();

exports.default = GeoCoordinates;
;