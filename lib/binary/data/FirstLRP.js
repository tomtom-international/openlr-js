"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLRP_1 = require("./AbstractLRP");
const Attr1_1 = require("./Attr1");
const Attr2_1 = require("./Attr2");
const Attr3_1 = require("./Attr3");
class FirstLRP extends AbstractLRP_1.default {
    static fromValues(lon, lat, attrib1, attrib2, attrib3) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._lon = lon;
        firstLrp._lat = lat;
        firstLrp._attrib1 = attrib1;
        firstLrp._attrib2 = attrib2;
        firstLrp._attrib3 = attrib3;
        return firstLrp;
    }
    static fromBitStreamInput(bitStreamInput) {
        const firstLrp = new FirstLRP();
        firstLrp._coordBits = FirstLRP._COORD_BITS;
        firstLrp._read(bitStreamInput);
        firstLrp._attrib1 = Attr1_1.default.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib2 = Attr2_1.default.fromBitStreamInput(bitStreamInput);
        firstLrp._attrib3 = Attr3_1.default.fromBitStreamInput(bitStreamInput);
        return firstLrp;
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
FirstLRP._COORD_BITS = 24;
exports.default = FirstLRP;
;
//# sourceMappingURL=FirstLRP.js.map