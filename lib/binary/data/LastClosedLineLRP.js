"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryInformation_1 = require("./BinaryInformation");
const Attr5_1 = require("./Attr5");
const Attr6_1 = require("./Attr6");
class LastClosedLineLRP extends BinaryInformation_1.default {
    static fromValues(attrib5, attrib6) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = attrib5;
        lastClosedLineLrp._attrib6 = attrib6;
        return lastClosedLineLrp;
    }
    static fromBitStreamInput(bitStreamInput) {
        const lastClosedLineLrp = new LastClosedLineLRP();
        lastClosedLineLrp._attrib5 = Attr5_1.default.fromBitStreamInput(bitStreamInput);
        lastClosedLineLrp._attrib6 = Attr6_1.default.fromBitStreamInput(bitStreamInput);
        return lastClosedLineLrp;
    }
    put(bitStreamOutput) {
        this._attrib5.put(bitStreamOutput);
        this._attrib6.put(bitStreamOutput);
    }
    get attrib5() {
        return this._attrib5;
    }
    get attrib6() {
        return this._attrib6;
    }
}
exports.default = LastClosedLineLRP;
;
//# sourceMappingURL=LastClosedLineLRP.js.map