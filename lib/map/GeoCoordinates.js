"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeometryUtils_1 = require("./utils/GeometryUtils");
class GeoCoordinates {
    static fromValues(longitude, latitude) {
        if (!GeometryUtils_1.default.checkCoordinateBounds(longitude, latitude)) {
            throw new Error('Coordinates out of bounds');
        }
        const geoCoordinates = new GeoCoordinates();
        geoCoordinates._longitude = longitude;
        geoCoordinates._latitude = latitude;
        return geoCoordinates;
    }
    getLatitudeDeg() {
        return this._latitude;
    }
    getLongitudeDeg() {
        return this._longitude;
    }
}
exports.default = GeoCoordinates;
;
//# sourceMappingURL=GeoCoordinates.js.map