"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryInformation_1 = require("./BinaryInformation");
class Attr5 extends BinaryInformation_1.default {
    static fromValues(frc, fow) {
        const attr5 = new Attr5();
        attr5._frc = frc;
        attr5._fow = fow;
        return attr5;
    }
    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Attr5._NR_RFU);
        if (rfu !== Attr5._RFU_VALUE) {
            throw new Error('RFU in use');
        }
        const attr5 = new Attr5();
        attr5._frc = bitStreamInput.getBits(Attr5._FRC_BITS);
        attr5._fow = bitStreamInput.getBits(Attr5._FOW_BITS);
        return attr5;
    }
    put(bitStreamOutput) {
        bitStreamOutput.putBits(Attr5._RFU_VALUE, Attr5._NR_RFU);
        bitStreamOutput.putBits(this._frc, Attr5._FRC_BITS);
        bitStreamOutput.putBits(this._fow, Attr5._FOW_BITS);
    }
    get frc() {
        return this._frc;
    }
    get fow() {
        return this._fow;
    }
}
Attr5._NR_RFU = 2;
Attr5._FRC_BITS = 3;
Attr5._FOW_BITS = 3;
exports.default = Attr5;
;
//# sourceMappingURL=Attr5.js.map