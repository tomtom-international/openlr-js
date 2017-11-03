"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryInformation_1 = require("./BinaryInformation");
class Header extends BinaryInformation_1.default {
    static fromValues(arfValue, afValue, pfValue, verValue) {
        const header = new Header();
        header._arf = arfValue;
        header._af = afValue;
        header._pf = pfValue;
        header._ver = verValue;
        return header;
    }
    static fromBitStreamInput(bitStreamInput) {
        const rfu = bitStreamInput.getBits(Header._RFU_BITS);
        if (rfu !== BinaryInformation_1.default._RFU_VALUE) {
            throw new Error('Const value mismatch');
        }
        const header = new Header();
        const arf1 = bitStreamInput.getBits(Header._AREA_FLAG_BIT0);
        header._pf = bitStreamInput.getBits(Header._POINT_FLAG_BITS);
        const arf0 = bitStreamInput.getBits(Header._AREA_FLAG_BIT1);
        header._arf = 2 * arf1 + arf0;
        header._af = bitStreamInput.getBits(Header._ATTR_FLAG_BITS);
        header._ver = bitStreamInput.getBits(Header._VERSION_BITS);
        return header;
    }
    put(bitStreamOutput) {
        bitStreamOutput.putBits(BinaryInformation_1.default._RFU_VALUE, Header._RFU_BITS);
        const arf1 = this._arf / 2;
        const arf0 = this._arf % 2;
        bitStreamOutput.putBits(arf1, Header._AREA_FLAG_BIT1);
        bitStreamOutput.putBits(this._pf, Header._POINT_FLAG_BITS);
        bitStreamOutput.putBits(arf0, Header._AREA_FLAG_BIT0);
        bitStreamOutput.putBits(this._af, Header._ATTR_FLAG_BITS);
        bitStreamOutput.putBits(this._ver, Header._VERSION_BITS);
    }
    get arf() {
        return this._arf;
    }
    get af() {
        return this._af;
    }
    get pf() {
        return this._pf;
    }
    get ver() {
        return this._ver;
    }
}
Header._RFU_BITS = 1;
Header._AREA_FLAG_BIT0 = 1;
Header._AREA_FLAG_BIT1 = 1;
Header._ATTR_FLAG_BITS = 1;
Header._POINT_FLAG_BITS = 1;
Header._VERSION_BITS = 3;
exports.default = Header;
;
//# sourceMappingURL=Header.js.map