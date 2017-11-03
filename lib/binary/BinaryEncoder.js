"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryConstants_1 = require("./BinaryConstants");
const LocationReference_1 = require("../data/LocationReference");
const BinaryReturnCode_1 = require("./BinaryReturnCode");
const LocationType_1 = require("../data/LocationType");
const LineEncoder_1 = require("./encoder/LineEncoder");
const PointAlongLineEncoder_1 = require("./encoder/PointAlongLineEncoder");
const GeoCoordEncoder_1 = require("./encoder/GeoCoordEncoder");
class BinaryEncoder {
    _checkVersion(version, locationType) {
        let valid = false;
        for (let ver of BinaryEncoder._VERSIONS) {
            if (version === ver) {
                valid = true;
            }
        }
        if (BinaryConstants_1.default.POINT_LOCATION_TYPES.has(locationType) && version < BinaryConstants_1.default.POINT_LOCATION_VERSION) {
            valid = false;
        }
        if (BinaryConstants_1.default.AREA_LOCATION_TYPES.has(locationType) && version < BinaryConstants_1.default.AREA_LOCATION_VERSION) {
            valid = false;
        }
        return valid;
    }
    getDataFormatIdentifier() {
        return BinaryConstants_1.default.IDENTIFIER;
    }
    getSupportedVersions() {
        return BinaryEncoder._VERSIONS;
    }
    encodeDataFromRLR(rawLocationReference) {
        return this.encodeDataFromRLRAndVersion(rawLocationReference, BinaryEncoder._VERSIONS[BinaryEncoder._VERSIONS.length - 1]);
    }
    encodeDataFromRLRAndVersion(rawLocationReference, version) {
        const locationType = rawLocationReference.getLocationType();
        if (!this._checkVersion(version, locationType)) {
            return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.INVALID_VERSION, locationType, version);
        }
        let encoder = null;
        switch (locationType) {
            case LocationType_1.default.GEO_COORDINATES:
                encoder = new GeoCoordEncoder_1.default();
                break;
            case LocationType_1.default.LINE_LOCATION:
                encoder = new LineEncoder_1.default();
                break;
            case LocationType_1.default.POI_WITH_ACCESS_POINT:
                throw new Error('PoiAccessEncoder not implemented');
            case LocationType_1.default.POINT_ALONG_LINE:
                encoder = new PointAlongLineEncoder_1.default();
                break;
            case LocationType_1.default.CIRCLE:
                throw new Error('CircleEncoder not implemented');
            case LocationType_1.default.RECTANGLE:
                throw new Error('RectangleEncoder not implemented');
            case LocationType_1.default.GRID:
                throw new Error('GridEncoder not implemented');
            case LocationType_1.default.POLYGON:
                throw new Error('PolygonEncoder not implemented');
            case LocationType_1.default.CLOSED_LINE:
                throw new Error('ClosedLineEncoder not implemented');
            case LocationType_1.default.UNKNOWN:
            default:
                return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.UNKNOWN_LOCATION_TYPE, locationType, version);
        }
        return encoder.encodeData(rawLocationReference, version);
    }
}
BinaryEncoder._VERSIONS = [2, 3];
exports.default = BinaryEncoder;
;
//# sourceMappingURL=BinaryEncoder.js.map