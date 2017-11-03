import GeoCoordinates from '../GeoCoordinates';
import MapLine from '../../map/Line';
export declare enum BearingDirection {
    IN_DIRECTION = 1,
    AGAINST_DIRECTION = 2,
}
export default class GeometryUtils {
    static MAX_LAT: number;
    static MIN_LAT: number;
    static MAX_LON: number;
    static MIN_LON: number;
    static ZERO_CIRCLE: number;
    static HALF_CIRCLE: number;
    static QUARTER_CIRCLE: number;
    static THREE_QUARTER_CIRCLE: number;
    protected static _DEFAULT_PRECISION: number;
    protected static _METER_PER_KILOMETER: number;
    private constructor();
    static bearingDirection: {
        IN_DIRECTION: BearingDirection;
        AGAINST_DIRECTION: BearingDirection;
    };
    protected static _DIVISIONS_PER_DEGREE: number;
    static FULL_CIRCLE_DEGREE: number;
    protected static _RAD_FACTOR: number;
    protected static _EQUATORIAL_RADIUS: number;
    protected static _INVERSE_FLATTENING: number;
    protected static _OBLATENESS: number;
    protected static _toRadians(value: number): number;
    static geoCoordinatesDistance(coord1: GeoCoordinates, coord2: GeoCoordinates): number;
    static latitudeLongitudeDistance(longitude1: number, latitude1: number, longitude2: number, latitude2: number): number;
    protected static _transformDecaMicroDeg(val: number): number;
    static geoCoordinatesBearing(coord1: GeoCoordinates, coord2: GeoCoordinates): number;
    static latitudeLongitudeBearing(p1Longitude: number, p1Latitude: number, p2Longitude: number, p2Latitude: number): number;
    protected static _hMult(y: number): number;
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
}
