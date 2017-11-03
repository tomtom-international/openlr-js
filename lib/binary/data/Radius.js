"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BinaryConstants_1 = require("../BinaryConstants");
var RadiusType;
(function (RadiusType) {
    RadiusType[RadiusType["SMALL"] = 1] = "SMALL";
    RadiusType[RadiusType["MEDIUM"] = 2] = "MEDIUM";
    RadiusType[RadiusType["LARGE"] = 3] = "LARGE";
    RadiusType[RadiusType["EXTRA_LARGE"] = 4] = "EXTRA_LARGE";
    RadiusType[RadiusType["UNKNOWN"] = 0] = "UNKNOWN";
})(RadiusType = exports.RadiusType || (exports.RadiusType = {}));
exports.resolveRadius = (bytes) => {
    return bytes >= RadiusType.UNKNOWN && bytes <= RadiusType.EXTRA_LARGE ? bytes : RadiusType.UNKNOWN;
};
class Radius {
    static fromValues(radiusValue) {
        const radius = new Radius();
        radius._radius = radiusValue;
        return radius;
    }
    static fromBitStreamInput(bitStreamInput, type) {
        const radius = new Radius();
        switch (type) {
            case RadiusType.SMALL:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants_1.default.SMALL_RADIUS_BITS));
                break;
            case RadiusType.MEDIUM:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants_1.default.MEDIUM_RADIUS_BITS));
                break;
            case RadiusType.LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants_1.default.LARGE_RADIUS_BITS));
                break;
            case RadiusType.EXTRA_LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants_1.default.EXTRA_LARGE_RADIUS_BITS));
                break;
            default:
                throw new Error('Invalid value range');
        }
        return radius;
    }
    put(bitStreamOutput) {
        if (this._radius <= Radius._MAX_RADIUS_SMALL) {
            bitStreamOutput.putBits(this._radius, BinaryConstants_1.default.SMALL_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_MEDIUM) {
            bitStreamOutput.putBits(this._radius, BinaryConstants_1.default.MEDIUM_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants_1.default.LARGE_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_EXTRA_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants_1.default.EXTRA_LARGE_RADIUS_BITS);
        }
        else {
            throw new Error('Invalid range');
        }
    }
    get radius() {
        return this._radius;
    }
    static _intToLong(integer) {
        if (integer < 0) {
            return integer & (Radius._MAX_RADIUS_EXTRA_LARGE - 1);
        }
        else {
            return integer;
        }
    }
}
Radius._MAX_RADIUS_SMALL = Math.pow(2, BinaryConstants_1.default.SMALL_RADIUS_BITS);
Radius._MAX_RADIUS_MEDIUM = Math.pow(2, BinaryConstants_1.default.MEDIUM_RADIUS_BITS);
Radius._MAX_RADIUS_LARGE = Math.pow(2, BinaryConstants_1.default.LARGE_RADIUS_BITS);
Radius._MAX_RADIUS_EXTRA_LARGE = Math.pow(2, BinaryConstants_1.default.EXTRA_LARGE_RADIUS_BITS);
exports.default = Radius;
;
//# sourceMappingURL=Radius.js.map