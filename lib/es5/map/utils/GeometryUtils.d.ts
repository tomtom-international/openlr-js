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
import { GeoCoordinates } from '../GeoCoordinates';
import { Line as MapLine } from '../../map/Line';
export declare enum BearingDirection {
    IN_DIRECTION = 1,
    AGAINST_DIRECTION = 2
}
export declare class GeometryUtils {
    static bearingDirection: {
        IN_DIRECTION: BearingDirection;
        AGAINST_DIRECTION: BearingDirection;
    };
    /** Degree in a full circle */
    static FULL_CIRCLE_DEGREE: number;
    /** The Constant MAX_LAT. */
    static MAX_LAT: number;
    /** The Constant MIN_LAT. */
    static MIN_LAT: number;
    /** The Constant MAX_LON. */
    static MAX_LON: number;
    /** The Constant MIN_LON. */
    static MIN_LON: number;
    /** The Constant ZERO_CIRCLE. */
    static ZERO_CIRCLE: number;
    /** The Constant HALF_CIRCLE. */
    static HALF_CIRCLE: number;
    /** The Constant QUARTER_CIRCLE. */
    static QUARTER_CIRCLE: number;
    /** The Constant QUARTER_CIRCLE. */
    static THREE_QUARTER_CIRCLE: number;
    /** The default precision for rounding coordinate values. */
    protected static _DEFAULT_PRECISION: number;
    /** The Constant METER_PER_KILOMETER. */
    protected static _METER_PER_KILOMETER: number;
    /** The Constant divisionsPerDegree. */
    protected static _DIVISIONS_PER_DEGREE: number;
    /** = DIVISIONS_PER_DEGREE / DIVISIONS_PER_RADIAN */
    protected static _RAD_FACTOR: number;
    /** The equatorial radius in meters */
    protected static _EQUATORIAL_RADIUS: number;
    /** The Constant INVERSE_FLATTENING. */
    protected static _INVERSE_FLATTENING: number;
    /** The Constant OBLATENESS. */
    protected static _OBLATENESS: number;
    private constructor();
    static geoCoordinatesDistance(coord1: GeoCoordinates, coord2: GeoCoordinates): number;
    static latitudeLongitudeDistance(longitude1: number, latitude1: number, longitude2: number, latitude2: number): number;
    static geoCoordinatesBearing(coord1: GeoCoordinates, coord2: GeoCoordinates): number;
    static latitudeLongitudeBearing(p1Longitude: number, p1Latitude: number, p2Longitude: number, p2Latitude: number): number;
    static calculateLineBearing(line: MapLine, dir: BearingDirection, pointDistance: number, projectionAlongLine: number): number;
    static checkCoordinateBounds(lon: number, lat: number): boolean;
    static geoCoordinatesIntersectStraights(coord1: GeoCoordinates, bear1: number, coord2: GeoCoordinates, bear2: number): GeoCoordinates | null;
    static latitudeLongitudeIntersectStraights(longitude1: number, latitude1: number, bear1: number, longitude2: number, latitude2: number, bear2: number): GeoCoordinates | null;
    static lineIntersection(gc1Start: GeoCoordinates, gc1End: GeoCoordinates, gc2Start: GeoCoordinates, gc2End: GeoCoordinates): boolean;
    static geoCoordinatesPointAlongLine(coord1: GeoCoordinates, coord2: GeoCoordinates, offset: number): GeoCoordinates;
    static latitudeLongitudePointAlongLine(longitudeA: number, latitudeA: number, longitudeB: number, latitudeB: number, offset: number): GeoCoordinates;
    static geoCoordinatesScaleUpperRightCoordinate(lowerLeft: GeoCoordinates, upperRight: GeoCoordinates, xFactor: number, yFactor: number): GeoCoordinates;
    static latitudeLongitudeScaleUpperRightCoordinate(lowerLeftLon: number, lowerLeftLat: number, upperRightLon: number, upperRightLat: number, xFactor: number, yFactor: number): GeoCoordinates;
    static roundDefault(val: number): number;
    static roundDecimalPlaces(val: number, decimalPlaces: number): number;
    static geoCoordinatesDetermineCoordinateInDistance(coord: GeoCoordinates, angle: number, distanceKm: number): GeoCoordinates;
    static latitudeLongitudeDetermineCoordinateInDistance(lon: number, lat: number, angle: number, distanceKm: number): GeoCoordinates;
    static toDegrees(radians: number): number;
    static toRadians(degrees: number): number;
    protected static _toRadians(value: number): number;
    protected static _transformDecaMicroDeg(val: number): number;
    protected static _hMult(y: number): number;
}
