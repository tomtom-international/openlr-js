/**
 * Copyright 2020 TomTom International B.V
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

import { GeoCoordinates } from '../GeoCoordinates';
import { Line as GeometricLine } from '../../geometry/Line';
import { Line as MapLine } from '../../map/Line';

export enum BearingDirection {
    IN_DIRECTION = 1,
    AGAINST_DIRECTION = 2
}

export class GeometryUtils {
    public static bearingDirection = {
        IN_DIRECTION: BearingDirection.IN_DIRECTION,
        AGAINST_DIRECTION: BearingDirection.AGAINST_DIRECTION
    };

    /** Degree in a full circle */
    public static FULL_CIRCLE_DEGREE = 360;

    /** The Constant ZERO_CIRCLE. */
    public static ZERO_CIRCLE = 0;

    /** The Constant HALF_CIRCLE. */
    public static HALF_CIRCLE = 180;

    /** The Constant QUARTER_CIRCLE. */
    public static QUARTER_CIRCLE = 90;

    /** The Constant QUARTER_CIRCLE. */
    public static THREE_QUARTER_CIRCLE = 270;

    /** The default precision for rounding coordinate values. */
    protected static _DEFAULT_PRECISION = 5;

    /** The Constant METER_PER_KILOMETER. */
    protected static _METER_PER_KILOMETER = 1000.0;

    /** The Constant divisionsPerDegree. */
    protected static _DIVISIONS_PER_DEGREE = 100000; // 1000 * 100;

    /** = DIVISIONS_PER_DEGREE / DIVISIONS_PER_RADIAN */
    protected static _RAD_FACTOR = 0.017453292519943294;

    /** The equatorial radius in meters */
    protected static _EQUATORIAL_RADIUS = 6378137; // meter

    /** The Constant INVERSE_FLATTENING. */
    protected static _INVERSE_FLATTENING = 298.257223563;

    /** The Constant OBLATENESS. */
    protected static _OBLATENESS = 1 / GeometryUtils._INVERSE_FLATTENING;

    private constructor() {
        throw new Error('Cannot instantiate utility class');
    }

    public static geoCoordinatesDistance(coord1: GeoCoordinates, coord2: GeoCoordinates) {
        return GeometryUtils.latitudeLongitudeDistance(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
    }

    public static latitudeLongitudeDistance(longitude1: number, latitude1: number, longitude2: number, latitude2: number) {
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

    public static geoCoordinatesBearing(coord1: GeoCoordinates, coord2: GeoCoordinates) {
        return GeometryUtils.latitudeLongitudeBearing(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg());
    }

    public static latitudeLongitudeBearing(p1Longitude: number, p1Latitude: number, p2Longitude: number, p2Latitude: number) {
        const deltaX = (GeometryUtils._transformDecaMicroDeg(p2Longitude - p1Longitude)) * GeometryUtils._hMult(p2Latitude);
        const deltaY = GeometryUtils._transformDecaMicroDeg(p2Latitude - p1Latitude);
        let angle = GeometryUtils.toDegrees(Math.atan2(deltaX, deltaY));
        if (angle < 0) {
            angle += GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return angle;
    }

    public static calculateLineBearing(line: MapLine, dir: BearingDirection, pointDistance: number, projectionAlongLine: number) {
        if (line === null) {
            return -1.0;
        }
        let p1 = null;
        let p2 = null;

        if (dir === BearingDirection.IN_DIRECTION) {
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
        return GeometryUtils.geoCoordinatesBearing(p1, p2);
    }

    public static geoCoordinatesIntersectStraights(coord1: GeoCoordinates, bear1: number, coord2: GeoCoordinates, bear2: number) {
        return GeometryUtils.latitudeLongitudeIntersectStraights(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), bear1, coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), bear2);
    }

    public static latitudeLongitudeIntersectStraights(longitude1: number, latitude1: number, bear1: number, longitude2: number, latitude2: number, bear2: number) {
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
            return GeoCoordinates.fromValues(x, y);
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
            return GeoCoordinates.fromValues(x, y);
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
        return GeoCoordinates.fromValues(x, y);
    }

    public static lineIntersection(gc1Start: GeoCoordinates, gc1End: GeoCoordinates, gc2Start: GeoCoordinates, gc2End: GeoCoordinates) {
        const line1 = GeometricLine.fromValues(gc1Start.getLongitudeDeg(), gc1Start.getLatitudeDeg(), gc1End.getLongitudeDeg(), gc1End.getLatitudeDeg());
        const line2 = GeometricLine.fromValues(gc2Start.getLongitudeDeg(), gc2Start.getLatitudeDeg(), gc2End.getLongitudeDeg(), gc2End.getLatitudeDeg());
        return line1.intersectsLineObject(line2);
    }

    public static geoCoordinatesPointAlongLine(coord1: GeoCoordinates, coord2: GeoCoordinates, offset: number) {
        return GeometryUtils.latitudeLongitudePointAlongLine(coord1.getLongitudeDeg(), coord1.getLatitudeDeg(), coord2.getLongitudeDeg(), coord2.getLatitudeDeg(), offset);
    }

    public static latitudeLongitudePointAlongLine(longitudeA: number, latitudeA: number, longitudeB: number, latitudeB: number, offset: number) {
        let deltaX = Math.abs(longitudeB - longitudeA);
        let deltaY = latitudeB - latitudeA;
        if ((longitudeA > longitudeB)) {
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
        return GeoCoordinates.fromValues(lon, lat);
    }

    public static geoCoordinatesScaleUpperRightCoordinate(lowerLeft: GeoCoordinates, upperRight: GeoCoordinates, xFactor: number, yFactor: number) {
        return GeometryUtils.latitudeLongitudeScaleUpperRightCoordinate(lowerLeft.getLongitudeDeg(), lowerLeft.getLatitudeDeg(), upperRight.getLongitudeDeg(), upperRight.getLatitudeDeg(), xFactor, yFactor);
    }

    public static latitudeLongitudeScaleUpperRightCoordinate(lowerLeftLon: number, lowerLeftLat: number, upperRightLon: number, upperRightLat: number, xFactor: number, yFactor: number) {
        const newBottomRight = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, upperRightLon, lowerLeftLat, xFactor);
        const newTopLeft = GeometryUtils.latitudeLongitudePointAlongLine(lowerLeftLon, lowerLeftLat, lowerLeftLon, upperRightLat, yFactor);
        return GeoCoordinates.fromValues(newBottomRight.getLongitudeDeg(), newTopLeft.getLatitudeDeg());
    }

    public static roundDefault(val: number) {
        return GeometryUtils.roundDecimalPlaces(val, GeometryUtils._DEFAULT_PRECISION);
    }

    public static roundDecimalPlaces(val: number, decimalPlaces: number) {
        return Math.round(val * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    }

    public static geoCoordinatesDetermineCoordinateInDistance(coord: GeoCoordinates, angle: number, distanceKm: number) {
        return GeometryUtils.latitudeLongitudeDetermineCoordinateInDistance(coord.getLongitudeDeg(), coord.getLatitudeDeg(), angle, distanceKm);
    }

    public static latitudeLongitudeDetermineCoordinateInDistance(lon: number, lat: number, angle: number, distanceKm: number) {
        const lat1 = lat * Math.PI / GeometryUtils.HALF_CIRCLE;
        const az12 = angle * Math.PI / GeometryUtils.HALF_CIRCLE;
        const sinu1 = Math.sin(lat1);
        const cosu1 = Math.cos(lat1);
        const az12cos = Math.cos(az12);
        const az12sin = Math.sin(az12);
        const sina = cosu1 * az12sin;
        const ss = Math.sin(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        const cs = Math.cos(distanceKm / (GeometryUtils._EQUATORIAL_RADIUS / GeometryUtils._METER_PER_KILOMETER));
        const g = sinu1 * ss - cosu1 * cs * az12cos;
        let lat2 = Math.atan(((sinu1 * cs + cosu1 * ss * az12cos) / (Math.sqrt(sina * sina + g * g)))) * GeometryUtils.HALF_CIRCLE / Math.PI;
        let lon2 = lon + Math.atan(ss * az12sin / (cosu1 * cs - sinu1 * ss * az12cos)) * GeometryUtils.HALF_CIRCLE / Math.PI + (2 * GeometryUtils.FULL_CIRCLE_DEGREE);
        while (lat2 > GeometryUtils.QUARTER_CIRCLE) {
            lat2 = lat2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        while (lon2 > GeometryUtils.HALF_CIRCLE) {
            lon2 = lon2 - GeometryUtils.FULL_CIRCLE_DEGREE;
        }
        return GeoCoordinates.fromValues(lon2, lat2);
    }

    public static toDegrees(radians: number) {
        return radians * (180 / Math.PI);
    }

    public static toRadians(degrees: number) {
        return degrees * (Math.PI / 180);
    }

    protected static _toRadians(value: number) {
        return value * GeometryUtils._RAD_FACTOR;
    }

    protected static _transformDecaMicroDeg(val: number) {
        return val * GeometryUtils._DIVISIONS_PER_DEGREE;
    }

    protected static _hMult(y: number) {
        return Math.cos(y * GeometryUtils._RAD_FACTOR);
    }
}
