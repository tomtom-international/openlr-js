"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractEncoder_1 = require("./AbstractEncoder");
const LocationReference_1 = require("../../data/LocationReference");
const BinaryReturnCode_1 = require("../BinaryReturnCode");
const LocationType_1 = require("../../data/LocationType");
const BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
class GeoCoordEncoder extends AbstractEncoder_1.default {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null) {
            return LocationReference_1.default.fromValues('', BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.GEO_COORDINATES, version);
        }
        else {
            const coord = rawLocationReference.getGeoCoordinates();
            if (coord === null) {
                return LocationReference_1.default.fromValues('', BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.GEO_COORDINATES, version);
            }
            else if (version < 3) {
                return LocationReference_1.default.fromValues('', BinaryReturnCode_1.default.INVALID_VERSION, LocationType_1.default.GEO_COORDINATES, version);
            }
            else {
                return LocationReference_1.default.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryGeoCoordLocation(coord, version));
            }
        }
    }
    _generateBinaryGeoCoordLocation(coord, version) {
        const header = this._generateHeader(version, LocationType_1.default.GEO_COORDINATES, false);
        const absCoord = this._generateAbsCoord(coord);
        const out = BitStreamOutput_1.default.fromValues();
        header.put(out);
        absCoord.put(out);
        return out.getData();
    }
}
exports.default = GeoCoordEncoder;
;
//# sourceMappingURL=GeoCoordEncoder.js.map