"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCoordinate_1 = require("./AbstractCoordinate");
class AbstractLRP extends AbstractCoordinate_1.default {
    static fromBitCount(countBits) {
        const abstractLrp = new AbstractLRP();
        abstractLrp._coordBits = countBits;
        return abstractLrp;
    }
    get attrib1() {
        return this._attrib1;
    }
}
exports.default = AbstractLRP;
;
//# sourceMappingURL=AbstractLRP.js.map