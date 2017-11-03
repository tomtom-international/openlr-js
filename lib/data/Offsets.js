import BinaryConstants from '../binary/BinaryConstants';
export default class Offsets {
    static fromValues(pOff, nOff) {
        const offsets = new Offsets();
        offsets._pOffset = pOff;
        offsets._nOffset = nOff;
        offsets._version = BinaryConstants.BINARY_VERSION_2;
        offsets._pOffRelative = 0.0;
        offsets._nOffRelative = 0.0;
        return offsets;
    }
    static fromRelativeValues(pOff, nOff) {
        const offsets = new Offsets();
        offsets._pOffset = 0;
        offsets._nOffset = 0;
        offsets._version = BinaryConstants.BINARY_VERSION_3;
        offsets._pOffRelative = pOff;
        offsets._nOffRelative = nOff;
        return offsets;
    }
    hasPositiveOffset() {
        return (this._pOffset !== 0 || this._pOffRelative !== 0);
    }
    hasNegativeOffset() {
        return (this._nOffset !== 0 || this._nOffRelative !== 0);
    }
    getPositiveOffset(length) {
        if (this.hasPositiveOffset()) {
            if (this._version === BinaryConstants.BINARY_VERSION_2) {
                return this._pOffset;
            }
            else if (this._version === BinaryConstants.BINARY_VERSION_3) {
                return Math.round(this._pOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    }
    getNegativeOffset(length) {
        if (this.hasNegativeOffset()) {
            if (this._version === BinaryConstants.BINARY_VERSION_2) {
                return this._nOffset;
            }
            else if (this._version === BinaryConstants.BINARY_VERSION_3) {
                return Math.round(this._nOffRelative * length / Offsets._PERCENTAGE);
            }
        }
        return 0;
    }
}
Offsets._PERCENTAGE = 100;
;
//# sourceMappingURL=Offsets.js.map