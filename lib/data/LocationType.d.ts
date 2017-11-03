export declare enum LocationType {
    UNKNOWN = 0,
    LINE_LOCATION = 1,
    GEO_COORDINATES = 2,
    POINT_ALONG_LINE = 3,
    POI_WITH_ACCESS_POINT = 4,
    CIRCLE = 5,
    POLYGON = 6,
    CLOSED_LINE = 7,
    RECTANGLE = 8,
    GRID = 9,
}
export declare const AREA_LOCATIONS: Set<LocationType>;
export declare const POINTS_LOCATIONS: Set<LocationType>;
export default LocationType;
