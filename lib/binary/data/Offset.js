import BinaryInformation from './BinaryInformation';
export default class Offset extends BinaryInformation {
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
}
Offset._OFFSET_BITS = 8;
;
//# sourceMappingURL=Offset.js.map