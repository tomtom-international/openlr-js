"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocationType;
(function (LocationType) {
    LocationType[LocationType["UNKNOWN"] = 0] = "UNKNOWN";
    LocationType[LocationType["LINE_LOCATION"] = 1] = "LINE_LOCATION";
    LocationType[LocationType["GEO_COORDINATES"] = 2] = "GEO_COORDINATES";
    LocationType[LocationType["POINT_ALONG_LINE"] = 3] = "POINT_ALONG_LINE";
    LocationType[LocationType["POI_WITH_ACCESS_POINT"] = 4] = "POI_WITH_ACCESS_POINT";
    LocationType[LocationType["CIRCLE"] = 5] = "CIRCLE";
    LocationType[LocationType["POLYGON"] = 6] = "POLYGON";
    LocationType[LocationType["CLOSED_LINE"] = 7] = "CLOSED_LINE";
    LocationType[LocationType["RECTANGLE"] = 8] = "RECTANGLE";
    LocationType[LocationType["GRID"] = 9] = "GRID";
})(LocationType = exports.LocationType || (exports.LocationType = {}));
exports.AREA_LOCATIONS = new Set([LocationType.CIRCLE, LocationType.POLYGON, LocationType.CLOSED_LINE, LocationType.RECTANGLE, LocationType.GRID]);
exports.POINTS_LOCATIONS = new Set([LocationType.GEO_COORDINATES, LocationType.POINT_ALONG_LINE, LocationType.POI_WITH_ACCESS_POINT]);
exports.default = LocationType;
//# sourceMappingURL=LocationType.js.map