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
var GeoCoordinates_1 = require("../GeoCoordinates");
var Line_1 = require("../../geometry/Line");
var BearingDirection;
(function (BearingDirection) {
    BearingDirection[BearingDirection["IN_DIRECTION"] = 1] = "IN_DIRECTION";
    BearingDirection[BearingDirection["AGAINST_DIRECTION"] = 2] = "AGAINST_DIRECTION";
})(BearingDirection = exports.BearingDirection || (exports.BearingDirection = {}));
var GeometryUtils = /** @class */ (function () {
    function GeometryUtils() {
        throw new Error('Cannot instantiate utility class');
    }
    GeometryUtils.geoCoordinatesDistance = function (coord1, coord2) {
        return GeometryUtils.latitudeLongitudeDistance(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
    };
    GeometryUtils.latitudeLongitudeDistance = function (longitude1, latitude1, longitude2, latitude2) {
        if (latitude2 === latitude1 && longitude2 === longitude1) {
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
        if (s === 0) {
            return 0.0;
        }
        var c = cosG * cosG * cosl * cosl + sinF * sinF * sinl * sinl;
        if (c === 0) {
            return 0.0;
        }
        var w = Math.atan(Math.sqrt(s / c));
        if (w === 0) {
            return 0.0;
        }
        var d = 2 * w * GeometryUtils._EQUATORIAL_RADIUS;
        var r = Math.sqrt(s * c) / w;
        var h1 = (3 * r - 1.0) / (2 * c);
        var h2 = (3 * r + 1.0) / (2 * s);
        return d * (1 + GeometryUtils._OBLATENESS * h1 * sinF * sinF * cosG * cosG - GeometryUtils._OBLATENESS * h2 * cosF * cosF * sinG * sinG);
    };
    GeometryUtils.geoCoordinatesBearing = function (coord1, coord2) {
        return GeometryUtils.latitudeLongitudeBearing(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
    };
    GeometryUtils.latitudeLongitudeBearing = function (p1Longitude, p1Latitude, p2Longitude, p2Latitude) {
        var deltaX = (GeometryUtils._transformDecaMicroDeg(p2Longitude - p1Longitude)) * GeometryUtils._hMult(p2Latitude);
        var deltaY = GeometryUtils._transformDecaMicroDeg(p2Latitude - p1Latitude);
        var angle = GeometryUtils.toDegrees(Math.atan2(deltaX, deltaY));
        if (angle < 0) {
            angle += GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return angle;
    };
    GeometryUtils.calculateLineBearing = function (line, dir, pointDistance, projectionAlongLine) {
        if (line === null) {
            return -1.0;
        }
        var p1 = null;
        var p2 = null;
        if (dir === BearingDirection.IN_DIRECTION) {
            if (projectionAlongLine > 0) {
                p1 = line.getGeoCoordinateAlongLine(projectionAlongLine);
                if (line.getLineLength() < projectionAlongLine + pointDistance) {
                    p2 = line.getEndNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(projectionAlongLine + pointDistance);
                }
            }
            else {
                p1 = line.getStartNode().getGeoCoordinates();
                if (line.getLineLength() < pointDistance) {
                    p2 = line.getEndNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(pointDistance);
                }
            }
        }
        else {
            if (projectionAlongLine > 0) {
                p1 = line.getGeoCoordinateAlongLine(projectionAlongLine);
                if (projectionAlongLine < pointDistance) {
                    p2 = line.getStartNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(projectionAlongLine - pointDistance);
                }
            }
            else {
                p1 = line.getEndNode().getGeoCoordinates();
                if (line.getLineLength() < pointDistance) {
                    p2 = line.getStartNode().getGeoCoordinates();
                }
                else {
                    p2 = line.getGeoCoordinateAlongLine(line.getLineLength() - pointDistance);
                }
            }
        }
        return GeometryUtils.geoCoordinatesBearing(p1, p2);
    };
    GeometryUtils.checkCoordinateBounds = function (lon, lat) {
        return (lon >= GeometryUtils.MIN_LON && lon <= GeometryUtils.MAX_LON && lat >= GeometryUtils.MIN_LAT && lat <= GeometryUtils.MAX_LAT);
    };
    GeometryUtils.geoCoordinatesIntersectStraights = function (coord1, bear1, coord2, bear2) {
        return GeometryUtils.latitudeLongitudeIntersectStraights(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), bear1, coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), bear2);
    };
    GeometryUtils.latitudeLongitudeIntersectStraights = function (longitude1, latitude1, bear1, longitude2, latitude2, bear2) {
        var m1 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear1));
        var m2 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear2));
        var x;
        var y;
        if (bear1 === 0.0) {
            if (bear2 === 0.0) {
                return null;
            }
            x = longitude1;
            y = +m2 * (x - longitude2) + latitude2;
            if (!isFinite(x) || !isFinite(y)) {
                return null;
            }
            return GeoCoordinates_1.GeoCoordinates.fromValues(x, y);
        }
        if (bear2 === 0.0) {
            if (bear1 === 0.0) {
                return null;
            }
            x = longitude2;
            y = +m1 * (x - longitude1) + latitude1;
            if (!isFinite(x) || !isFinite(y)) {
                return null;
            }
            return GeoCoordinates_1.GeoCoordinates.fromValues(x, y);
        }
        if (isNaN(m1) || !isFinite(m1) || isNaN(m2) || !isFinite(m2)) {
            return null;
        }
        if (m1 === m2) {
            return null;
        }
        x = (m1 * longitude1 - m2 * longitude2 + latitude2 - latitude1) / (m1 - m2);
        y = latitude1 + m1 * (x - longitude1);
        if (!isFinite(x) || !isFinite(y)) {
            return null;
        }
        return GeoCoordinates_1.GeoCoordinates.fromValues(x, y);
    };
    GeometryUtils.lineIntersection = function (gc1Start, gc1End, gc2Start, gc2End) {
        var line1 = Line_1.Line.fromValues(gc1Start.getLongitudeDeg(), gc1Start.getLatitudeDeg(), gc1End.getLongitudeDeg(), gc1End.getLatitudeDeg());
        var line2 = Line_1.Line.fromValues(gc2Start.getLongitudeDeg(), gc2Start.getLatitudeDeg(), gc2End.getLongitudeDeg(), gc2End.getLatitudeDeg());
        return line1.intersectsLineObject(line2);
    };
    GeometryUtils.geoCoordinatesPointAlongLine = function (coord1, coord2, offset) {
        return GeometryUtils.latitudeLongitudePointAlongLine(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), offset);
    };
    GeometryUtils.latitudeLongitudePointAlongLine = function (longitudeA, latitudeA, longitudeB, latitudeB, offset) {
        var deltaX = Math.abs(longitudeB - longitudeA);
        var deltaY = latitudeB - latitudeA;
        if ((longitudeA > longitudeB)) {
            deltaX = -deltaX;
        }
        if (latitudeA < latitudeB) {
            if (deltaY < 0) {
                deltaY = -deltaY;
            }
        }
        else {
            if (deltaY > 0) {
                deltaY = -deltaY;
            }
        }
        deltaX *= offset;
        deltaY *= offset;
        var lon = longitudeA + deltaX;
        var lat = latitudeA + deltaY;
        return GeoCoordinates_1.GeoCoordinates.fromValues(lon, lat);
    };
    GeometryUtils.geoCoordinatesScaleUpperRightCoordinate = function (lowerLeft, upperRight, xFactor, yFactor) {
        return GeometryUtils.latitudeLongitudeScaleUpperRightCoordinate(lowerLeft.getLongitudeDeg(), lowerLeft.getLatitudeDeg(), upperRight.getLongitudeDeg(), upperRight.getLatitudeDeg(), xFactor, yFactor);
    };
    GeometryUtils.latitudeLongitudeScaleUpperRightCoordinate = function (lowerLeftLon, lowerLeftLat, upperRightLon, upperRightLat, xFactor, yFactor) {
        var newBottomRight = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, upperRightLon, lowerLeftLat, xFactor);
        var newTopLeft = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, lowerLeftLon, upperRightLat, yFactor);
        return GeoCoordinates_1.GeoCoordinates.fromValues(newBottomRight.getLongitudeDeg(), newTopLeft.getLatitudeDeg());
    };
    GeometryUtils.roundDefault = function (val) {
        return GeometryUtils.roundDecimalPlaces(val, GeometryUtils._DEFAULT_PRECISION);
    };
    GeometryUtils.roundDecimalPlaces = function (val, decimalPlaces) {
        return Math.round(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    };
    GeometryUtils.geoCoordinatesDetermineCoordinateInDistance = function (coord, angle, distanceKm) {
        return GeometryUtils.latitudeLongitudeDetermineCoordinateInDistance(coord.getLongitudeDeg(), coord.getLatitudeDeg(), angle, distanceKm);
    };
    GeometryUtils.latitudeLongitudeDetermineCoordinateInDistance = function (lon, lat, angle, distanceKm) {
        var lat1 = lat * Math.PI / GeometryUtils.HALF_CIRCLE;
        var az12 = angle * Math.PI / GeometryUtils.HALF_CIRCLE;
        var sinu1 = Math.sin(lat1);
        var cosu1 = Math.cos(lat1);
        var az12cos = Math.cos(az12);
        var az12sin = Math.sin(az12);
        var sina = cosu1 * az12sin;
        var ss = Math.sin(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        var cs = Math.cos(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        var g = sinu1 * ss - cosu1 * cs * az12cos;
        var lat2 = Math.atan(((sinu1 * cs + cosu1 * ss * az12cos) / (Math.sqrt(sina * sina + g * g)))) * GeometryUtils.HALF_CIRCLE / Math.PI;
        var lon2 = lon + Math.atan(ss * az12sin / (cosu1 * cs - sinu1 * ss * az12cos)) * GeometryUtils.HALF_CIRCLE / Math.PI + (2 * GeometryUtils.FULL_CIRCLE_DEGREE);
        while (lat2 > GeometryUtils.QUARTER_CIRCLE) {
            lat2 = lat2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        while (lon2 > GeometryUtils.HALF_CIRCLE) {
            lon2 = lon2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return GeoCoordinates_1.GeoCoordinates.fromValues(lon2, lat2);
    };
    GeometryUtils.toDegrees = function (radians) {
        return radians * (180 / Math.PI);
    };
    GeometryUtils.toRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    GeometryUtils._toRadians = function (value) {
        return value * GeometryUtils._RAD_FACTOR;
    };
    GeometryUtils._transformDecaMicroDeg = function (val) {
        return val * GeometryUtils._DIVISIONS_PER_DEGREE;
    };
    GeometryUtils._hMult = function (y) {
        return Math.cos(y * GeometryUtils._RAD_FACTOR);
    };
    GeometryUtils.bearingDirection = {
        IN_DIRECTION: BearingDirection.IN_DIRECTION,
        AGAINST_DIRECTION: BearingDirection.AGAINST_DIRECTION
    };
    /** Degree in a full circle */
    GeometryUtils.FULL_CIRCLE_DEGREE = 360;
    /** The Constant MAX_LAT. */
    GeometryUtils.MAX_LAT = 90;
    /** The Constant MIN_LAT. */
    GeometryUtils.MIN_LAT = -90;
    /** The Constant MAX_LON. */
    GeometryUtils.MAX_LON = 180;
    /** The Constant MIN_LON. */
    GeometryUtils.MIN_LON = -180;
    /** The Constant ZERO_CIRCLE. */
    GeometryUtils.ZERO_CIRCLE = 0;
    /** The Constant HALF_CIRCLE. */
    GeometryUtils.HALF_CIRCLE = 180;
    /** The Constant QUARTER_CIRCLE. */
    GeometryUtils.QUARTER_CIRCLE = 90;
    /** The Constant QUARTER_CIRCLE. */
    GeometryUtils.THREE_QUARTER_CIRCLE = 270;
    /** The default precision for rounding coordinate values. */
    GeometryUtils._DEFAULT_PRECISION = 5;
    /** The Constant METER_PER_KILOMETER. */
    GeometryUtils._METER_PER_KILOMETER = 1000.0;
    /** The Constant divisionsPerDegree. */
    GeometryUtils._DIVISIONS_PER_DEGREE = 100000; // 1000 * 100;
    /** = DIVISIONS_PER_DEGREE / DIVISIONS_PER_RADIAN */
    GeometryUtils._RAD_FACTOR = 0.017453292519943294;
    /** The equatorial radius in meters */
    GeometryUtils._EQUATORIAL_RADIUS = 6378137; // meter
    /** The Constant INVERSE_FLATTENING. */
    GeometryUtils._INVERSE_FLATTENING = 298.257223563;
    /** The Constant OBLATENESS. */
    GeometryUtils._OBLATENESS = 1 / GeometryUtils._INVERSE_FLATTENING;
    return GeometryUtils;
}());
exports.GeometryUtils = GeometryUtils;
//# sourceMappingURL=GeometryUtils.js.map