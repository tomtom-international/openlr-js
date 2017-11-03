"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractDecoder_1 = require("./AbstractDecoder");
const FirstLRP_1 = require("../data/FirstLRP");
const LastLRP_1 = require("../data/LastLRP");
const Offset_1 = require("../data/Offset");
const Offsets_1 = require("../../data/Offsets");
const RawPointAlongLineLocationReference_1 = require("../../data/raw-location-reference/RawPointAlongLineLocationReference");
class PointAlongLineDecoder extends AbstractDecoder_1.default {
    decodeData(id, bitStreamInput, totalBytes, version, binaryData) {
        const firstLRP = FirstLRP_1.default.fromBitStreamInput(bitStreamInput);
        const lrp1 = this._createFirstLRP(1, firstLRP);
        const orientation = this._resolveOrientation(firstLRP.attrib1);
        const lastLRP = LastLRP_1.default.fromBitStreamInput(bitStreamInput);
        const lrp2 = this._createLastLRP(2, lastLRP, lrp1.getLongitudeDeg(), lrp1.getLatitudeDeg());
        const sideOfRoad = this._resolveSideOfRoad(lastLRP.attrib1);
        let offsets = Offsets_1.default.fromValues(0, 0);
        let posOff = null;
        if (lastLRP.attrib4.pOffsetF === 1) {
            posOff = Offset_1.default.fromBitStreamInput(bitStreamInput);
            const rawLocRef = this._calculateRelativeDistance(posOff.offset);
            offsets = Offsets_1.default.fromRelativeValues(rawLocRef, 0.0);
        }
        const rawLocationReference = RawPointAlongLineLocationReference_1.default.fromPointAlongLineValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation);
        if (binaryData !== null) {
            binaryData.firstLRP = firstLRP;
            binaryData.lastLRP = lastLRP;
            binaryData.posOffset = posOff;
        }
        return rawLocationReference;
    }
}
exports.default = PointAlongLineDecoder;
;
//# sourceMappingURL=PointAlongLineDecoder.js.map