'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
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

var _GeoCoordinates = require('../GeoCoordinates');

var _GeoCoordinates2 = _interopRequireDefault(_GeoCoordinates);

var _Line = require('../../geometry/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IN_DIRECTION = 1;
var AGAINST_DIRECTION = 2;

var GeometryUtils = function () {

    /** The default precision for rounding coordinate values. */


    /** The Constant QUARTER_CIRCLE. */


    /** The Constant ZERO_CIRCLE. */


    /** The Constant MAX_LON. */

    /** The Constant MAX_LAT. */
    function GeometryUtils() {
        _classCallCheck(this, GeometryUtils);

        throw new Error('Cannot instantiate utility class');
    }

    /** The Constant METER_PER_KILOMETER. */


    /** The Constant QUARTER_CIRCLE. */


    /** The Constant HALF_CIRCLE. */


    /** The Constant MIN_LON. */


    /** The Constant MIN_LAT. */


    /** The Constant divisionsPerDegree. */
    // 1000 * 100;

    /** Degree in a full circle */


    /** = DIVISIONS_PER_DEGREE / DIVISIONS_PER_RADIAN */


    /** The equatorial radius in meters */
    // meter

    /** The Constant INVERSE_FLATTENING. */


    /** The Constant OBLATENESS. */


    _createClass(GeometryUtils, null, [{
        key: '_toRadians',
        value: function _toRadians(value) {
            return value * GeometryUtils._RAD_FACTOR;
        }
    }, {
        key: 'geoCoordinatesDistance',
        value: function geoCoordinatesDistance(coord1, coord2) {
            return GeometryUtils.latitudeLongitudeDistance(coord1.longitudeDeg, coord1.latitudeDeg, coord2.longitudeDeg, coord2.latitudeDeg);
        }
    }, {
        key: 'latitudeLongitudeDistance',
        value: function latitudeLongitudeDistance(longitude1, latitude1, longitude2, latitude2) {
            if (latitude2 == latitude1 && longitude2 == longitude1) {
                return 0.0;
            }
            var f = GeometryUtils._toRadians((latitude2 + latitude1) / 2.0);
            var g = GeometryUtils._toRadians((latitude2 - latitude1) / 2.0);
            var l = GeometryUtils._toRadians((longitude2 - longitude1) / 2.0);

            var sinF = Math.sin(f);
            var sinG = Math.sin(g);
            var cosF = Math.cos(f);
            var cosG = Math.cos(g);
            var sinl = Math.sin(l);
            var cosl = Math.cos(l);
            var s = sinG * sinG * cosl * cosl + cosF * cosF * sinl * sinl;
            if (s == 0) {
                return 0.0;
            }
            var c = cosG * cosG * cosl * cosl + sinF * sinF * sinl * sinl;
            if (c == 0) {
                return 0.0;
            }
            var w = Math.atan(Math.sqrt(s / c));
            if (w == 0) {
                return 0.0;
            }
            var d = 2 * w * GeometryUtils._EQUATORIAL_RADIUS;
            var r = Math.sqrt(s * c) / w;
            var h1 = (3 * r - 1.0) / (2 * c);
            var h2 = (3 * r + 1.0) / (2 * s);

            return d * (1 + GeometryUtils._OBLATENESS * h1 * sinF * sinF * cosG * cosG - GeometryUtils._OBLATENESS * h2 * cosF * cosF * sinG * sinG);
        }
    }, {
        key: '_transformDecaMicroDeg',
        value: function _transformDecaMicroDeg(val) {
            return val * GeometryUtils._DIVISIONS_PER_DEGREE;
        }
    }, {
        key: 'geoCoordinatesBearing',
        value: function geoCoordinatesBearing(coord1, coord2) {
            return GeometryUtils.latitudeLongitudeBearing(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
        }
    }, {
        key: 'latitudeLongitudeBearing',
        value: function latitudeLongitudeBearing(p1Longitude, p1Latitude, p2Longitude, p2Latitude) {
            var deltaX = GeometryUtils._transformDecaMicroDeg(p2Longitude - p1Longitude) * GeometryUtils._hMult(p2Latitude);
            var deltaY = GeometryUtils._transformDecaMicroDeg(p2Latitude - p1Latitude);
            var angle = GeometryUtils.toDegrees(Math.atan2(deltaX, deltaY));
            if (angle < 0) {
                angle += GeometryUtils.FULL_CIRCLE_DEGREE;
            }
            return angle;
        }
    }, {
        key: '_hMult',
        value: function _hMult(y) {
            return Math.cos(y * GeometryUtils._RAD_FACTOR);
        }
    }, {
        key: 'calculateLineBearing',
        value: function calculateLineBearing(line, dir, pointDistance, projectionAlongLine) {
            if (line == null) {
                return -1.0;
            }
            var p1 = null;
            var p2 = null;

            if (dir == GeometryUtils.BearingDirection.IN_DIRECTION) {
                if (projectionAlongLine > 0) {
                    p1 = line.getGeoCoordinateAlongLine(projectionAlongLine);
                    if (line.getLineLength() < projectionAlongLine + pointDistance) {
                        p2 = line.getEndNode().getGeoCoordinates();
                    } else {
                        p2 = line.getGeoCoordinateAlongLine(projectionAlongLine + pointDistance);
                    }
                } else {
                    p1 = line.getStartNode().getGeoCoordinates();
                    if (line.getLineLength() < pointDistance) {
                        p2 = line.getEndNode().getGeoCoordinates();
                    } else {
                        p2 = line.getGeoCoordinateAlongLine(pointDistance);
                    }
                }
            } else {
                if (projectionAlongLine > 0) {
                    p1 = line.getGeoCoordinateAlongLine(projectionAlongLine);
                    if (projectionAlongLine < pointDistance) {
                        p2 = line.getStartNode().getGeoCoordinates();
                    } else {
                        p2 = line.getGeoCoordinateAlongLine(projectionAlongLine - pointDistance);
                    }
                } else {
                    p1 = line.getEndNode().getGeoCoordinates();
                    if (line.getLineLength() < pointDistance) {
                        p2 = line.getStartNode().getGeoCoordinates();
                    } else {
                        p2 = line.getGeoCoordinateAlongLine(line.getLineLength() - pointDistance);
                    }
                }
            }
            return GeometryUtils.bearing(p1, p2);
        }
    }, {
        key: 'checkCoordinateBounds',
        value: function checkCoordinateBounds(lon, lat) {
            return lon >= GeometryUtils.MIN_LON && lon <= GeometryUtils.MAX_LON && lat >= GeometryUtils.MIN_LAT && lat <= GeometryUtils.MAX_LAT;
        }
    }, {
        key: 'geoCoordinatesIntersectStraights',
        value: function geoCoordinatesIntersectStraights(coord1, bear1, coord2, bear2) {
            return GeometryUtils.latitudeLongitudeIntersectStraights(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), bear1, coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), bear2);
        }
    }, {
        key: 'latitudeLongitudeIntersectStraights',
        value: function latitudeLongitudeIntersectStraights(longitude1, latitude1, bear1, longitude2, latitude2, bear2) {
            var m1 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear1));
            var m2 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear2));
            var x = void 0;
            var y = void 0;
            if (bear1 == 0.0) {
                if (bear2 == 0.0) {
                    return null;
                }
                x = longitude1;
                y = +m2 * (x - longitude2) + latitude2;
                if (!isFinite(x) || !isFinite(y)) {
                    return null;
                }
                return _GeoCoordinates2.default.fromValues(x, y);
            }
            if (bear2 == 0.0) {
                if (bear1 == 0.0) {
                    return null;
                }
                x = longitude2;
                y = +m1 * (x - longitude1) + latitude1;
                if (!isFinite(x) || !isFinite(y)) {
                    return null;
                }
                return _GeoCoordinates2.default.fromValues(x, y);
            }
            if (isNaN(m1) || !isFinite(m1) || isNaN(m2) || !isFinite(m2)) {
                return null;
            }
            if (m1 == m2) {
                return null;
            }
            x = (m1 * longitude1 - m2 * longitude2 + latitude2 - latitude1) / (m1 - m2);
            y = latitude1 + m1 * (x - longitude1);
            if (!isFinite(x) || !isFinite(y)) {
                return null;
            }
            return new _GeoCoordinates2.default.fromValues(x, y);
        }
    }, {
        key: 'lineIntersection',
        value: function lineIntersection(gc1Start, gc1End, gc2Start, gc2End) {
            var line1 = new _Line2.default(gc1Start.getLongitudeDeg(), gc1Start.getLatitudeDeg(), gc1End.getLongitudeDeg(), gc1End.getLatitudeDeg());
            var line2 = new _Line2.default(gc2Start.getLongitudeDeg(), gc2Start.getLatitudeDeg(), gc2End.getLongitudeDeg(), gc2End.getLatitudeDeg());
            return line1.intersectsLineObject(line2);
        }
    }, {
        key: 'geoCoordinatesPointAlongLine',
        value: function geoCoordinatesPointAlongLine(coord1, coord2, offset) {
            return GeometryUtils.latitudeLongitudePointAlongLine(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), offset);
        }
    }, {
        key: 'latitudeLongitudePointAlongLine',
        value: function latitudeLongitudePointAlongLine(longitudeA, latitudeA, longitudeB, latitudeB, offset) {
            var deltaX = Math.abs(longitudeB - longitudeA);
            var deltaY = latitudeB - latitudeA;
            if (longitudeA > longitudeB) {
                deltaX = -deltaX;
            }
            if (latitudeA < latitudeB) {
                if (deltaY < 0) {
                    deltaY = -deltaY;
                }
            } else {
                if (deltaY > 0) {
                    deltaY = -deltaY;
                }
            }
            deltaX *= offset;
            deltaY *= offset;
            var lon = longitudeA + deltaX;
            var lat = latitudeA + deltaY;
            return _GeoCoordinates2.default.fromValues(lon, lat);
        }
    }, {
        key: 'geoCoordinatesScaleUpperRightCoordinate',
        value: function geoCoordinatesScaleUpperRightCoordinate(lowerLeft, upperRight, xFactor, yFactor) {
            return GeometryUtils.scaleUpperRightCoordinate(lowerLeft.getLongitudeDeg(), lowerLeft.getLatitudeDeg(), upperRight.getLongitudeDeg(), upperRight.getLatitudeDeg(), xFactor, yFactor);
        }
    }, {
        key: 'latitudeLongitudeScaleUpperRightCoordinate',
        value: function latitudeLongitudeScaleUpperRightCoordinate(lowerLeftLon, lowerLeftLat, upperRightLon, upperRightLat, xFactor, yFactor) {
            var newBottomRight = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, upperRightLon, lowerLeftLat, xFactor);
            var newTopLeft = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, lowerLeftLon, upperRightLat, yFactor);
            return _GeoCoordinates2.default.fromValues(newBottomRight.getLongitudeDeg(), newTopLeft.getLatitudeDeg());
        }
    }, {
        key: 'roundDefault',
        value: function roundDefault(val) {
            return GeometryUtils.roundDecimalPlaces(val, GeometryUtils._DEFAULT_PRECISION);
        }
    }, {
        key: 'roundDecimalPlaces',
        value: function roundDecimalPlaces(val, decimalPlaces) {
            return Math.round(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
        }
    }, {
        key: 'geoCoordinatesDetermineCoordinateInDistance',
        value: function geoCoordinatesDetermineCoordinateInDistance(coord, angle, distanceKm) {
            return GeometryUtils.latitudeLongitudeDetermineCoordinateInDistance(coord.getLongitudeDeg(), coord.getLatitudeDeg(), angle, distanceKm);
        }
    }, {
        key: 'latitudeLongitudeDetermineCoordinateInDistance',
        value: function latitudeLongitudeDetermineCoordinateInDistance(lon, lat, angle, distanceKm) {
            var lat1 = lat * Math.PI / HALF_CIRCLE;
            var az12 = angle * Math.PI / HALF_CIRCLE;
            var sinu1 = Math.sin(lat1);
            var cosu1 = Math.cos(lat1);
            var az12cos = Math.cos(az12);
            var az12sin = Math.sin(az12);
            var sina = cosu1 * az12sin;
            var ss = Math.sin(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
            var cs = Math.cos(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
            var g = sinu1 * ss - cosu1 * cs * az12cos;
            var lat2 = Math.atan((sinu1 * cs + cosu1 * ss * az12cos) / Math.sqrt(sina * sina + g * g)) * GeometryUtils.HALF_CIRCLE / Math.PI;
            var lon2 = lon + Math.atan(ss * az12sin / (cosu1 * cs - sinu1 * ss * az12cos)) * GeometryUtils.HALF_CIRCLE / Math.PI + 2 * GeometryUtils.FULL_CIRCLE_DEGREE;
            while (lat2 > GeometryUtils.QUARTER_CIRCLE) {
                lat2 = lat2 - GeometryUtils.FULL_CIRCLE_DEGREE;
            }
            while (lon2 > GeometryUtils.HALF_CIRCLE) {
                lon2 = lon2 - GeometryUtils.FULL_CIRCLE_DEGREE;
            }
            return _GeoCoordinates2.default.fromValues(lon2, lat2);
        }
    }, {
        key: 'toDegrees',
        value: function toDegrees(radians) {
            return radians * (180 / Math.PI);
        }
    }, {
        key: 'toRadians',
        value: function toRadians(degrees) {
            return degrees * (Math.PI / 180);
        }
    }]);

    return GeometryUtils;
}();

GeometryUtils.MAX_LAT = 90;
GeometryUtils.MIN_LAT = -90;
GeometryUtils.MAX_LON = 180;
GeometryUtils.MIN_LON = -180;
GeometryUtils.ZERO_CIRCLE = 0;
GeometryUtils.HALF_CIRCLE = 180;
GeometryUtils.QUARTER_CIRCLE = 90;
GeometryUtils.THREE_QUARTER_CIRCLE = 270;
GeometryUtils._DEFAULT_PRECISION = 5;
GeometryUtils._METER_PER_KILOMETER = 1000.0;
GeometryUtils.BearingDirection = {
    IN_DIRECTION: IN_DIRECTION,
    AGAINST_DIRECTION: AGAINST_DIRECTION
};
GeometryUtils._DIVISIONS_PER_DEGREE = 100000;
GeometryUtils.FULL_CIRCLE_DEGREE = 360;
GeometryUtils._RAD_FACTOR = 0.017453292519943294;
GeometryUtils._EQUATORIAL_RADIUS = 6378137;
GeometryUtils._INVERSE_FLATTENING = 298.257223563;
GeometryUtils._OBLATENESS = 1 / GeometryUtils._INVERSE_FLATTENING;
exports.default = GeometryUtils;