"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCoordinate_1 = require("./AbstractCoordinate");
class AbsoluteCoordinates extends AbstractCoordinate_1.default {
    static fromValues(longitude, latitude) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._lon = longitude;
        absoluteCoordinates._lat = latitude;
        return absoluteCoordinates;
    }
    static fromBitStreamInput(bitStreamInput) {
        const absoluteCoordinates = new AbsoluteCoordinates();
        absoluteCoordinates._coordBits = AbsoluteCoordinates._COORD_BITS;
        absoluteCoordinates._read(bitStreamInput);
        return absoluteCoordinates;
    }
    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    }
}
AbsoluteCoordinates._COORD_BITS = 24;
exports.default = AbsoluteCoordinates;
;
//# sourceMappingURL=AbsoluteCoordinates.js.map