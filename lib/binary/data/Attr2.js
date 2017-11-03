"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryInformation_1 = require("./BinaryInformation");
class Attr2 extends BinaryInformation_1.default {
    static fromValues(lfrcnp, bear) {
        const attr2 = new Attr2();
        attr2._lfrcnp = lfrcnp;
        attr2._bear = bear;
        return attr2;
    }
    static fromBitStreamInput(bitStreamInput) {
        const attr2 = new Attr2();
        attr2._lfrcnp = bitStreamInput.getBits(Attr2._LFRCNP_BITS);
        attr2._bear = bitStreamInput.getBits(Attr2._BEAR_BITS);
        return attr2;
    }
    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._lfrcnp, Attr2._LFRCNP_BITS);
        bitStreamOutput.putBits(this._bear, Attr2._BEAR_BITS);
    }
    get lfrcnp() {
        return this._lfrcnp;
    }
    get bear() {
        return this._bear;
    }
}
Attr2._LFRCNP_BITS = 3;
Attr2._BEAR_BITS = 5;
exports.default = Attr2;
;
//# sourceMappingURL=Attr2.js.map