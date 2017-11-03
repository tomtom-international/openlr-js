"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractEncoder_1 = require("./AbstractEncoder");
const LocationReference_1 = require("../../data/LocationReference");
const BinaryReturnCode_1 = require("../BinaryReturnCode");
const BinaryConstants_1 = require("../BinaryConstants");
const LocationType_1 = require("../../data/LocationType");
const BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
class PointAlongLineEncoder extends AbstractEncoder_1.default {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null || rawLocationReference.getLocationReferencePoints() === null) {
            return LocationReference_1.default.fromValues('', BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.POINT_ALONG_LINE, version);
        }
        const locationReferencePoints = rawLocationReference.getLocationReferencePoints();
        if (locationReferencePoints === null || locationReferencePoints.length <= 0) {
            return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.POINT_ALONG_LINE, version);
        }
        else {
            const startLRP = locationReferencePoints[0];
            const endLRP = locationReferencePoints[1];
            const offsets = rawLocationReference.getOffsets();
            const sideOfRoad = rawLocationReference.getSideOfRoad();
            const orientation = rawLocationReference.getOrientation();
            if (startLRP === null || endLRP === null || offsets === null || sideOfRoad === null || orientation === null) {
                return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.POINT_ALONG_LINE, version);
            }
            if (version < BinaryConstants_1.default.BINARY_VERSION_3) {
                return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.INVALID_VERSION, LocationType_1.default.POI_WITH_ACCESS_POINT, version);
            }
            const returnCode = this._checkOffsets(offsets, true, locationReferencePoints);
            if (!returnCode) {
                return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.INVALID_OFFSET, LocationType_1.default.POINT_ALONG_LINE, version);
            }
            return LocationReference_1.default.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version));
        }
    }
    _generateBinaryPointAlongLineLocation(startLRP, endLRP, offsets, sideOfRoad, orientation, version) {
        const header = this._generateHeader(version, LocationType_1.default.POINT_ALONG_LINE, true);
        const first = this._generateFirstLRPFromLRPAndOrientation(startLRP, orientation);
        const lrps = [startLRP, endLRP];
        const pOff = this._generateOffset(offsets, true, version, lrps);
        if (pOff === null) {
            throw new Error('Positive offset cannot be null');
        }
        const last = this._generateLastLrpFromPointsAndOffsetAndSideOfRoad(lrps, pOff, sideOfRoad);
        const out = BitStreamOutput_1.default.fromValues();
        header.put(out);
        first.put(out);
        last.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        return out.getData();
    }
}
exports.default = PointAlongLineEncoder;
;
//# sourceMappingURL=PointAlongLineEncoder.js.map