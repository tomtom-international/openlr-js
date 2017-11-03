"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractLRP_1 = require("./AbstractLRP");
const Attr1_1 = require("./Attr1");
const Attr4_1 = require("./Attr4");
class LastLRP extends AbstractLRP_1.default {
    static fromValues(lon, lat, attrib1, attrib4) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._lon = lon;
        lastLrp._lat = lat;
        lastLrp._attrib1 = attrib1;
        lastLrp._attrib4 = attrib4;
        return lastLrp;
    }
    static fromBitStreamInput(bitStreamInput) {
        const lastLrp = new LastLRP();
        lastLrp._coordBits = LastLRP._COORD_BITS;
        lastLrp._read(bitStreamInput);
        lastLrp._attrib1 = Attr1_1.default.fromBitStreamInput(bitStreamInput);
        lastLrp._attrib4 = Attr4_1.default.fromBitStreamInput(bitStreamInput);
        return lastLrp;
    }
    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
        this._attrib1.put(bitStreamOutput);
        this._attrib4.put(bitStreamOutput);
    }
    get attrib4() {
        return this._attrib4;
    }
}
LastLRP._COORD_BITS = 16;
exports.default = LastLRP;
;
//# sourceMappingURL=LastLRP.js.map