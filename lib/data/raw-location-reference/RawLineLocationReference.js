"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RawLocationReference_1 = require("./RawLocationReference");
const LocationType_1 = require("../LocationType");
class RawLineLocationReference extends RawLocationReference_1.default {
    static fromLineValues(id, points, offsets) {
        const rawLineLocationReference = new RawLineLocationReference();
        rawLineLocationReference._id = id;
        rawLineLocationReference._locationType = LocationType_1.default.LINE_LOCATION;
        rawLineLocationReference._returnCode = null;
        rawLineLocationReference._points = points;
        rawLineLocationReference._offsets = offsets;
        return rawLineLocationReference;
    }
    getLocationReferencePoints() {
        return this._points;
    }
    getOffsets() {
        return this._offsets;
    }
}
exports.default = RawLineLocationReference;
;
//# sourceMappingURL=RawLineLocationReference.js.map