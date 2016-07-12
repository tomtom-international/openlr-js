import BinaryInformation from './BinaryInformation';

export default class Offset extends BinaryInformation {
    /** Number of bits used for offset */
    static _OFFSET_BITS = 8;

    /** The offset information. */
    _offset;

    static fromValues(offsetValue) {
        const offset = new Offset();
        offset._offset = offsetValue;
        return offset;
    }

    static fromBitStreamInput(bitStreamInput) {
        const offset = new Offset();
        offset._offset = bitStreamInput.getBits(Offset._OFFSET_BITS);
        return offset;
    }

    put(bitStreamOutput) {
        bitStreamOutput.putBits(this._offset, Offset._OFFSET_BITS);
    }

    get offset() {
        return this._offset;
    }

    equals(otherOffset) {
        return this._offset == otherOffset._offset;
    }
};
