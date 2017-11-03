"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RawPointLocationReference_1 = require("./RawPointLocationReference");
const LocationType_1 = require("../LocationType");
class RawPointAlongLineLocationReference extends RawPointLocationReference_1.default {
    static fromPointAlongLineValues(id, lrp1, lrp2, offsets, sideOfRoad, orientation) {
        const rawPointAlongLineLocationReference = new RawPointAlongLineLocationReference();
        rawPointAlongLineLocationReference._id = id;
        rawPointAlongLineLocationReference._locationType = LocationType_1.default.POINT_ALONG_LINE;
        rawPointAlongLineLocationReference._returnCode = null;
        rawPointAlongLineLocationReference._points = [lrp1, lrp2];
        rawPointAlongLineLocationReference._offsets = offsets;
        rawPointAlongLineLocationReference._orientation = orientation;
        rawPointAlongLineLocationReference._sideOfRoad = sideOfRoad;
        return rawPointAlongLineLocationReference;
    }
}
exports.default = RawPointAlongLineLocationReference;
;
//# sourceMappingURL=RawPointAlongLineLocationReference.js.map