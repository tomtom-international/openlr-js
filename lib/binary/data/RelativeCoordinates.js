"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCoordinate_1 = require("./AbstractCoordinate");
class RelativeCoordinates extends AbstractCoordinate_1.default {
    static fromValues(longitude, latitude) {
        const relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._lon = longitude;
        relativeCoordinates._lat = latitude;
        return relativeCoordinates;
    }
    static fromBitStreamInput(bitStreamInput) {
        const relativeCoordinates = new RelativeCoordinates();
        relativeCoordinates._coordBits = RelativeCoordinates._COORD_BITS;
        relativeCoordinates._read(bitStreamInput);
        return relativeCoordinates;
    }
    put(bitStreamOutput) {
        this.putCoordinates(bitStreamOutput);
    }
}
RelativeCoordinates._COORD_BITS = 16;
exports.default = RelativeCoordinates;
;
//# sourceMappingURL=RelativeCoordinates.js.map