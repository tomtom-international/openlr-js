"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbsoluteCoordinates_1 = require("../data/AbsoluteCoordinates");
const AbstractDecoder_1 = require("./AbstractDecoder");
const GeoCoordinates_1 = require("../../map/GeoCoordinates");
const RawGeoCoordLocationReference_1 = require("../../data/raw-location-reference/RawGeoCoordLocationReference");
class GeoCoordDecoder extends AbstractDecoder_1.default {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const absCoord = AbsoluteCoordinates_1.default.fromBitStreamInput(bitStreamInput);
        const geoCoord = GeoCoordinates_1.default.fromValues(this._calculate32BitRepresentation(absCoord.lon), this._calculate32BitRepresentation(absCoord.lat));
        const rawLocRef = RawGeoCoordLocationReference_1.default.fromGeoCoordValues(id, geoCoord);
        if (binaryData !== null) {
            binaryData.absCoord = absCoord;
        }
        return rawLocRef;
    }
}
exports.default = GeoCoordDecoder;
;
//# sourceMappingURL=GeoCoordDecoder.js.map