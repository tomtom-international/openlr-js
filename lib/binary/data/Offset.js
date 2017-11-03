"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryInformation_1 = require("./BinaryInformation");
class Offset extends BinaryInformation_1.default {
    static fromValues(offsetValue) {
        const offset = new Offset();
        offset._offset = offsetValue;
        return offset;
    }
    static fromBitStreamInput(bitStreamInput) {
        const offset = new Offset();
        offset._offset = bitStreamInput.getBits(Offset._OFFSET_BITS);
        return offset;
    }
    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._offset, Offset._OFFSET_BITS);
    }
    get offset() {
        return this._offset;
    }
}
Offset._OFFSET_BITS = 8;
exports.default = Offset;
;
//# sourceMappingURL=Offset.js.map