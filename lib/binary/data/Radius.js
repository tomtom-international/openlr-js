import BinaryConstants from '../BinaryConstants';
export var RadiusType;
(function (RadiusType) {
    RadiusType[RadiusType["SMALL"] = 1] = "SMALL";
    RadiusType[RadiusType["MEDIUM"] = 2] = "MEDIUM";
    RadiusType[RadiusType["LARGE"] = 3] = "LARGE";
    RadiusType[RadiusType["EXTRA_LARGE"] = 4] = "EXTRA_LARGE";
    RadiusType[RadiusType["UNKNOWN"] = 0] = "UNKNOWN";
})(RadiusType || (RadiusType = {}));
export const resolveRadius = (bytes) => {
    return bytes >= RadiusType.UNKNOWN && bytes <= RadiusType.EXTRA_LARGE ? bytes : RadiusType.UNKNOWN;
};
export default class Radius {
    static fromValues(radiusValue) {
        const radius = new Radius();
        radius._radius = radiusValue;
        return radius;
    }
    static fromBitStreamInput(bitStreamInput, type) {
        const radius = new Radius();
        switch (type) {
            case RadiusType.SMALL:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.SMALL_RADIUS_BITS));
                break;
            case RadiusType.MEDIUM:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.MEDIUM_RADIUS_BITS));
                break;
            case RadiusType.LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.LARGE_RADIUS_BITS));
                break;
            case RadiusType.EXTRA_LARGE:
                radius._radius = Radius._intToLong(bitStreamInput.getBits(BinaryConstants.EXTRA_LARGE_RADIUS_BITS));
                break;
            default:
                throw new Error('Invalid value range');
        }
        return radius;
    }
    put(bitStreamOutput) {
        if (this._radius <= Radius._MAX_RADIUS_SMALL) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.SMALL_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_MEDIUM) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.MEDIUM_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.LARGE_RADIUS_BITS);
        }
        else if (this._radius <= Radius._MAX_RADIUS_EXTRA_LARGE) {
            bitStreamOutput.putBits(this._radius, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);
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
Radius._MAX_RADIUS_SMALL = Math.pow(2, BinaryConstants.SMALL_RADIUS_BITS);
Radius._MAX_RADIUS_MEDIUM = Math.pow(2, BinaryConstants.MEDIUM_RADIUS_BITS);
Radius._MAX_RADIUS_LARGE = Math.pow(2, BinaryConstants.LARGE_RADIUS_BITS);
Radius._MAX_RADIUS_EXTRA_LARGE = Math.pow(2, BinaryConstants.EXTRA_LARGE_RADIUS_BITS);
;
//# sourceMappingURL=Radius.js.map