"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDecoder_1 = require("./AbstractDecoder");
const BinaryConstants_1 = require("../BinaryConstants");
const FirstLRP_1 = require("../data/FirstLRP");
const IntermediateLRP_1 = require("../data/IntermediateLRP");
const LastLRP_1 = require("../data/LastLRP");
const Offset_1 = require("../data/Offset");
const Offsets_1 = require("../../data/Offsets");
const RawLineLocationReference_1 = require("../../data/raw-location-reference/RawLineLocationReference");
class LineDecoder extends AbstractDecoder_1.default {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const nrIntermediates = Math.floor((totalBytes - (BinaryConstants_1.default.MIN_BYTES_LINE_LOCATION)) / BinaryConstants_1.default.LRP_SIZE);
        const firstLRP = FirstLRP_1.default.fromBitStreamInput(bitStreamInput);
        const intermediates = [];
        for (let i = 0; i < nrIntermediates; i++) {
            const lrp = IntermediateLRP_1.default.fromBitStreamInput(bitStreamInput);
            intermediates.push(lrp);
        }
        const lastLRP = LastLRP_1.default.fromBitStreamInput(bitStreamInput);
        let posOff = null;
        let negOff = null;
        if (lastLRP.attrib4.pOffsetF === BinaryConstants_1.default.HAS_OFFSET) {
            posOff = Offset_1.default.fromBitStreamInput(bitStreamInput);
        }
        if (lastLRP.attrib4.nOffsetF === BinaryConstants_1.default.HAS_OFFSET) {
            negOff = Offset_1.default.fromBitStreamInput(bitStreamInput);
        }
        let offsets = Offsets_1.default.fromValues(0, 0);
        if (version === BinaryConstants_1.default.BINARY_VERSION_2) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateDistanceEstimate(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateDistanceEstimate(negOff.offset);
            }
            offsets = Offsets_1.default.fromValues(pOffValue, nOffValue);
        }
        else if (version === BinaryConstants_1.default.BINARY_VERSION_3) {
            let pOffValue = 0;
            let nOffValue = 0;
            if (posOff !== null) {
                pOffValue = this._calculateRelativeDistance(posOff.offset);
            }
            if (negOff !== null) {
                nOffValue = this._calculateRelativeDistance(negOff.offset);
            }
            offsets = Offsets_1.default.fromRelativeValues(pOffValue, nOffValue);
        }
        let lrpCount = 1;
        const points = [];
        const p = this._createFirstLRP(lrpCount, firstLRP);
        lrpCount++;
        points.push(p);
        let prevLon = p.getLongitudeDeg();
        let prevLat = p.getLatitudeDeg();
        for (let intermediate of intermediates) {
            const intermediatePoint = this._createIntermediateLRPFromLatitudeLongitude(lrpCount, intermediate, prevLon, prevLat);
            lrpCount++;
            points.push(intermediatePoint);
            prevLon = intermediatePoint.getLongitudeDeg();
            prevLat = intermediatePoint.getLatitudeDeg();
        }
        const lp = this._createLastLRP(lrpCount, lastLRP, prevLon, prevLat);
        points.push(lp);
        const rawLocRef = RawLineLocationReference_1.default.fromLineValues(id, points, offsets);
        if (binaryData !== null) {
            binaryData.negOffset = negOff;
            binaryData.posOffset = posOff;
            binaryData.lastLRP = lastLRP;
            binaryData.intermediates = intermediates;
            binaryData.firstLRP = firstLRP;
        }
        return rawLocRef;
    }
}
exports.default = LineDecoder;
;
//# sourceMappingURL=LineDecoder.js.map