"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RawPointLocationReference_1 = require("./RawPointLocationReference");
const LocationType_1 = require("../LocationType");
class RawGeoCoordLocationReference extends RawPointLocationReference_1.default {
    static fromGeoCoordValues(id, geoCoord) {
        const rawGeoCoordLocationReference = new RawGeoCoordLocationReference();
        rawGeoCoordLocationReference._id = id;
        rawGeoCoordLocationReference._locationType = LocationType_1.default.GEO_COORDINATES;
        rawGeoCoordLocationReference._returnCode = null;
        rawGeoCoordLocationReference._geoCoord = geoCoord;
        return rawGeoCoordLocationReference;
    }
    getGeoCoordinates() {
        return this._geoCoord;
    }
}
exports.default = RawGeoCoordLocationReference;
;
//# sourceMappingURL=RawGeoCoordLocationReference.js.map