"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RawLocationReference_1 = require("./RawLocationReference");
const LocationType_1 = require("../LocationType");
class RawInvalidLocationReference extends RawLocationReference_1.default {
    static fromIdAndStatusCode(id, error) {
        const rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = LocationType_1.default.UNKNOWN;
        rawInvalidLocationReference._returnCode = error;
        return rawInvalidLocationReference;
    }
    static fromInvalidValues(id, error, locationType) {
        const rawInvalidLocationReference = new RawInvalidLocationReference();
        rawInvalidLocationReference._id = id;
        rawInvalidLocationReference._locationType = locationType;
        rawInvalidLocationReference._returnCode = error;
        return rawInvalidLocationReference;
    }
}
exports.default = RawInvalidLocationReference;
;
//# sourceMappingURL=RawInvalidLocationReference.js.map