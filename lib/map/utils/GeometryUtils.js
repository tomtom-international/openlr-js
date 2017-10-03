'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GeoCoordinates = require('../GeoCoordinates');

var _GeoCoordinates2 = _interopRequireDefault(_GeoCoordinates);

var _Line = require('../../geometry/Line');

var _Line2 = _interopRequireDefault(_Line);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const IN_DIRECTION = 1;
const AGAINST_DIRECTION = 2;

class GeometryUtils {

    /** The default precision for rounding coordinate values. */


    /** The Constant QUARTER_CIRCLE. */


    /** The Constant ZERO_CIRCLE. */


    /** The Constant MAX_LON. */

    /** The Constant MAX_LAT. */
    constructor() {
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


    static _toRadians(value) {
        return value * GeometryUtils._RAD_FACTOR;
    }

    static geoCoordinatesDistance(coord1, coord2) {
        return GeometryUtils.latitudeLongitudeDistance(coord1.longitudeDeg, coord1.latitudeDeg, coord2.longitudeDeg, coord2.latitudeDeg);
    }

    static latitudeLongitudeDistance(longitude1, latitude1, longitude2, latitude2) {
        if (latitude2 === latitude1 && longitude2 === longitude1) {
            return 0.0;
        }
        const f = GeometryUtils._toRadians((latitude2 + latitude1) / 2.0);
        const g = GeometryUtils._toRadians((latitude2 - latitude1) / 2.0);
        const l = GeometryUtils._toRadians((longitude2 - longitude1) / 2.0);

        const sinF = Math.sin(f);
        const sinG = Math.sin(g);
        const cosF = Math.cos(f);
        const cosG = Math.cos(g);
        const sinl = Math.sin(l);
        const cosl = Math.cos(l);
        const s = sinG * sinG * cosl * cosl + cosF * cosF * sinl * sinl;
        if (s === 0) {
            return 0.0;
        }
        const c = cosG * cosG * cosl * cosl + sinF * sinF * sinl * sinl;
        if (c === 0) {
            return 0.0;
        }
        const w = Math.atan(Math.sqrt(s / c));
        if (w === 0) {
            return 0.0;
        }
        const d = 2 * w * GeometryUtils._EQUATORIAL_RADIUS;
        const r = Math.sqrt(s * c) / w;
        const h1 = (3 * r - 1.0) / (2 * c);
        const h2 = (3 * r + 1.0) / (2 * s);

        return d * (1 + GeometryUtils._OBLATENESS * h1 * sinF * sinF * cosG * cosG - GeometryUtils._OBLATENESS * h2 * cosF * cosF * sinG * sinG);
    }

    static _transformDecaMicroDeg(val) {
        return val * GeometryUtils._DIVISIONS_PER_DEGREE;
    }

    static geoCoordinatesBearing(coord1, coord2) {
        return GeometryUtils.latitudeLongitudeBearing(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
    }

    static latitudeLongitudeBearing(p1Longitude, p1Latitude, p2Longitude, p2Latitude) {
        const deltaX = GeometryUtils._transformDecaMicroDeg(p2Longitude - p1Longitude) * GeometryUtils._hMult(p2Latitude);
        const deltaY = GeometryUtils._transformDecaMicroDeg(p2Latitude - p1Latitude);
        let angle = GeometryUtils.toDegrees(Math.atan2(deltaX, deltaY));
        if (angle < 0) {
            angle += GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return angle;
    }

    static _hMult(y) {
        return Math.cos(y * GeometryUtils._RAD_FACTOR);
    }

    static calculateLineBearing(line, dir, pointDistance, projectionAlongLine) {
        if (line === null) {
            return -1.0;
        }
        let p1 = null;
        let p2 = null;

        if (dir === GeometryUtils.BearingDirection.IN_DIRECTION) {
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

    static checkCoordinateBounds(lon, lat) {
        return lon >= GeometryUtils.MIN_LON && lon <= GeometryUtils.MAX_LON && lat >= GeometryUtils.MIN_LAT && lat <= GeometryUtils.MAX_LAT;
    }

    static geoCoordinatesIntersectStraights(coord1, bear1, coord2, bear2) {
        return GeometryUtils.latitudeLongitudeIntersectStraights(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), bear1, coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), bear2);
    }

    static latitudeLongitudeIntersectStraights(longitude1, latitude1, bear1, longitude2, latitude2, bear2) {
        const m1 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear1));
        const m2 = Math.tan(GeometryUtils.toRadians(GeometryUtils.QUARTER_CIRCLE - bear2));
        let x;
        let y;
        if (bear1 === 0.0) {
            if (bear2 === 0.0) {
                return null;
            }
            x = longitude1;
            y = +m2 * (x - longitude2) + latitude2;
            if (!isFinite(x) || !isFinite(y)) {
                return null;
            }
            return _GeoCoordinates2.default.fromValues(x, y);
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
            return _GeoCoordinates2.default.fromValues(x, y);
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
        return new _GeoCoordinates2.default.fromValues(x, y);
    }

    static lineIntersection(gc1Start, gc1End, gc2Start, gc2End) {
        const line1 = new _Line2.default(gc1Start.getLongitudeDeg(), gc1Start.getLatitudeDeg(), gc1End.getLongitudeDeg(), gc1End.getLatitudeDeg());
        const line2 = new _Line2.default(gc2Start.getLongitudeDeg(), gc2Start.getLatitudeDeg(), gc2End.getLongitudeDeg(), gc2End.getLatitudeDeg());
        return line1.intersectsLineObject(line2);
    }

    static geoCoordinatesPointAlongLine(coord1, coord2, offset) {
        return GeometryUtils.latitudeLongitudePointAlongLine(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), offset);
    }

    static latitudeLongitudePointAlongLine(longitudeA, latitudeA, longitudeB, latitudeB, offset) {
        let deltaX = Math.abs(longitudeB - longitudeA);
        let deltaY = latitudeB - latitudeA;
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
        const lon = longitudeA + deltaX;
        const lat = latitudeA + deltaY;
        return _GeoCoordinates2.default.fromValues(lon, lat);
    }

    static geoCoordinatesScaleUpperRightCoordinate(lowerLeft, upperRight, xFactor, yFactor) {
        return GeometryUtils.scaleUpperRightCoordinate(lowerLeft.getLongitudeDeg(), lowerLeft.getLatitudeDeg(), upperRight.getLongitudeDeg(), upperRight.getLatitudeDeg(), xFactor, yFactor);
    }

    static latitudeLongitudeScaleUpperRightCoordinate(lowerLeftLon, lowerLeftLat, upperRightLon, upperRightLat, xFactor, yFactor) {
        const newBottomRight = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, upperRightLon, lowerLeftLat, xFactor);
        const newTopLeft = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, lowerLeftLon, upperRightLat, yFactor);
        return _GeoCoordinates2.default.fromValues(newBottomRight.getLongitudeDeg(), newTopLeft.getLatitudeDeg());
    }

    static roundDefault(val) {
        return GeometryUtils.roundDecimalPlaces(val, GeometryUtils._DEFAULT_PRECISION);
    }

    static roundDecimalPlaces(val, decimalPlaces) {
        return Math.round(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    }

    static geoCoordinatesDetermineCoordinateInDistance(coord, angle, distanceKm) {
        return GeometryUtils.latitudeLongitudeDetermineCoordinateInDistance(coord.getLongitudeDeg(), coord.getLatitudeDeg(), angle, distanceKm);
    }

    static latitudeLongitudeDetermineCoordinateInDistance(lon, lat, angle, distanceKm) {
        const lat1 = lat * Math.PI / HALF_CIRCLE;
        const az12 = angle * Math.PI / HALF_CIRCLE;
        const sinu1 = Math.sin(lat1);
        const cosu1 = Math.cos(lat1);
        const az12cos = Math.cos(az12);
        const az12sin = Math.sin(az12);
        const sina = cosu1 * az12sin;
        const ss = Math.sin(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        const cs = Math.cos(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        const g = sinu1 * ss - cosu1 * cs * az12cos;
        let lat2 = Math.atan((sinu1 * cs + cosu1 * ss * az12cos) / Math.sqrt(sina * sina + g * g)) * GeometryUtils.HALF_CIRCLE / Math.PI;
        let lon2 = lon + Math.atan(ss * az12sin / (cosu1 * cs - sinu1 * ss * az12cos)) * GeometryUtils.HALF_CIRCLE / Math.PI + 2 * GeometryUtils.FULL_CIRCLE_DEGREE;
        while (lat2 > GeometryUtils.QUARTER_CIRCLE) {
            lat2 = lat2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        while (lon2 > GeometryUtils.HALF_CIRCLE) {
            lon2 = lon2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return _GeoCoordinates2.default.fromValues(lon2, lat2);
    }

    static toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}
exports.default = GeometryUtils;
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
    IN_DIRECTION,
    AGAINST_DIRECTION
};
GeometryUtils._DIVISIONS_PER_DEGREE = 100000;
GeometryUtils.FULL_CIRCLE_DEGREE = 360;
GeometryUtils._RAD_FACTOR = 0.017453292519943294;
GeometryUtils._EQUATORIAL_RADIUS = 6378137;
GeometryUtils._INVERSE_FLATTENING = 298.257223563;
GeometryUtils._OBLATENESS = 1 / GeometryUtils._INVERSE_FLATTENING;