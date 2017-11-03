"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryInformation_1 = require("./BinaryInformation");
class AbstractCoordinate extends BinaryInformation_1.default {
    static fromBitCount(countBits) {
        const abstractCoordinate = new AbstractCoordinate();
        abstractCoordinate._coordBits = countBits;
        return abstractCoordinate;
    }
    get lon() {
        return this._lon;
    }
    get lat() {
        return this._lat;
    }
    _read(bitStreamInput) {
        this._lon = bitStreamInput.getSignedBits(this._coordBits);
        this._lat = bitStreamInput.getSignedBits(this._coordBits);
    }
    putCoordinates(bitStreamOutput) {
        bitStreamOutput.putBits(this._lon, this._coordBits);
        bitStreamOutput.putBits(this._lat, this._coordBits);
    }
}
exports.default = AbstractCoordinate;
;
//# sourceMappingURL=AbstractCoordinate.js.map