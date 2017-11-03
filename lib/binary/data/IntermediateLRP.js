"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLRP_1 = require("./AbstractLRP");
const Attr1_1 = require("./Attr1");
const Attr2_1 = require("./Attr2");
const Attr3_1 = require("./Attr3");
class IntermediateLRP extends AbstractLRP_1.default {
    static fromValues(lon, lat, attrib1, attrib2, attrib3) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._lon = lon;
        intermediateLrp._lat = lat;
        intermediateLrp._attrib1 = attrib1;
        intermediateLrp._attrib2 = attrib2;
        intermediateLrp._attrib3 = attrib3;
        return intermediateLrp;
    }
    static fromBitStreamInput(bitStreamInput) {
        const intermediateLrp = new IntermediateLRP();
        intermediateLrp._coordBits = IntermediateLRP._COORD_BITS;
        intermediateLrp._read(bitStreamInput);
        intermediateLrp._attrib1 = Attr1_1.default.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib2 = Attr2_1.default.fromBitStreamInput(bitStreamInput);
        intermediateLrp._attrib3 = Attr3_1.default.fromBitStreamInput(bitStreamInput);
        return intermediateLrp;
    }
    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib2.put(bitStreamOutput);
        this._attrib3.put(bitStreamOutput);
    }
    get attrib2() {
        return this._attrib2;
    }
    get attrib3() {
        return this._attrib3;
    }
}
IntermediateLRP._COORD_BITS = 16;
exports.default = IntermediateLRP;
;
//# sourceMappingURL=IntermediateLRP.js.map