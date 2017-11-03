"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractEncoder_1 = require("./AbstractEncoder");
const LocationReference_1 = require("../../data/LocationReference");
const BinaryReturnCode_1 = require("../BinaryReturnCode");
const LocationType_1 = require("../../data/LocationType");
const BitStreamOutput_1 = require("../bit-stream/BitStreamOutput");
class LineEncoder extends AbstractEncoder_1.default {
    encodeData(rawLocationReference, version) {
        if (rawLocationReference === null) {
            return LocationReference_1.default.fromValues('', BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.LINE_LOCATION, version);
        }
        const locationReferences = rawLocationReference.getLocationReferencePoints();
        if (locationReferences !== null) {
            const offsets = rawLocationReference.getOffsets();
            if (locationReferences === null || offsets === null || locationReferences.length <= 0) {
                return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.LINE_LOCATION, version);
            }
            let returnCode = this._checkOffsets(offsets, true, locationReferences);
            if (!returnCode) {
                return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.INVALID_OFFSET, LocationType_1.default.LINE_LOCATION, version);
            }
            returnCode = this._checkOffsets(offsets, false, locationReferences);
            if (!returnCode) {
                return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.INVALID_OFFSET, LocationType_1.default.LINE_LOCATION, version);
            }
            return LocationReference_1.default.fromIdAndBuffer(rawLocationReference.getId(), this._generateBinaryLineLocation(locationReferences, offsets, version));
        }
        else {
            return LocationReference_1.default.fromValues(rawLocationReference.getId(), BinaryReturnCode_1.default.MISSING_DATA, LocationType_1.default.LINE_LOCATION, version);
        }
    }
    _generateBinaryLineLocation(locationReferences, offsets, version) {
        const header = this._generateHeader(version, LocationType_1.default.LINE_LOCATION, true);
        const firstLRP = this._generateFirstLRPFromLRP(locationReferences[0]);
        const lrps = this._generateLRPs(locationReferences);
        const pOff = this._generateOffset(offsets, true, version, locationReferences);
        const nOff = this._generateOffset(offsets, false, version, locationReferences);
        const lastLRP = this._generateLastLrpFromPointsAndOffsets(locationReferences, pOff, nOff);
        const out = BitStreamOutput_1.default.fromValues();
        header.put(out);
        firstLRP.put(out);
        for (let i = 0; i < lrps.length; i++) {
            lrps[i].put(out);
        }
        lastLRP.put(out);
        if (pOff !== null) {
            pOff.put(out);
        }
        if (nOff !== null) {
            nOff.put(out);
        }
        return out.getData();
    }
}
exports.default = LineEncoder;
;
//# sourceMappingURL=LineEncoder.js.map